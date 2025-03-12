import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Global } from '../../../../helper/Global'
import axios from 'axios'
import { toast } from 'sonner'
import { type CursosUsuarios } from '../../../../interfaces/CursoInterface'
import { Paginacion } from '../../../shared/Paginacion'
import { Loading } from '../../../shared/Loading'

export default function MatriculaCurso (): JSX.Element {
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const [alumnos, setAlumnos] = useState([])
  const [loadingComponents, setLoadingComponents] = useState(true)
  const [totalRegistros, setTotalRegistros] = useState(0)
  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(12)

  const getCurso = async (): Promise<void> => {
    try {
      setLoadingComponents(true)
      const { data } = await axios.get(`${Global.url}/matriculadoCurso/${id ?? ''}`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      setAlumnos(data.alumnos)
      setTotalRegistros(data.alumnos.length)
    } catch (error) {
      toast.error('Error al traer datos del producto')
      console.log(error)
    } finally {
      setLoadingComponents(false)
    }
  }

  useEffect(() => {
    getCurso()
  }, [])

  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  const totalPosts = alumnos.length
  const filterDate = (): CursosUsuarios[] => {
    return alumnos.slice(indexOfFirstPost, indexOfLastPost)
  }

  return (
    <>
      {loadingComponents
        ? (<Loading />)
        : (
          <>
            <div className='w-full bg-secondary-100 p-8 rounded-xl mt-4'>
              <div className="hidden md:grid grid-cols-1 md:grid-cols-6 gap-4 mb-10 p-4">
                <h5 className="md:text-center">ID</h5>
                <h5 className="md:text-center">Nombres</h5>
                <h5 className="md:text-center">Apellidos</h5>
                <h5 className="md:text-center">Email</h5>
                <h5 className="md:text-center">Celular</h5>
                <h5 className="md:text-center">Curso Matriculado</h5>
              </div>
              {filterDate().map((pro: CursosUsuarios) => (
                <div
                  className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
                  key={pro.id}
                >
                  <div className="md:text-center">
                    <h5 className="md:hidden text-white font-bold mb-2">ID</h5>
                    <span>#{pro.id}</span>
                  </div>
                  <div className="md:text-center">
                    <h5 className="md:hidden text-white font-bold mb-2">Nombres</h5>
                    <span>{pro.usuario?.nombres}</span>
                  </div>

                  <div className="md:text-center">
                    <h5 className="md:hidden text-white font-bold mb-2">
                      Apellidos
                    </h5>
                    <span>{pro.usuario?.apellidos}</span>
                  </div>

                  <div className="md:text-center">
                    <h5 className="md:hidden text-white font-bold mb-2">Email</h5>
                    <span>{pro.usuario?.email}</span>
                  </div>

                  <div className="md:text-center">
                    <h5 className="md:hidden text-white font-bold mb-2">Celular</h5>
                    <span>{pro.usuario?.celular}</span>
                  </div>

                  <div className="md:text-center">
                    <h5 className="md:hidden text-white font-bold mb-2">Curso Matriculado</h5>
                    <span>{pro.curso?.nombre}</span>
                  </div>
                </div>
              ))}
              <div className="flex flex-col md:flex-row gap-5 mt-8 md:gap-0 justify-between content_buttons ">
                <p className="text-md ml-1"> {totalRegistros} Registros </p>
                <Paginacion
                  totalPosts={totalPosts}
                  cantidadRegistros={cantidadRegistros}
                  paginaActual={paginaActual}
                  setpaginaActual={setpaginaActual}
                />
              </div>
            </div>
          </>
          )
      }
    </>
  )
}
