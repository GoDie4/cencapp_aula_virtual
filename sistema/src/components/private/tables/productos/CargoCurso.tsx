import { useEffect, useState } from 'react'
import { Loading } from '../../../shared/Loading'
import { useFormik } from 'formik'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Global } from '../../../../helper/Global'
import axios from 'axios'
import { toast } from 'sonner'
import { type ProfesorInterface } from '../../../../interfaces/ProfesoresInterface'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { Errors } from '../../../shared/Errors'
import { Paginacion } from '../../../shared/Paginacion'
import { type CursosUsuarios } from '../../../../interfaces/CursoInterface'
import CargoCursoColumna from './CargoCursoColumna'

interface CursoCargoValues {
  profesorId: string
}

export default function CargoCurso (): JSX.Element {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [profesores, setProfesores] = useState([])
  const [listaProfesores, setListaProfesores] = useState<CursosUsuarios[]>([])
  const { id } = useParams()
  const [loadingComponents, setLoadingComponents] = useState(true)
  const [totalRegistros, setTotalRegistros] = useState(0)
  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(12)

  const getCurso = async (): Promise<void> => {
    try {
      setLoadingComponents(true)
      const { data } = await axios.get(`${Global.url}/profesores`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      setProfesores(data.profesores)
    } catch (error) {
      toast.error('Error al traer datos del producto')
      console.log(error)
    } finally {
      setLoadingComponents(false)
    }
  }

  const getListaProfesores = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${Global.url}/cargoCurso/${id ?? ''}`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      setListaProfesores(data.profesores)
      setTotalRegistros(data.profesores.length)
    } catch (error) {
      toast.error('Error al traer datos del producto')
      console.log(error)
    }
  }

  const cursoCargo = async (values: CursoCargoValues): Promise<void> => {
    try {
      const body = {
        profesorId: values.profesorId,
        cursoId: id
      }
      const { status } = await axios.post(`${Global.url}/cargoCurso`, body, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      if (status === 200) {
        toast.success('Registro exitoso')
        navigate('/admin/cursos')
      }
    } catch (error) {
      toast.error('Error al subir producto')
      console.log(error)
    }
  }
  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur
  } = useFormik({
    initialValues: {
      profesorId: ''
    },
    onSubmit: cursoCargo
  })

  useEffect(() => {
    getCurso()
    getListaProfesores()
  }, [])
  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  const totalPosts = profesores.length
  const filterDate = (): CursosUsuarios[] => {
    return listaProfesores.slice(indexOfFirstPost, indexOfLastPost)
  }

  return (
    <>
      {loadingComponents
        ? (<Loading />)
        : (
          <>
            <form
              className="p-8 mt-4 bg-secondary-100 rounded-xl"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col justify-between w-full gap-4 mb-5 lg:relative lg:flex-row lg:gap-2">
                <div className='w-full'>
                  <TitleBriefs titulo="Asignar profesor" />
                  <select
                    title='Selecciona una profesor'
                    className="block w-full pt-4 pb-4 pl-4 pr-4 mt-2 mb-0 ml-0 mr-0 text-base placeholder-gray-400 transition-all border border-black rounded-md outline-none focus:outline-none focus:border-black bg-secondary-900"
                    name="profesorId"
                    value={values.profesorId}
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Seleccionar</option>
                    {profesores.map((profesor: ProfesorInterface) => (
                      <option value={profesor.id} key={profesor.id}>
                        {profesor.nombres}
                      </option>
                    ))}
                  </select>
                  <Errors
                    errors={errors.profesorId}
                    touched={touched.profesorId}
                  />
                </div>
              </div>
              <div className="flex justify-end w-full gap-2">
                <input type="hidden" name="oculto" value="1" />
                <Link
                  to="/admin/cursos"
                  className="px-4 py-2 text-white bg-red-500 rounded-md"
                >
                  Cancelar
                </Link>
                <input
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 text-black transition-colors bg-green-500 rounded-lg cursor-pointer hover:bg-green-600"
                  value="Registrar"
                />
              </div>
            </form>
            <div className='w-full p-8 mt-4 bg-secondary-100 rounded-xl'>
              <div className="hidden grid-cols-1 gap-4 p-4 mb-10 md:grid md:grid-cols-6">
                <h5 className="md:text-center">ID</h5>
                <h5 className="md:text-center">Nombres</h5>
                <h5 className="md:text-center">Apellidos</h5>
                <h5 className="md:text-center">Email</h5>
                <h5 className="md:text-center">Celular</h5>
                <h5 className="md:text-center">Acciones</h5>
              </div>
              {filterDate().map((pro: CursosUsuarios) => (
                <div
                  className="grid items-center grid-cols-1 gap-4 p-4 mb-4 md:grid-cols-6 bg-secondary-900 rounded-xl"
                  key={pro.id}
                >
                  <CargoCursoColumna key={pro.id} pro={pro} cantidadRegistros={cantidadRegistros} token={token ?? ''} getListaProfesores={getListaProfesores} totalPosts={totalPosts} paginaActual={paginaActual} setpaginaActual={setpaginaActual} />
                </div>
              ))}
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
          </>
          )
      }
    </>
  )
}
