import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import { Loading } from '../../../shared/Loading'
import { Paginacion } from '../../../shared/Paginacion'
import { DeleteItems } from '../../../shared/DeleteItems'
import { toast } from 'sonner'
import { type Comentario } from '../../../../interfaces/ComentarioInterface'
import { ModalContext } from '../../../../context/ModalProvider'
import { ResponderComentario } from './components/ResponderComentario'
import { MdQuestionAnswer } from 'react-icons/md'
export const ListaComentarios = (): JSX.Element => {
  const token = localStorage.getItem('token')
  const [comentarios, setComentarios] = useState<Comentario[]>([])
  const [totalRegistros, setTotalRegistros] = useState(0)
  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(12)
  const [loadingComponents, setLoadingComponents] = useState(true)
  const { setModalContent } = useContext(ModalContext)
  const [estadoFiltro, setEstadoFiltro] = useState<
  'todos' | 'pendiente' | 'respondido'
  >('todos')
  const getAllComentarios = async (): Promise<void> => {
    try {
      const { data } = await axios.get(
        `${Global.url}/comentarios/allComentarios`,
        {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== '' ? token : ''
            }`
          }
        }
      )
      setComentarios(data.comentarios)
      setTotalRegistros(data.comentarios.length)
      setLoadingComponents(false)
    } catch (error) {
      console.log(error)
      toast.error('Error al traer los datos')
    }
  }

  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  const totalPosts =
    estadoFiltro === 'todos'
      ? comentarios.length
      : comentarios.filter((c) => c.estado === estadoFiltro).length

  const filterDate = (): Comentario[] => {
    const filtrados =
      estadoFiltro === 'todos'
        ? comentarios
        : comentarios.filter(
          (comentario) => comentario.estado === estadoFiltro
        )

    return filtrados.slice(indexOfFirstPost, indexOfLastPost)
  }

  const preguntar = (id: string): void => {
    DeleteItems({
      ruta: 'borrarCurso',
      id,
      token,
      getData: getAllComentarios,
      totalPosts,
      cantidadRegistros,
      paginaActual,
      setpaginaActual
    })
  }

  useEffect(() => {
    getAllComentarios()
  }, [])

  return (
    <>
      {loadingComponents
        ? (
        <Loading />
          )
        : (
        <div className="p-4 mt-0 rounded-xl">
          <div className="flex justify-start mb-4">
            <select
              value={estadoFiltro}
              onChange={(e) => {
                setEstadoFiltro(
                  e.target.value as 'todos' | 'pendiente' | 'respondido'
                )
              }}
              className="block pt-4 pb-4 pl-4 pr-4 mt-2 mb-0 ml-0 mr-0 text-base placeholder-gray-400 transition-all border border-black rounded-md outline-none w-fit focus:outline-none focus:border-black bg-secondary-900"
            >
              <option value="todos">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="respondido">Respondido</option>
            </select>
          </div>
          <div className="grid w-full grid-cols-1 gap-10 mt-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {filterDate()
              .reverse()
              .map((pro: Comentario) => (
                <div
                  key={pro.id}
                  className="flex bg-transparent border flex-col bg-secondary-100 min-h-[300px] pt-2 pb-1 px-3 rounded-2xl relative overflow-hidden group transition-all"
                >
                  <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-black/50 z-[-300] opacity-0 group-hover:z-[300] group-hover:opacity-100 transition-all ">
                    <div className="flex gap-4">
                      <p
                        className="text-2xl text-blue-600 cursor-pointer"
                        onClick={() => {
                          setModalContent({
                            title: '',
                            content: (
                              <ResponderComentario comentarioId={pro.id} />
                            )
                          })
                        }}
                      >
                        <MdQuestionAnswer />
                      </p>

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
                  {pro.estado === 'respondido' && (
                    <span className="absolute right-0 flex px-4 py-1 text-sm font-bold text-green-500 bg-green-100 rounded-full shadow top-8 ">
                      {pro.estado.charAt(0).toUpperCase() + pro.estado.slice(1)}
                    </span>
                  )}
                  {pro.estado === 'pendiente' && (
                    <span className="absolute right-0 flex px-4 py-1 text-sm font-bold text-yellow-500 bg-yellow-100 rounded-full shadow top-8 ">
                      {pro.estado.charAt(0).toUpperCase() + pro.estado.slice(1)}
                    </span>
                  )}
                  <span className="absolute top-0 right-0 flex px-4 py-1 text-sm rounded-lg shadow bg-main">
                    ID: #{pro.id}
                  </span>
                  <div className="flex items-center justify-center h-full pt-10 overflow-hidden rounded-2xl">
                    {pro.comentario}
                  </div>
                  <div className="flex flex-col items-center justify-center px-2 mt-2">
                    <h5 className="text-sm text-center uppercase line-clamp-1">
                      {pro.clase.nombre}
                    </h5>
                    {pro.clase.seccion && (
                      <h5 className="text-sm text-center text-gray-500 lowercase line-clamp-1">
                        {pro.clase?.seccion?.nombre +
                          ' ' +
                          pro.clase?.seccion?.curso.nombre}
                      </h5>
                    )}
                  </div>
                </div>
              ))}
          </div>

          <div className="flex flex-col justify-between gap-5 mt-8 md:flex-row md:gap-0 content_buttons ">
            <p className="ml-1 text-md"> {totalRegistros} Registros </p>
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
