import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import { Global } from '../../../../helper/Global'
import axios from 'axios'
import { Loading } from '../../../shared/Loading'
import { Paginacion } from '../../../shared/Paginacion'
import CertificadoColumna from './components/CertificadoColumna'
import { type Certificado } from '../../../../interfaces/CertificadoInterface'

export default function ListaCertificados (): JSX.Element {
  const token = localStorage.getItem('token')
  const [certificados, setCertificados] = useState([])
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  const [totalRegistros, setTotalRegistros] = useState(0)
  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(4)
  const navigate = useNavigate()

  const getCertificados = async (): Promise<void> => {
    try {
      setLoadingComponents(true)
      const { data } = await axios.get(`${Global.url}/certificados`, {
        headers: {
          Authorization: `Bearer ${
            token !== null && token !== '' ? token : ''
          }`
        }
      })
      setCertificados(data.certificados)
      setTotalRegistros(data.tests.length)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingComponents(false)
    }
  }

  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  const totalPosts = certificados.length

  const filterDate = (): Certificado[] => {
    return certificados.slice(indexOfFirstPost, indexOfLastPost)
  }

  useEffect(() => {
    setTitle('Listado de Certificados')
    getCertificados()
  }, [])

  return (
    <>
      {loadingComponents
        ? (
        <Loading />
          )
        : (
        <div className="p-8 mt-4 bg-secondary-100 rounded-xl">
          <div className="flex justify-end w-full">
            <button
              className="flex items-center gap-2 px-4 py-2 text-white transition-colors rounded-lg bg-main hover:bg-main_dark w-fit"
              onClick={() => {
                navigate('/admin/certificados/agregar')
              }}
            >
              Registrar Certificado
            </button>
          </div>
          <div className="hidden grid-cols-1 gap-4 p-4 mb-10 md:grid md:grid-cols-6">
            <h5 className="md:text-center">Código</h5>
            <h5 className="md:text-center">Nombre</h5>
            <h5 className="md:text-center">Certificado</h5>
            <h5 className="md:text-center">Curso</h5>
            <h5 className="md:text-center">Usuario</h5>
            <h5 className="md:text-center">Acciones</h5>
          </div>
          {filterDate().map((exam: Certificado) => (
            <CertificadoColumna
              key={exam.id}
              certificado={exam}
              cantidadRegistros={cantidadRegistros}
              token={token ?? ''}
              getExamenes={getCertificados}
              totalPosts={totalPosts}
              paginaActual={paginaActual}
              setpaginaActual={setpaginaActual}
            />
          ))}

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
