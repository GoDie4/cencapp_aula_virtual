import axios from 'axios'
import { Global } from '../../../../helper/Global'
import { useEffect, useState } from 'react'
import useAuth from '../../../../hooks/useAuth'
import { Paginacion } from '../../../shared/Paginacion'
import { Loading } from '../../../shared/Loading'
import { type Ventas } from '../../../../interfaces/VentasInterface'
import VentaColumnas from './VentaColumnas'

export default function ListaVentas (): JSX.Element {
  const token = localStorage.getItem('token')
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  const [ventas, setVentas] = useState([])
  const [totalRegistros, setTotalRegistros] = useState(0)
  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(4)

  const getVentas = async (): Promise<void> => {
    try {
      setLoadingComponents(true)
      const { data } = await axios.get(`${Global.url}/mercado`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      setVentas(data.ventas)
      setTotalRegistros(data.ventas.length)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingComponents(false)
    }
  }

  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  const totalPosts = ventas.length

  const filterDate = (): Ventas[] => {
    return ventas.slice(indexOfFirstPost, indexOfLastPost)
  }

  useEffect(() => {
    setTitle('Listado de Ventas')
    getVentas()
  }, [])

  return (
    <>
      {loadingComponents
        ? (
          <Loading />)
        : (
          <div className="bg-secondary-100 p-8 rounded-xl mt-4">
            <div className="hidden md:grid grid-cols-1 md:grid-cols-6 gap-4 mb-10 p-4">
              <h5 className="md:text-center">Código</h5>
              <h5 className="md:text-center">Total</h5>
              <h5 className="md:text-center">Usuario Email</h5>
              <h5 className="md:text-center">Estado</h5>
              <h5 className="md:text-center">Id MercadoPago</h5>
              <h5 className="md:text-center">Acciones</h5>
            </div>
            {filterDate().map((venta: Ventas) => (
              <VentaColumnas key={venta.id} venta={venta} cantidadRegistros={cantidadRegistros} token={token ?? ''} getVentas={getVentas} totalPosts={totalPosts} paginaActual={paginaActual} setpaginaActual={setpaginaActual} />
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
