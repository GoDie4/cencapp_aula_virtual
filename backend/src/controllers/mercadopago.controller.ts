import { ENV } from "../config/config";
import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import { PreferenceRequest } from "mercadopago/dist/clients/preference/commonTypes";
import { Response, Request } from "express";
import { CarritoInterface } from "interfaces/CarritoInterface";
import { InfoRequest } from "../interfaces/InfoRequest";
import crypto from "crypto";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "./mail.controller";

const client = new MercadoPagoConfig({
  accessToken: ENV.ACCESS_TOKEN,
});

const prisma = new PrismaClient();
const preference = new Preference(client);
const payment = new Payment(client);

// const payment = new Payment(client)

export async function enviarVenta(req: Request, res: Response): Promise<void> {
  const { items, info }: { items: CarritoInterface[]; info: InfoRequest } =
    req.body;
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
    const body: PreferenceRequest = {
      items: items,
      payer: {
        email: info.email,
      },
      metadata: {
        user_id_con: info.id,
      },
      back_urls: {
        success: ENV.Success,
      },
    };
    const { init_point } = await preference.create({ body });
    console.log(init_point);
    res.status(200).json({
      init_point,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Se ha generado un error en su pedido",
    });
    return;
  }
}

export async function recibirVenta(req: Request, res: Response): Promise<void> {
    try {
      const xSignature = req.headers["x-signature"] as string;
      const { data, action } = req.body;
      const requestId = req.headers["x-request-id"];
      const parts = xSignature?.split(",");
      let ts;
      let hash;
  
      if (action === "payment.created") {
        parts.forEach((part) => {
          const [key, value] = part.split("=");
          if (key && value) {
            const trimmedKey = key.trim();
            const trimmedValue = value.trim();
            if (trimmedKey === "ts") {
              ts = trimmedValue;
            } else if (trimmedKey === "v1") {
              hash = trimmedValue;
            }
          }
        });
  
        const manifest = `id:${data.id};request-id:${requestId};ts:${ts};`;
        const hmac = crypto.createHmac(
          "sha256",
          ENV.MercadoSecret ?? "03c3ba195e0cb7a3e67b990e18d884aa9db163ad459b6f5ef3174f505c06d9a5"
        );
        hmac.update(manifest);
        const sha = hmac.digest("hex");
  
        if (sha === hash) {
          const datos: PaymentResponse = await payment.get({ id: data.id });
  
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
  
          const user = await prisma.usuario.findUnique({
            where: { id: datos.metadata.user_id_con },
          });
  
          console.log("ID USUARIO: ", datos.metadata.user_id_con);
          console.log(" USUARIO: ", user);
          console.log("Datos del pago: ", datos.additional_info);
  
          if (!datos.additional_info) {
            res.status(404).json({ message: "Faltó información adicional" });
            return;
          }
  
          if (!datos.additional_info.items || datos.additional_info.items.length === 0) {
            res.status(404).json({ message: "Faltaron cursos para pedir" });
            return;
          }
  
          datos.additional_info.items.map(async (item) => {
            const matriculaEncontrada = await prisma.cursoUsuario.findFirst({
              where: {
                userId: datos.metadata.user_id_con,
                cursoId: item.id as string,
              },
            });
  
            if (!matriculaEncontrada) {
              await prisma.cursoUsuario.create({
                data: {
                  tipo: "MATRICULADO",
                  cursoId: item.id as string,
                  avance: "0",
                  userId: datos.metadata.user_id_con,
                },
              });
  
              await prisma.ventasDetalles.create({
                data: {
                  ventaId: ventaAprovada.id,
                  productoId: item.id as string,
                  cantidad: Number(item.quantity),
                  precio: item.unit_price,
                },
              });
            }
          });
  
          const htmlProductos = datos.additional_info.items
            .map(
              (prod: any) => `
    <tr>
      <td align="left" style="padding: 10px 20px;">
        <table width="100%" role="presentation">
          <tr>
            <td style="font-family: Poppins, sans-serif; color: #666; font-size: 14px;">
              <b>${prod.title}</b>
            </td>
            <td style="text-align: center; font-family: Poppins, sans-serif; color: #666; font-size: 14px;">
              ${prod.quantity}
            </td>
            <td style="text-align: center; font-family: Poppins, sans-serif; color: #666; font-size: 14px;">
              S/ ${prod.unit_price}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `
            )
            .join("");
  
          await sendEmail(
            "anthony10.reyes10@gmail.com",
            "Nueva compra",
            `NuevaCompra.html`,
            {
              transaccionId: datos.id,
              usuario: user?.email,
              total: datos.transaction_details?.total_paid_amount ?? 0,
              fecha: datos.date_approved ?? "",
              htmlProductos: htmlProductos,
            }
          );
        } else {
          console.log("HMAC verification failed");
          throw new Error("error");
        }
  
        res.status(200).json({ message: "Orden Guardada" });
        return;
      }
  
      res.status(200).json({ message: "Orden Guardada" });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ocurrió un error en el servidor" });
      return;
    }
  }

export async function obtenerVentas(
  req: Request,
  res: Response
): Promise<void> {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ocurrió un error en el servidor",
    });
    return;
  }
}

export async function obtenerCursosComprados(
  req: any,
  res: Response
): Promise<void> {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ocurrió un error en el servidor",
    });
  }
}
