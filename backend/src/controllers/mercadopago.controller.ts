import { ENV } from '../config/config'
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'
import { PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes'
import { Response, Request } from 'express'
import { CarritoInterface } from 'interfaces/CarritoInterface'
import { InfoRequest } from '../interfaces/InfoRequest'
import crypto from 'crypto'
import { PaymentResponse } from 'mercadopago/dist/clients/payment/commonTypes'
import { PrismaClient } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN_MERCADO_PAGO || '',
  options: {
    timeout: 10000,
    idempotencyKey: 'mercadopago'
  }
})

const prisma = new PrismaClient()
const preference = new Preference(client)
const payment = new Payment(client)

// const payment = new Payment(client)

export async function enviarVenta(req: Request, res: Response): Promise<void> {
  const { items, info }: { items: CarritoInterface[], info: InfoRequest } = req.body
  if (!items || items.length === 0) {
    res.status(404).json({
      message: 'No se ha colocado nada en su carrito de compras'
    })
    return
  }

  if (!info) {
    res.status(404).json({
      message: 'No se ha colocado su información en el pedido'
    })
  }

  try {
    const body: PreferenceRequest = {
      items: items,
      payer: {
        email: info.email,
      },
      metadata: {
        user_id_con : info.id,
      }
    }
    const { init_point } = await preference.create({ body })
    console.log(init_point)
    res.status(200).json({
      init_point
    })
    return
  }
  catch (error) {
    console.log(error)
    res.status(404).json({
      message: 'Se ha generado un error en su pedido'
    })
    return
  }
}

export async function recibirVenta(req: Request, res: Response): Promise<void> {
  try {
    const xSignature = req.headers['x-signature'] as string
    const { data, action } = req.body
    const requestId = req.headers['x-request-id']
    const parts = xSignature?.split(',');
    let ts;
    let hash;
    /** Cuando el pago se ha realizado correctamente  */
    if (action === 'payment.created') {
      // Parts
      parts.forEach(part => {
        // Split each part into key and value
        const [key, value] = part.split('=');
        if (key && value) {
          const trimmedKey = key.trim();
          const trimmedValue = value.trim();
          if (trimmedKey === 'ts') {
            ts = trimmedValue;
          } else if (trimmedKey === 'v1') {
            hash = trimmedValue;
          }
        }
      });
      const manifest = `id:${data.id};request-id:${requestId};ts:${ts};`;
      const hmac = crypto.createHmac('sha256', ENV.MercadoSecret);
      hmac.update(manifest);

      const sha = hmac.digest('hex');

      if (sha === hash) {
        // HMAC verification passed
        
        const datos: PaymentResponse = await payment.get({ id: data.id })
        console.log(datos.payment_method)
        const newCursoPagado = await prisma.cursoPagado.create({
          data: {
            mercadoPaymentId: datos.order ? String(datos.order.id) : '',
            totalPagado: datos.transaction_details ? datos.transaction_details.total_paid_amount as unknown as Decimal : 0 as unknown as Decimal,
            userId: datos.metadata.user_id_con
          }
        })

        if (!datos.additional_info) {
          res.status(404).json({
            message: 'Faltó información adicional'
          })
          return
        }
        if (!datos.additional_info.items || datos.additional_info.items.length === 0) {
          res.status(404).json({
            message: 'Faltaron cursos para pedir'
          })
          return
        }
        datos.additional_info.items.map(async (item) => {
          await prisma.cursoUsuario.create({
            data: {
              tipo: 'MATRICULADO',
              cursoId: item.id,
              avance: "0",
              userId: datos.metadata.user_id_con
            }
          })
          await prisma.cursoPagadoDetalles.create({
            data: {
              cursoPagadoId: newCursoPagado.id,
              precio: item.unit_price,
              cantidad: Number(item.quantity),
              cursoId: item.id
            }
          })
        })
      } else {
        // HMAC verification failed
        console.log("HMAC verification failed");
        throw new Error('error')
      }
      res.status(200).json({
        message: 'Orden Guardada'
      })
      return
    }
    /** Cuando no ha sido permitido el pago  */
    res.status(200).json({
      message: 'Orden no permitida 🤷‍♂️'
    })
    return
  }
  catch (error) {
    console.log(error)
    
    res.status(500).json({
      message: 'Ocurrió un error en el servidor'
    })
    return
  }
}