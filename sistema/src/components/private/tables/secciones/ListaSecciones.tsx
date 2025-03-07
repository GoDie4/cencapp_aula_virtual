import { useEffect, useState } from 'react'
import { Loading } from '../../../shared/Loading'
import { Paginacion } from '../../../shared/Paginacion'
import { Global } from '../../../../helper/Global'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import { type SeccionInterface } from '../../../../interfaces/SeccionInterface'
import { FaSearch } from 'react-icons/fa'
import SeccionColumnas from './SeccionColumnas'
import { useSearchCurso } from '../../../../zustand/useSearchCurso'

export default function ListaSecciones (): JSX.Element {
  const { search, setSearch } = useSearchCurso()
  const token = localStorage.getItem('token')
  const [secciones, setProfesores] = useState([])
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  const [totalRegistros, setTotalRegistros] = useState(0)
  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(4)
  const navigate = useNavigate()

  const getSecciones = async (): Promise<void> => {
    try {
      setLoadingComponents(true)
      const { data } = await axios.get(`${Global.url}/seccionesBuscar/${search === '' ? 'all' : search}`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      setProfesores(data.secciones)
      setTotalRegistros(data.secciones.length)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingComponents(false)
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value)
  }

  const handleSearch = (): void => {
    getSecciones()
  }

  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  const totalPosts = secciones.length

  const filterDate = (): SeccionInterface[] => {
    return secciones.slice(indexOfFirstPost, indexOfLastPost)
  }

  useEffect(() => {
    setTitle('Listado de Profesores')
    getSecciones()
  }, [])

  return (
    <>
      {loadingComponents
        ? (
          <Loading />)
        : (
          <div className="bg-secondary-100 p-8 rounded-xl mt-4">
            <div className="w-full flex justify-between items-center mb-4 gap-3">
              <div className='flex'>
                <input type="text" name="search" id="search" value={search} onChange={handleInput} className="min-w-[300px] h-10 p-2 rounded-lg border border-main/50 bg-secondary-100 text-white focus:border-main focus:outline-none" placeholder="Buscar Sección por Curso" />
                <button className='px-2' type='button' title='Buscar' onClick={handleSearch}>
                  <FaSearch />
                </button>
              </div>
              <div className='flex items-center gap-2'>
                <button
                  type='button'
                  className="bg-main text-white hover:bg-main_dark w-fit flex items-center gap-2 py-2 px-4 rounded-lg transition-colors"
                  onClick={() => {
                    navigate('/admin/clases/agregar')
                  }}
                >
                  Agregar Clase
                </button>
                <button
                  type='button'
                  className="bg-main text-white hover:bg-main_dark w-fit flex items-center gap-2 py-2 px-4 rounded-lg transition-colors"
                  onClick={() => {
                    navigate('/admin/secciones/agregar')
                  }}
                >
                  Agregar Sección
                </button>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-1 md:grid-cols-6 gap-4 mb-10 p-4">
              <h5 className="md:text-center">Código</h5>
              <h5 className="md:text-center">Sección</h5>
              <h5 className="md:text-center">Curso</h5>
              <h5 className="md:text-center">Titulo</h5>
              <h5 className="md:text-center">Fecha de Creación</h5>
              <h5 className="md:text-center">Acciones</h5>

            </div>
            {filterDate().map((secc: SeccionInterface) => (
              <SeccionColumnas key={secc.id} secc={secc} cantidadRegistros={cantidadRegistros} token={token ?? ''} getSecciones={getSecciones} totalPosts={totalPosts} paginaActual={paginaActual} setpaginaActual={setpaginaActual} />
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
