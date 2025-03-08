import { type DetallesVentas } from '../../../../interfaces/VentasInterface'

export default function VerDetalle({ detalle }: { detalle: DetallesVentas[] }): JSX.Element {
  return (
    <div className='w-full space-y-5'>
      {
        detalle.map((detalleVenta: DetallesVentas) => {
          return (
            <div key={detalleVenta.id} className='w-full space-y-5 border-t-2 border-b-2 border-gray-500 py-7'>
              <div className='w-full'>
                <h5 className='text-black font-bold'>Código</h5>
                <span>{detalleVenta.id}</span>
              </div>
              <div className='w-full'>
                <h5 className='text-black font-bold'>Curso</h5>
                <span>{detalleVenta.curso?.nombre}</span>
              </div>
              <div className='flex gap-3 max-lg:flex-col'>
                <div className='lg:w-1/2 w-full'>
                  <h5 className='text-black font-bold'>Cantidad</h5>
                  <span>{detalleVenta.cantidad}</span>
                </div>
                <div className='lg:w-1/2 w-full'>
                  <h5 className='text-black font-bold'>Precio</h5>
                  <span>S/. {detalleVenta.precio}</span>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
