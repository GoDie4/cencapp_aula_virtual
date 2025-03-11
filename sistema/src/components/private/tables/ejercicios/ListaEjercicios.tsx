import { useEffect, useState } from 'react'
import { type TestInterface } from '../../../../interfaces/TestInterface'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import { Paginacion } from '../../../shared/Paginacion'
import { Loading } from '../../../shared/Loading'
import EjercicioColumna from './EjercicioColumna'

export default function ListaEjercicios (): JSX.Element {
  const token = localStorage.getItem('token')
  const [examenes, setExamenes] = useState([])
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  const [totalRegistros, setTotalRegistros] = useState(0)
  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(4)
  const navigate = useNavigate()

  const getExamenes = async (): Promise<void> => {
    try {
      setLoadingComponents(true)
      const { data } = await axios.get(`${Global.url}/ejercicios`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      setExamenes(data.tests)
      setTotalRegistros(data.tests.length)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingComponents(false)
    }
  }

  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  const totalPosts = examenes.length

  const filterDate = (): TestInterface[] => {
    return examenes.slice(indexOfFirstPost, indexOfLastPost)
  }

  useEffect(() => {
    setTitle('Listado de Examenes')
    getExamenes()
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
                  navigate('/admin/ejercicios/agregar')
                }}
              >
                Registrar Ejercicio
              </button>
            </div>
            <div className="hidden md:grid grid-cols-1 md:grid-cols-6 gap-4 mb-10 p-4">
              <h5 className="md:text-center">Código</h5>
              <h5 className="md:text-center">Titulo</h5>
              <h5 className="md:text-center">Examen</h5>
              <h5 className="md:text-center">Activo</h5>
              <h5 className="md:text-center">Tipo</h5>
              <h5 className="md:text-center">Acciones</h5>

            </div>
            {filterDate().map((ejer: TestInterface) => (
              <EjercicioColumna key={ejer.id} ejer={ejer} cantidadRegistros={cantidadRegistros} token={token ?? ''} getExamenes={getExamenes} totalPosts={totalPosts} paginaActual={paginaActual} setpaginaActual={setpaginaActual} />
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
