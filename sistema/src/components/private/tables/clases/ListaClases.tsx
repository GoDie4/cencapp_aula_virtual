import { useEffect, useState } from 'react'
import { Global } from '../../../../helper/Global'
import { useSearchSeccion } from '../../../../zustand/useSearchSeccion'
import useAuth from '../../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Loading } from '../../../shared/Loading'
import { FaSearch } from 'react-icons/fa'
import { Paginacion } from '../../../shared/Paginacion'
import { type ClasesInterface } from '../../../../interfaces/ClasesInterface'
import ClaseColumnas from './ClaseColumnas'

export default function ListaClases (): JSX.Element {
  const { search, setSearch } = useSearchSeccion()
  const token = localStorage.getItem('token')
  const [clases, setClases] = useState([])
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  const [totalRegistros, setTotalRegistros] = useState(0)
  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(4)
  const navigate = useNavigate()

  const getClases = async (): Promise<void> => {
    try {
      setLoadingComponents(true)
      const { data } = await axios.get(`${Global.url}/clasesBuscar/${search === '' ? 'all' : search}`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      setClases(data.clases)
      setTotalRegistros(data.clases.length)
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
    getClases()
  }

  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  const totalPosts = clases.length

  const filterDate = (): ClasesInterface[] => {
    return clases.slice(indexOfFirstPost, indexOfLastPost)
  }

  useEffect(() => {
    setTitle('Listado de Clases')
    getClases()
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
                  <input type="text" name="search" id="search" value={search} onChange={handleInput} className="min-w-[300px] h-10 p-2 rounded-lg border border-main/50 bg-secondary-100 text-white focus:border-main focus:outline-none" placeholder="Buscar Sección por nombre" />
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
                </div>
              </div>
              <div className="hidden md:grid grid-cols-1 md:grid-cols-6 gap-4 mb-10 p-4">
                <h5 className="md:text-center">Código</h5>
                <h5 className="md:text-center">Título Sección</h5>
                <h5 className="md:text-center">Tema Clase</h5>
                <h5 className="md:text-center">Posición</h5>
                <h5 className="md:text-center">Duración</h5>
                <h5 className="md:text-center">Acciones</h5>
              </div>
              {filterDate().map((clase: ClasesInterface) => (
                <ClaseColumnas key={clase.id} clase={clase} cantidadRegistros={cantidadRegistros} token={token ?? ''} getClases={getClases} totalPosts={totalPosts} paginaActual={paginaActual} setpaginaActual={setpaginaActual} />
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
