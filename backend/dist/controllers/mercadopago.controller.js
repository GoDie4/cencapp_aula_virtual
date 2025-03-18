"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarVenta = enviarVenta;
exports.recibirVenta = recibirVenta;
const config_1 = require("../config/config");
const mercadopago_1 = require("mercadopago");
const crypto_1 = __importDefault(require("crypto"));
const client_1 = require("@prisma/client");
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const client = new mercadopago_1.MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN_MERCADO_PAGO || "",
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
        const errorMessage = `[${new Date().toISOString()}] Error en /api/seccionesBuscar/all: ${error.message}\n`;
        promises_1.default.appendFile(path_1.default.join(__dirname, "error.log"), errorMessage);
        res.status(404).json({
            message: error,
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
        if (action === "payment.created") {
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
            const hmac = crypto_1.default.createHmac("sha256", config_1.ENV.MercadoSecret);
            hmac.update(manifest);
            const sha = hmac.digest("hex");
            if (sha === hash) {
                // HMAC verification passed
                const datos = await payment.get({ id: data.id });
                datos.additional_info?.items?.map(async (item) => {
                    await prisma.cursoUsuario.create({
                        data: {
                            tipo: "MATRICULADO",
                            cursoId: item.id,
                            avance: "0",
                            userId: datos.metadata.user_id_con,
                        },
                    });
                });
            }
            else {
                // HMAC verification failed
                console.log("HMAC verification failed");
                throw new Error("error");
            }
        }
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
//# sourceMappingURL=mercadopago.controller.js.map