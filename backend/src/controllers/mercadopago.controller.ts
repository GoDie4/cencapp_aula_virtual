import { ENV } from '../config/config'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes'
import { Response, Request } from 'express'

const client = new MercadoPagoConfig({
  accessToken: ENV.ACCESS_TOKEN,
  options: {
    timeout: 10000,
    idempotencyKey: 'mercadopago'
  }
})

const preference = new Preference(client)

// const payment = new Payment(client)

export async function enviarVenta(req: Request, res: Response): Promise<void> {
  try {
    const body: PreferenceRequest = {
      items: [
        {
          id: '1',
          title: 'Prueba',
          quantity: 1,
          unit_price: 100
        }
      ],
    }
    const { init_point } = await preference.create({ body })
    console.log(init_point)
    res.json({
      init_point
    })
    return
  }
  catch (error) {
    console.log(error)
  }
}