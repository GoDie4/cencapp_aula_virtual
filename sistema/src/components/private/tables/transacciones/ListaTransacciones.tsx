/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import { RiEyeLine } from 'react-icons/ri'
import { Loading } from '../../../shared/Loading'
import { Paginacion } from '../../../shared/Paginacion'

export const ListaTransacciones = (): JSX.Element => {
  const token = localStorage.getItem('token')
  const [productos, setProductos] = useState([])
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  const [totalRegistros, setTotalRegistros] = useState(0)
  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(4)

  const getTransacciones = async (): Promise<void> => {
    try {
      setLoadingComponents(true)
      const { data } = await axios.get(`${Global.url}/checkout/findAll`, {
        headers: {
          Authorization: `Bearer ${
            token !== null && token !== '' ? token : ''
          }`
        }
      })
      console.log(data)
      setProductos(data.message)
      setTotalRegistros(data.message.length)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingComponents(false)
    }
  }

  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  const totalPosts = productos.length

  const filterDate = (): never[] => {
    return productos.slice(indexOfFirstPost, indexOfLastPost)
  }

  useEffect(() => {
    setTitle('Listado de Transacciones')
    getTransacciones()
  }, [])

  return (
    <>
      {loadingComponents
        ? (
        <Loading />
          )
        : (
        <div className="bg-secondary-100 p-8 rounded-xl mt-4">
          <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-4 mb-10 p-4">
            <h5 className="md:text-center">ID</h5>
            <h5 className="md:text-center">Cliente</h5>
            <h5 className="md:text-center">Id Transacción</h5>
            <h5 className="md:text-center">Estado</h5>
            <h5 className="md:text-center">Ver</h5>
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
                <h5 className="md:hidden text-white font-bold mb-2">Cliente</h5>
                <span>{pro.nombres}</span>
              </div>

              <div className="md:text-center">
                <h5 className="md:hidden text-white font-bold mb-2">
                  Id Transacción
                </h5>
                <span>{pro.paymentId}</span>
              </div>

              <div className="md:text-center">
                <h5 className="md:hidden text-white font-bold mb-2">Estado</h5>
                {pro.estado == 0
                  ? (
                  <span className="bg-yellow-400 py-2 px-3 text-black  rounded-md">
                    POR REVISAR
                  </span>
                    )
                  : pro.estado == 1
                    ? (
                  <span className="bg-main py-2 px-3 text-white  rounded-md">
                    RECHAZADO
                  </span>
                      )
                    : pro.estado == 2
                      ? (
                  <span className="bg-green-400 py-2 px-3 text-black  rounded-md">
                    APROBADO
                  </span>
                        )
                      : (
                          ''
                        )}
              </div>

              <div className="md:text-center md:flex md:justify-center">
                <h5 className="md:hidden text-white font-bold mb-2">VER</h5>
                <Link to={`viewTransaccion/${pro.id}`}>
                  <RiEyeLine className="text-2xl text-whtie" />
                </Link>
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
  )
}
