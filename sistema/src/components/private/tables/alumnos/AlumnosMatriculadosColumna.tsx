import { useNavigate } from 'react-router-dom'
import { type CursosUsuarios } from '../../../../interfaces/CursoInterface'
import { ModalContext } from '../../../../context/ModalProvider'
import { useContext } from 'react'
import { parseDate } from '../../../../logic/parseDate'

export default function AlumnosMatriculadosColumna({ alum, token, getAlumnos, totalPosts, cantidadRegistros, paginaActual, setpaginaActual }: { alum: CursosUsuarios, token: string, getAlumnos: () => Promise<void>, totalPosts: number, cantidadRegistros: number, paginaActual: number, setpaginaActual: (pagina: number) => void }): JSX.Element {
  const { setModalContent } = useContext(ModalContext)
  const navigate = useNavigate()
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
    >
      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">Código</h5>
        <span>{alum.id}</span>
      </div>
      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Nombres
        </h5>
        <span>
          {alum.usuario?.nombres}
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Apellidos
        </h5>
        <span>
          {alum.usuario?.apellidos}
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Email
        </h5>
        <span>
          {alum.usuario?.email}
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Celular
        </h5>
        <span className=''>
          {alum.usuario?.celular ?? ''}
        </span>
      </div>

      <div className="md:text-center">
      <h5 className="md:hidden text-white font-bold mb-2">
          Fecha de matriculación
        </h5>
        <span className=''>
          {parseDate(alum.usuario?.createdAt)}
        </span>
      </div>

    </div>
  )
}
