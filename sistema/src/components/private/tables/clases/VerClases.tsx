import { type ClasesInterface } from '../../../../interfaces/ClasesInterface'
import { parseDate } from '../../../../logic/parseDate'
import '@justinribeiro/lite-youtube'

export default function VerClases ({ clase }: { clase: ClasesInterface }): JSX.Element {
  return (
    <div className='w-full space-y-5'>
      <div>
        <h5 className='text-black font-bold'>Código</h5>
        <span>{clase.id}</span>
      </div>
      <div>
        <h5 className='text-black font-bold'>Título de la Sección</h5>
        <span>{clase.seccion?.nombre}</span>
      </div>
      <div>
        <h5 className='text-black font-bold'>Título del Tema</h5>
        <span>{clase.nombre}</span>
      </div>
      <div>
        <h5 className='text-black font-bold'>Posición</h5>
        <span>{clase.posicion}</span>
      </div>
      <div>
        <h5 className='text-black font-bold'>Duración</h5>
        <span>{clase.duracion}</span>
      </div>
      <div className='w-full flex lg:flex-row flex-col gap-3'>
        <div className='w-1/2'>
          <h5 className='text-black font-bold'>Fecha de Registro</h5>
          <span>{parseDate(clase.createdAt) }</span>
        </div>
        <div className='w-1/2'>
          <h5 className='text-black font-bold'>Fecha de Actualización</h5>
          <span>{parseDate(clase.updatedAt) }</span>
        </div>
      </div>
      <div className='space-y-3'>
        <h5 className='text-black font-bold'>Video</h5>
        <lite-youtube videoid={clase.url_video}></lite-youtube>
      </div>
    </div>
  )
}
