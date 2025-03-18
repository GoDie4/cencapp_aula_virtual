import { useEffect, useState } from 'react'
import useAuth from '../../../../hooks/useAuth'
import { Global } from '../../../../helper/Global'
import axios from 'axios'
import { type MaterialesInterface } from '../../../../interfaces/MaterialesInterface'
import { Paginacion } from '../../../shared/Paginacion'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../../../shared/Loading'
import MaterialesColumna from './MaterialesColumna'

export default function ListaMateriales (): JSX.Element {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [materiales, setMateriales] = useState([])
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  const [totalRegistros, setTotalRegistros] = useState(0)
  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(4)

  const getMateriales = async (): Promise<void> => {
    try {
      setLoadingComponents(true)
      const { data } = await axios.get(`${Global.url}/materiales`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      setMateriales(data.materiales)
      setTotalRegistros(data.materiales.length)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingComponents(false)
    }
  }
  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  const totalPosts = materiales.length

  const filterDate = (): MaterialesInterface[] => {
    return materiales.slice(indexOfFirstPost, indexOfLastPost)
  }

  useEffect(() => {
    setTitle('Listado de Examenes')
    getMateriales()
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
                  navigate('/admin/materiales/agregar')
                }}
              >
                Registrar Material
              </button>
            </div>
            <div className="hidden md:grid grid-cols-1 md:grid-cols-6 gap-4 mb-10 p-4">
              <h5 className="md:text-center">Código</h5>
              <h5 className="md:text-center">Titulo</h5>
              <h5 className="md:text-center">Material</h5>
              <h5 className="md:text-center">Creado en</h5>
              <h5 className="md:text-center">Actualización en</h5>
              <h5 className="md:text-center">Acciones</h5>

            </div>
            {filterDate().map((ejer: MaterialesInterface) => (
              <MaterialesColumna key={ejer.id} materiales={ejer} cantidadRegistros={cantidadRegistros} token={token ?? ''} getMateriales={getMateriales} totalPosts={totalPosts} paginaActual={paginaActual} setpaginaActual={setpaginaActual} />
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
