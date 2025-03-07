import { type SeccionInterface } from '../../../../interfaces/SeccionInterface'

export default function VerSecciones ({ secc }: { secc: SeccionInterface }): JSX.Element {
  return (
    <div className='w-full space-y-5'>
      <div>
        <h5 className='text-black font-bold'>Código</h5>
        <span>{secc.id}</span>
      </div>
      <div>
        <h5 className='text-black font-bold'>Sección</h5>
        <span>Módulo {secc.posicion}</span>
      </div>
      <div>
        <h5 className='text-black font-bold'>Curso</h5>
        <span>{secc.curso.nombre}</span>
      </div>
      <div>
        <h5 className='text-black font-bold'>Titulo</h5>
        <span>{secc.nombre}</span>
      </div>
      <div>
        <h5 className='text-black font-bold'>Clases</h5>
        {
          secc.clases?.length === 0 &&
          <span>No hay clases asociadas</span>
        }
        {
          secc.clases?.map((clase: any) => (
            <div key={clase.id}>
              <span>-<span className='font-bold'>Título</span>: {clase.nombre} - <span className='font-bold'>Duración</span>: {clase.duracion} - <span className='font-bold'>Posición</span>: {clase.posicion}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}
