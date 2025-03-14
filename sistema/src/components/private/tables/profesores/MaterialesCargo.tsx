import axios from 'axios'
import { type CursosUsuarios } from '../../../../interfaces/CursoInterface'
import { Global } from '../../../../helper/Global'
import useAuth from '../../../../hooks/useAuth'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { type MaterialesInterface } from '../../../../interfaces/MaterialesInterface'
import { Paginacion } from '../../../shared/Paginacion'
import { Loading } from '../../../shared/Loading'
import MaterialesColumna from '../materiales/MaterialesColumna'

interface Root {
  materiales: CursosUsuarios[]
}

export default function MaterialesCargo (): JSX.Element {

  const { id } = useParams()
  const { auth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.id !== id) {
      navigate('/login')
    }
  }, [])
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  const token = localStorage.getItem('token')
  const [materiales, setMateriales] = useState<CursosUsuarios[]>()
  const [totalRegistros, setTotalRegistros] = useState(0)
  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(4)

  const getMateriales = async (): Promise<void> => {
    try {
      setLoadingComponents(true)
      const { data } = await axios.get<Root>(`${Global.url}/materiales/cargo/${id ?? ''}`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      console.log(data.materiales)
      setMateriales(data.materiales)
      setTotalRegistros(filterDate().length)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingComponents(false)
    }
  }

  useEffect(() => {
    setTitle('Datos materiales cargo')
    getMateriales()
  }, [])

  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  const totalPosts = totalRegistros

  const filterDate = (): MaterialesInterface[] => {
    if (!materiales) {
      return [] as MaterialesInterface[]
    }
    console.log(materiales)
    const listaMateriales = materiales.slice(indexOfFirstPost, indexOfLastPost).flatMap(ejercicio => ejercicio.curso?.Seccion?.flatMap(seccion =>
      seccion.clases?.flatMap(clase => clase.materiales ?? []) ?? []
    ) ?? [])
    return listaMateriales
  }

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
                  navigate('/admin/materiales/cargo/crear')
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
            {filterDate().map((materiales: MaterialesInterface) => (
              <MaterialesColumna key={materiales.id} materiales={materiales} cantidadRegistros={cantidadRegistros} token={token ?? ''} getMateriales={getMateriales} totalPosts={totalPosts} paginaActual={paginaActual} setpaginaActual={setpaginaActual} />
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
