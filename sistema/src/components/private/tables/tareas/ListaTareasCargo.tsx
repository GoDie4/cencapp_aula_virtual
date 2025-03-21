import { useEffect, useState } from 'react'
import useAuth from '../../../../hooks/useAuth'
import type { TestResuelto } from '../../../../interfaces/TestInterface'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import { type CursosUsuarios } from '../../../../interfaces/CursoInterface'
import { Paginacion } from '../../../shared/Paginacion'
import { Loading } from '../../../shared/Loading'
import TareaCargoColumna from './TareaCargoColumna'

interface Root {
  ejercicios: CursosUsuarios[]
}

export default function ListaTareasCargo (): JSX.Element {
  const token = localStorage.getItem('token')
  const [totalRegistros, setTotalRegistros] = useState(0)
  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(4)
  const [ejercicios, setEjercicios] = useState<CursosUsuarios[]>([])
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()

  const getEjercicios = async (): Promise<void> => {
    try {
      setLoadingComponents(true)
      const { data } = await axios.get<Root>(`${Global.url}/ejercicios/revisar`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      console.log(data.ejercicios)
      setEjercicios(data.ejercicios)
      setTotalRegistros(filterDate().length)
      console.log(filterDate().length)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingComponents(false)
    }
  }

  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  const totalPosts = totalRegistros

  const filterDate = (): TestResuelto[] => {
    if (!ejercicios) {
      return [] as TestResuelto[]
    }
    console.log(ejercicios)
    const listaEjercicios = ejercicios.slice(indexOfFirstPost, indexOfLastPost).flatMap(ejercicio => ejercicio.curso?.Seccion.flatMap(seccion => seccion.clases?.flatMap(clase => clase.test?.flatMap(test => test.examenesResueltos ?? []) ?? []) ?? []) ?? [])
    return listaEjercicios
  }

  useEffect(() => {
    setTitle('Datos ejercicios cargo')
    getEjercicios()
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
              <h5 className="md:text-center">Titulo</h5>
              <h5 className="md:text-center">Examen</h5>
              <h5 className="md:text-center">Activo</h5>
              <h5 className="md:text-center">Tipo</h5>
              <h5 className="md:text-center">Acciones</h5>

            </div>
            {
              ejercicios.map((cursoUsuario: CursosUsuarios) => {
                if (!cursoUsuario.curso) {
                  return <></>
                }
                return cursoUsuario.curso.Seccion.map((seccion) => {
                  return seccion.clases?.map((clase) => {
                    return clase.test?.map((test) => {
                      return test.examenesResueltos?.map((ejercicioResuelto) => {
                        return (
                          <TareaCargoColumna
                            key={ejercicioResuelto.id}
                            ejer={ejercicioResuelto}
                            curso={cursoUsuario.curso}
                            test={test}
                            getEjercicios={getEjercicios}
                          />
                        )
                      })
                    })
                  })
                })
              })
            }
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
