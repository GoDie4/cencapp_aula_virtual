import { useParams } from 'react-router-dom'
import { Global } from '../../../../helper/Global'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Paginacion } from '../../../shared/Paginacion'
import { Loading } from '../../../shared/Loading'
import EjerciciosCargoColumna from './EjerciciosCargoColumna'
import useAuth from '../../../../hooks/useAuth'
import { type CursosUsuarios } from '../../../../interfaces/CursoInterface'
import { type TestInterface } from '../../../../interfaces/TestInterface'
import { SeccionInterface } from '../../../../interfaces/SeccionInterface'

export interface Root {
  profesor: CursosUsuarios
}

export default function EjerciciosCargo (): JSX.Element {
  const { id } = useParams()
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  const token = localStorage.getItem('token')
  const [ejercicios, setEjercicios] = useState<CursosUsuarios>()
  const [totalRegistros, setTotalRegistros] = useState(0)
  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(4)

  const getEjercicios = async (): Promise<void> => {
    try {
      setLoadingComponents(true)
      const { data } = await axios.get<Root>(`${Global.url}/ejercicios/documento/${id ?? ''}`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      setEjercicios(data.profesor)
      setTotalRegistros(data.profesor.length)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingComponents(false)
    }
  }
  useEffect(() => {
    setTitle('Datos ejercicios cargo')
    getEjercicios()
  }, [])

  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  const totalPosts = ejercicios

  const filterDate = (): SeccionInterface[] => {
    return ejercicios?.curso?.Seccion.slice(indexOfFirstPost, indexOfLastPost)
  }

  return (
    <>
      {loadingComponents
        ? (
          <Loading />)
        : (
          <div className="bg-secondary-100 p-8 rounded-xl mt-4">
            <div className="hidden md:grid grid-cols-1 md:grid-cols-6 gap-4 mb-10 p-4">
              <h5 className="md:text-center">Código</h5>
              <h5 className="md:text-center">Nombre del Curso</h5>
              <h5 className="md:text-center">Nombre del Docente</h5>
              <h5 className="md:text-center">Email del Docente</h5>
              <h5 className="md:text-center">Tipo</h5>
              <h5 className="md:text-center">Acciones</h5>

            </div>
            {filterDate().map((ejer: CursosUsuarios) => (
              <EjerciciosCargoColumna key={ejer.id} ejer={ejer} />
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
