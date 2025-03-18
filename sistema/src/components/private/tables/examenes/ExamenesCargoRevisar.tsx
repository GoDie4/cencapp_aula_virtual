import axios from 'axios'
import useAuth from '../../../../hooks/useAuth'
import { Global } from '../../../../helper/Global'
import { useEffect, useState } from 'react'
import { Paginacion } from '../../../shared/Paginacion'
import { Loading } from '../../../shared/Loading'
import { type CursosUsuarios } from '../../../../interfaces/CursoInterface'
import { type TestInterface, type TestResuelto } from '../../../../interfaces/TestInterface'

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
              examenes.map((cursoUsuario: CursosUsuarios) => {
                return cursoUsuario.curso?.test.map((test: TestInterface) => {
                  return test.examenesResueltos?.map((examenResuelto: TestResuelto) => {
                    totalPosts++
                    return (
                      <>
                        {examenResuelto.puntaje_final}
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
