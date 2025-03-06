import { type ProfesorInterface } from '../../../../interfaces/ProfesoresInterface'
import { parseDate } from '../../../../logic/parseDate'

export default function VerProfesor ({ pro }: { pro: ProfesorInterface }): JSX.Element {
  return (
    <div className="space-y-4">
      <div>
        <h3 className='font-bold'>Nombres</h3>
        <p className='font-medium'>{pro.nombres}</p>
      </div>
      <div>
        <h3 className='font-bold'>Apellidos</h3>
        <p className='font-medium'>{pro.apellidos}</p>
      </div>
      <div>
        <h3 className='font-bold'>Email</h3>
        <p className='font-medium'>{pro.email}</p>
      </div>
      <div>
        <h3 className='font-bold'>Rol</h3>
        <p className='font-medium'>{pro.rol?.nombre ?? ''}</p>
      </div>
      <div>
        <h3 className='font-bold'>Fecha de Registro al Sistema</h3>
        <p className='font-medium'>{parseDate(pro.createdAt ?? new Date())}</p>
      </div>
      <div>
        <h3 className='font-bold'>Fecha de Última Modificación</h3>
        <p className='font-medium'>{parseDate(pro.updatedAt ?? new Date())}</p>
      </div>
    </div>
  )
}
