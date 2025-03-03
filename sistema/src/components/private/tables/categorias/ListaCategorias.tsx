import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import { Loading } from '../../../shared/Loading'
import { DeleteItems } from '../../../shared/DeleteItems'
import { type categoriasValues } from '../../../shared/Interfaces'
import { toast } from 'sonner'
import { Paginacion } from '../../../shared/Paginacion'

export const ListaCategorias = (): JSX.Element => {
  const token = localStorage.getItem('token')
  const [productos, setProductos] = useState([])
  const [totalRegistros, setTotalRegistros] = useState(0)
  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(18)
  const [loadingComponents, setLoadingComponents] = useState(true)

  const navigate = useNavigate()

  const getAllCategorias = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${Global.url}/categorias`, {
        headers: {
          Authorization: `Bearer ${
            token !== null && token !== '' ? token : ''
          }`
        }
      })
      setProductos(data.categorias)
      setTotalRegistros(data.categorias.length)
      setLoadingComponents(false)
    } catch (error) {
      toast.error('Error al traer los datos')
      console.log(error)
    }
  }

  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  const totalPosts = productos.length

  const filterDate = (): never[] => {
    return productos.slice(indexOfFirstPost, indexOfLastPost)
  }

  const preguntar = (id: number): void => {
    DeleteItems({
      ruta: 'borrarCategoria',
      id,
      token,
      getData: getAllCategorias,
      totalPosts,
      cantidadRegistros,
      paginaActual,
      setpaginaActual
    })
  }

  useEffect(() => {
    getAllCategorias()
  }, [])

  return (
    <>
      {loadingComponents
        ? (
        <Loading />
          )
        : (
        <div className="p-4 rounded-xl mt-0">
          <div className="w-full flex justify-end">
            <button
              className="bg-main text-white hover:bg-main_dark w-fit flex items-center gap-2 py-2 px-4 rounded-lg transition-colors"
              onClick={() => {
                navigate('/admin/categorias/agregar')
              }}
            >
              Agregar categoria
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-6">
            {filterDate().map((pro: categoriasValues) => (
              <div
                key={pro.id}
                className="flex flex-col bg-secondary-100 min-h-[200px] pt-2 pb-1 px-3 rounded-2xl relative overflow-hidden group transition-all"
              >
                <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-black/50 z-[-300] opacity-0 group-hover:z-[300] group-hover:opacity-100 transition-all ">
                  <div className="flex gap-4">
                    <Link
                      className="text-xl hover:text-green-500 transition-colors"
                      to={`/admin/categorias/editar/${pro.id}`}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"></path>
                      </svg>
                    </Link>
                    <p
                      className="text-xl text-red-500 cursor-pointer"
                      onClick={() => {
                        preguntar(pro.id)
                      }}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
                      </svg>
                    </p>
                  </div>
                </div>
                <span className="absolute top-0 right-0 bg-main flex rounded-lg px-4 py-1 text-sm shadow">
                  ID: #{pro.id}
                </span>
                <div className="flex rounded-2xl overflow-hidden h-full">
                  <img
                    src={`${Global.urlImages}${pro.url_imagen}`}
                    alt=""
                    className="w-full h-full flex object-contain bg-transparent"
                  />
                </div>
                <div className="flex flex-col items-center justify-center mt-2 px-2">
                  <h5 className="text-center line-clamp-1 ">
                    {pro.nombre}
                  </h5>
                </div>
              </div>
            ))}
          </div>

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
          )}
    </>
  )
}
