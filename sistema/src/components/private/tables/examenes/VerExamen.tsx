import { type TestInterface } from '../../../../interfaces/TestInterface'
import { parseDate } from '../../../../logic/parseDate'

export default function VerExamen ({ exam }: { exam: TestInterface }): JSX.Element {
  return (
    <div className="space-y-4">
      <div>
        <h3 className='font-bold'>Código</h3>
        <p className='font-medium'>{exam.id}</p>
      </div>
      <div>
        <h3 className='font-bold'>Título</h3>
        <p className='font-medium'>{exam.titulo}</p>
      </div>
      <div className='flex max-lg:flex-col w-full gap-4'>
        <div className='w-full lg:w-1/2'>
          <h3 className='font-bold'>Tipo de Prueba</h3>
          <p className='font-medium'>{exam.tipo_prueba}</p>
        </div>
        <div className='w-full lg:w-1/2'>
          <h3 className='font-bold'>Nombre de Curso</h3>
          <p className='font-medium'>{exam.clase?.nombre}</p>
        </div>
      </div>
      <div className='flex max-lg:flex-col w-full gap-4'>
        <div className='w-full lg:w-1/2'>
          <h3 className='font-bold'>Fecha de Inicio</h3>
          <p className='font-medium'>{parseDate(exam.fecha_inicio)}</p>
        </div>
        <div className='w-full lg:w-1/2'>
          <h3 className='font-bold'>Fecha de Fin</h3>
          <p className='font-medium'>{parseDate(exam.fecha_fin)}</p>
        </div>
      </div>
      <div className='w-full max-lg:flex-col flex gap-4'>
        <div className='w-full lg:w-1/2'>
          <h3 className='font-bold'>Puntaje Máximo</h3>
          <p className='font-medium'>{exam.puntaje_maxima}</p>
        </div>
        <div className='w-full lg:w-1/2'>
          <h3 className='font-bold'>Tiempo Limite</h3>
          <p className='font-medium'>{exam.tiempo_limite}</p>
        </div>
      </div>
      <div className='w-full'>
        <h3 className='font-bold'>Descripción</h3>
        <div dangerouslySetInnerHTML={{ __html: exam.descripcion }}></div>
      </div>
      <div>
        <h3 className='font-bold'>Fecha de Registro al Sistema</h3>
        <p className='font-medium'>{parseDate(exam.createdAt ?? new Date())}</p>
      </div>
      <div>
        <h3 className='font-bold'>Fecha de Última Modificación</h3>
        <p className='font-medium'>{parseDate(exam.updatedAt ?? new Date())}</p>
      </div>
    </div>
  )
}
