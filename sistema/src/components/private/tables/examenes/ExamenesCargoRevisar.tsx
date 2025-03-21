import axios from 'axios'
import useAuth from '../../../../hooks/useAuth'
import { Global } from '../../../../helper/Global'
import { useEffect, useState } from 'react'
import { Paginacion } from '../../../shared/Paginacion'
import { Loading } from '../../../shared/Loading'
import { type CursosUsuarios } from '../../../../interfaces/CursoInterface'
import { type TestInterface, type TestResuelto } from '../../../../interfaces/TestInterface'
import { ExamenesCargoColumna } from './ExamenesCargoColumna'

export default function ExamenesCargoRevisar (): JSX.Element {
  const { loadingComponents, setLoadingComponents } = useAuth()
  const token = localStorage.getItem('token')
  const [examenes, setExamenes] = useState([])
  const [totalRegistros, setTotalRegistros] = useState(0)
  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(4)

  const getExamenes = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${Global.url}/examenes/revisar`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      setExamenes(data.examenes)
      setTotalRegistros(data.examenes.length)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingComponents(false)
    }
  }
  /*
  const filterDate = (): CursosUsuarios[] => {
    return examenes.slice(indexOfFirstPost, indexOfLastPost)
  }
  */
  useEffect(() => {
    getExamenes()
  }, [])

  // const indexOfLastPost = paginaActual * cantidadRegistros
  // const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  let totalPosts = 0

  return (
    <>
      {loadingComponents
        ? (
          <Loading />)
        : (
          <div className="p-8 mt-4 bg-secondary-100 rounded-xl">
            <div className="hidden grid-cols-1 gap-4 p-4 mb-10 md:grid md:grid-cols-6">
              <h5 className="md:text-center">Curso</h5>
              <h5 className="md:text-center">Estudiante</h5>
              <h5 className="md:text-center">Examen</h5>
              <h5 className="md:text-center">Estado</h5>
              <h5 className="md:text-center">Tipo</h5>
              <h5 className="md:text-center">Acciones</h5>

            </div>
            {
              examenes.map((cursoUsuario: CursosUsuarios) => {
                return cursoUsuario.curso?.test.map((test: TestInterface) => {
                  return test.examenesResueltos?.map((examenResuelto: TestResuelto) => {
                    totalPosts++

                    return (
                      <>
                        <ExamenesCargoColumna
                          key={examenResuelto.id}
                          curso={test.curso}
                          examenResuelto={examenResuelto}
                          test={test}
                          getExamenes={getExamenes}
                        />
                      </>
                    )
                  })
                })
              })
            }
            <div className="flex flex-col justify-between gap-5 md:flex-row md:gap-0 content_buttons ">
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
