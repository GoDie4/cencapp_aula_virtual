import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Global } from '../../../../helper/Global'
import axios from 'axios'
import { useEffect, useState } from 'react'
import useAuth from '../../../../hooks/useAuth'
import { Paginacion } from '../../../shared/Paginacion'
import { Loading } from '../../../shared/Loading'
import { type CursosUsuarios } from '../../../../interfaces/CursoInterface'
import CursosCargoColumna from './CursosCargoColumna'

export default function VerCursosCargo (): JSX.Element {
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  const [cursosCargo, setCursosCargo] = useState([])
  const [totalRegistros, setTotalRegistros] = useState(0)
  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(4)

  const getCursosCargo = async (): Promise<void> => {
    setLoadingComponents(true)
    try {
      const { data } = await axios.get(`${Global.url}/cargosCurso/${id ?? ''}`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      setCursosCargo(data.profesor)
      setTotalRegistros(data.profesor.length)
      console.log(data)
    } catch (error) {
      toast.error('Error al traer los datos de las cursos')
    } finally {
      setLoadingComponents(false)
    }
  }

  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  const totalPosts = cursosCargo.length

  const filterDate = (): CursosUsuarios[] => {
    return cursosCargo.slice(indexOfFirstPost, indexOfLastPost)
  }
  useEffect(() => {
    setTitle('Datos cursos cargo')
    getCursosCargo()
  }, [])
  return (
    <>
      {loadingComponents
        ? (
          <Loading />)
        : (
          <div className="bg-secondary-100 p-8 rounded-xl mt-4">
            <div className="hidden md:grid grid-cols-1 md:grid-cols-6 gap-4 mb-10 p-4">
              <h5 className="md:text-center">Código</h5>
              <h5 className="md:text-center">Nombre del Curso</h5>
              <h5 className="md:text-center">Nombre del Docente</h5>
              <h5 className="md:text-center">Email del Docente</h5>
              <h5 className="md:text-center">Tipo</h5>
              <h5 className="md:text-center">Acciones</h5>

            </div>
            {filterDate().map((cur: CursosUsuarios) => (
              <CursosCargoColumna key={cur.id} cur={cur} />
            ))}

            <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between content_buttons ">
              <p className="text-md ml-1"> {totalRegistros} Registros </p>
              <Paginacion
                totalPosts={totalPosts}
                cantidadRegistros={cantidadRegistros}
                paginaActual={paginaActual}
                setpaginaActual={setpaginaActual}
              />
            </div>
          </div>
          )}
    </>
  )
}
