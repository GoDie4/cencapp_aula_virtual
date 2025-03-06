/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import { Loading } from '../../../shared/Loading'
import { Paginacion } from '../../../shared/Paginacion'
import { toast } from 'sonner'
import { FaRegEdit, FaRegWindowClose } from 'react-icons/fa'
import { DeleteItems } from '../../../shared/DeleteItems'

export const ListaDistritos = (): JSX.Element => {
  const token = localStorage.getItem('token')
  const [productos, setProductos] = useState([])
  const [totalRegistros, setTotalRegistros] = useState(0)
  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(12)
  const [loadingComponents, setLoadingComponents] = useState(true)

  const getAllProductos = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${Global.url}/distritos/findAll`, {
        headers: {
          Authorization: `Bearer ${
            token !== null && token !== '' ? token : ''
          }`
        }
      })
      setProductos(data.message)
      setTotalRegistros(data.message.length)
      setLoadingComponents(false)
    } catch (error) {
      console.log(error)
      toast.error('Error al traer los datos')
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
      ruta: 'distritos/delete',
      id,
      token,
      getData: getAllProductos,
      totalPosts,
      cantidadRegistros,
      paginaActual,
      setpaginaActual
    })
  }

  useEffect(() => {
    getAllProductos()
  }, [])

  return (
    <>
      <>
        <div className="w-full flex justify-end">
          <Link
            to="agregar"
            className="w-fit px-4 py-2 text-white bg-main rounded-md hover:bg-main_dark mt-4"
          >
            Crear distrito
          </Link>
        </div>
        {loadingComponents ? (
          <Loading />
        ) : (
          <div className="bg-secondary-100 p-8 rounded-xl mt-4">
            <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-4 mb-10 p-4">
              <h5 className="md:text-center">ID</h5>
              <h5 className="md:text-center">Departamento</h5>
              <h5 className="md:text-center">Distrito</h5>
              <h5 className="md:text-center">Precio</h5>
              <h5 className="md:text-center">Opciones</h5>
            </div>
            {filterDate().map((pro: any) => (
              <div
                className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
                key={pro.id}
              >
                <div className="md:text-center">
                  <h5 className="md:hidden text-white font-bold mb-2">ID</h5>
                  <span>#{pro.id}</span>
                </div>
                <div className="md:text-center">
                  <h5 className="md:hidden text-white font-bold mb-2">
                    Departamento
                  </h5>
                  <p className="lowercase first-letter:uppercase ">
                    {pro.departamento}
                  </p>
                </div>
                <div className="md:text-center">
                  <h5 className="md:hidden text-white font-bold mb-2">
                    Distrito
                  </h5>
                  <p className="lowercase first-letter:uppercase ">
                    {pro.nombre}
                  </p>
                </div>
                <div className="md:text-center">
                  <h5 className="md:hidden text-white font-bold mb-2">
                    Precio
                  </h5>
                  <p className="lowercase first-letter:uppercase ">
                    {pro.precio}
                  </p>
                </div>
                <div className="md:text-center md:flex md:justify-center">
                  <h5 className="md:hidden text-white font-bold mb-2">
                    Opciones
                  </h5>
                  <Link to={`editar/${pro.id}`}>
                    <FaRegEdit className="text-2xl text-white" />
                  </Link>
                  <button
                    className="mt-3 lg:mt-0 lg:ml-3"
                    onClick={() => {
                      preguntar(pro.id)
                    }}
                  >
                    <FaRegWindowClose className="text-2xl text-red-500" />
                  </button>
                </div>
              </div>
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
    </>
  )
}
