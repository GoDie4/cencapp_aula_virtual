"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarVenta = enviarVenta;
exports.recibirVenta = recibirVenta;
exports.obtenerVentas = obtenerVentas;
exports.obtenerCursosComprados = obtenerCursosComprados;
const config_1 = require("../config/config");
const mercadopago_1 = require("mercadopago");
const crypto_1 = __importDefault(require("crypto"));
const client_1 = require("@prisma/client");
const client = new mercadopago_1.MercadoPagoConfig({
    accessToken: config_1.ENV.ACCESS_TOKEN,
});
const prisma = new client_1.PrismaClient();
const preference = new mercadopago_1.Preference(client);
const payment = new mercadopago_1.Payment(client);
// const payment = new Payment(client)
async function enviarVenta(req, res) {
    const { items, info } = req.body;
    if (!items || items.length === 0) {
        res.status(404).json({
            message: "No se ha colocado nada en su carrito de compras",
        });
        return;
    }
    if (!info) {
        res.status(404).json({
            message: "No se ha colocado su información en el pedido",
        });
    }
    try {
        const body = {
            items: items,
            payer: {
                email: info.email,
            },
            metadata: {
                user_id_con: info.id,
            },
            back_urls: {
                success: config_1.ENV.Success,
            },
        };
        const { init_point } = await preference.create({ body });
        console.log(init_point);
        res.status(200).json({
            init_point,
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Se ha generado un error en su pedido",
        });
        return;
    }
}
async function recibirVenta(req, res) {
    try {
        const xSignature = req.headers["x-signature"];
        const { data, action } = req.body;
        const requestId = req.headers["x-request-id"];
        const parts = xSignature?.split(",");
        let ts;
        let hash;
        /** Cuando el pago se ha realizado correctamente  */
        if (action === 'payment.created') {
            // Parts
            parts.forEach((part) => {
                // Split each part into key and value
                const [key, value] = part.split("=");
                if (key && value) {
                    const trimmedKey = key.trim();
                    const trimmedValue = value.trim();
                    if (trimmedKey === "ts") {
                        ts = trimmedValue;
                    }
                    else if (trimmedKey === "v1") {
                        hash = trimmedValue;
                    }
                }
            });
            const manifest = `id:${data.id};request-id:${requestId};ts:${ts};`;
            const hmac = crypto_1.default.createHmac("sha256", config_1.ENV.MercadoSecret ?? "03c3ba195e0cb7a3e67b990e18d884aa9db163ad459b6f5ef3174f505c06d9a5");
            hmac.update(manifest);
            const sha = hmac.digest("hex");
            if (sha === hash) {
                // HMAC verification passed
                const datos = await payment.get({ id: data.id });
                console.log(datos);
                const ventaAprovada = await prisma.ventas.create({
                    data: {
                        pedidoMercadoId: data.id,
                        usuarioId: datos.metadata.user_id_con,
                        estado: datos.status ?? "",
                        estado_detalle: datos.status_detail ?? "",
                        total: datos.transaction_details?.total_paid_amount ?? 0,
                        total_neto: datos.transaction_details?.net_received_amount ?? 0,
                        ultimo_caracteres: datos.card?.last_four_digits ?? "",
                        fecha_aprobada: datos.date_approved ?? "",
                    },
                });
                if (!datos.additional_info) {
                    res.status(404).json({
                        message: 'Faltó información adicional'
                    });
                    return;
                }
                if (!datos.additional_info.items || datos.additional_info.items.length === 0) {
                    res.status(404).json({
                        message: 'Faltaron cursos para pedir'
                    });
                    return;
                }
                datos.additional_info.items.map(async (item) => {
                    const matriculaEncontrada = await prisma.cursoUsuario.findFirst({
                        where: {
                            userId: datos.metadata.user_id_con,
                            cursoId: item.id
                        }
                    });
                    if (!matriculaEncontrada) {
                        await prisma.cursoUsuario.create({
                            data: {
                                tipo: "MATRICULADO",
                                cursoId: item.id,
                                avance: "0",
                                userId: datos.metadata.user_id_con,
                            },
                        });
                        await prisma.ventasDetalles.create({
                            data: {
                                ventaId: ventaAprovada.id,
                                productoId: item.id,
                                cantidad: Number(item.quantity),
                                precio: item.unit_price,
                            },
                        });
                    }
                });
            }
            else {
                // HMAC verification failed
                console.log("HMAC verification failed");
                throw new Error("error");
            }
            res.status(200).json({
                message: 'Orden Guardada'
            });
            return;
        }
        /** Cuando no ha sido permitido el pago  */
        res.status(200).json({
            message: "Orden Guardada",
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Ocurrió un error en el servidor",
        });
        return;
    }
}
async function obtenerVentas(req, res) {
    try {
        const ventas = await prisma.ventas.findMany({
            include: {
                detalles: {
                    include: {
                        curso: true,
                    },
                },
                usuario: true,
            },
        });
        res.status(200).json({
            ventas,
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Ocurrió un error en el servidor",
        });
        return;
    }
}
async function obtenerCursosComprados(req, res) {
    try {
        const userId = req.user.id;
        const cursos = await prisma.curso.findMany({
            include: {
                categoria: true,
                detalles: true,
                PorcentajeCurso: {
                    select: {
                        porcentaje: true,
                    },
                },
            },
            where: {
                ventas_detalles: {
                    some: {
                        venta: {
                            usuarioId: userId,
                        },
                    },
                },
            },
        });
        res.status(200).json({ cursos });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Ocurrió un error en el servidor",
        });
    }
}
//# sourceMappingURL=mercadopago.controller.js.map