import { type Ventas } from '../../../../interfaces/VentasInterface'

export default function VerVenta({ venta }: { venta: Ventas }): JSX.Element {
  return (
    <div className='w-full space-y-5'>
      <div>
        <h5 className='text-black font-bold'>Código</h5>
        <span>{venta.id}</span>
      </div>
      <div className='flex gap-3 max-lg:flex-col'>
        <div className='lg:w-1/2 w-full'>
          <h5 className='text-black font-bold'>Estado</h5>
          <span className='uppercase'>{venta.estado}</span>
        </div>
        <div className='lg:w-1/2 w-full'>
          <h5 className='text-black font-bold'>Estado Detalle</h5>
          <span className='uppercase'>{venta.estado_detalle}</span>
        </div>
      </div>
      <div className='flex gap-3 max-lg:flex-col'>
        <div className='lg:w-1/2 w-full'>
          <h5 className='text-black font-bold'>Total Cobrado:</h5>
          <span>S/. {venta.total}</span>
        </div>
        <div className='lg:w-1/2 w-full'>
          <h5 className='text-black font-bold'>Total Recibido:</h5>
          <span>S/. {venta.total_neto}</span>
        </div>
      </div>
      <div>
        <h5 className='text-black font-bold'>Usuario Email</h5>
        <span>{venta.usuario?.email}</span>
      </div>
      <div className='flex gap-3 max-lg:flex-col'>
        <div className='lg:w-1/2 w-full'>
          <h5 className='text-black font-bold'>Últimos caracteres de la tarjeta</h5>
          <span>{venta.ultimo_caracteres}</span>
        </div>
        <div className='lg:w-1/2 w-full'>
          <h5 className='text-black font-bold'>Cantidad de Cursos Pagados</h5>
          <span>{venta.detalles?.length}</span>
        </div>
      </div>
    </div>
  )
}
