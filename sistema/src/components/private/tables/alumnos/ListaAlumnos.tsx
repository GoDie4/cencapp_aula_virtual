import axios from "axios"
import { Global } from "../../../../helper/Global"
import { useEffect, useState } from "react"
import useAuth from "../../../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { Usuario } from "../../../../interfaces/UserInterface"
import { Paginacion } from "../../../shared/Paginacion"
import { AlumnoColumnas } from "./AlumnoColumnas"
import { Loading } from "../../../shared/Loading"

export function ListaAlumnos() {
  const token = localStorage.getItem('token')
  const [alumnos, setAlumnos] = useState([])
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  const [totalRegistros, setTotalRegistros] = useState(0)
  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(4)
  const navigate = useNavigate()

  const getAlumnos = async (): Promise<void> => {
    try {
      setLoadingComponents(true)
      const { data } = await axios.get(`${Global.url}/alumnos`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      setAlumnos(data.alumnos)
      setTotalRegistros(data.alumnos.length)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingComponents(false)
    }
  }

  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  const totalPosts = alumnos.length

  const filterDate = (): Usuario[] => {
    return alumnos.slice(indexOfFirstPost, indexOfLastPost)
  }

  useEffect(() => {
    setTitle('Listado de alumnos')
    getAlumnos()
  }, [])


  return (
    <>
      {loadingComponents
        ? (
          <Loading />)
        : (
          <div className="bg-secondary-100 p-8 rounded-xl mt-4">
            <div className="w-full flex justify-end">
              <button
                className="bg-main text-white hover:bg-main_dark w-fit flex items-center gap-2 py-2 px-4 rounded-lg transition-colors"
                onClick={() => {
                  navigate('/admin/alumnos/agregar')
                }}
              >
                Registrar Alumno
              </button>
            </div>
            <div className="hidden md:grid grid-cols-1 md:grid-cols-6 gap-4 mb-10 p-4">
              <h5 className="md:text-center">Código</h5>
              <h5 className="md:text-center">Nombres</h5>
              <h5 className="md:text-center">Apellidos</h5>
              <h5 className="md:text-center">Email</h5>
              <h5 className="md:text-center">Rol</h5>
              <h5 className="md:text-center">Acciones</h5>

            </div>
            {filterDate().map((alum: Usuario) => (
              <AlumnoColumnas key={alum.id} alum={alum} cantidadRegistros={cantidadRegistros} token={token ?? ''} getAlumnos={getAlumnos} totalPosts={totalPosts} paginaActual={paginaActual} setpaginaActual={setpaginaActual} />
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