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
  const [examenes, setExamenes] = useState<CursosUsuarios[]>([])
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
      setTotalRegistros(filterDate().length)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingComponents(false)
    }
  }

  const filterDate = (): TestInterface[] => {
    return examenes.flatMap((curUs) => curUs.curso?.test ?? []) ?? []
  }
  useEffect(() => {
    getExamenes()
  }, [])
  /*
  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  */
  const totalPosts = totalRegistros

  return (
    <>
      {loadingComponents
        ? (
          <Loading />)
        : (
          <div className="bg-secondary-100 p-8 rounded-xl mt-4">
            <div className="hidden md:grid grid-cols-1 md:grid-cols-6 gap-4 mb-10 p-4">
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
