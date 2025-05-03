import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { CursosAsignarSchema } from '../../../../schemas/CursosActionsSchema'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { Errors } from '../../../shared/Errors'
import { Loading } from '../../../shared/Loading'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import type { CursosUsuarios, Curso } from '../../../../interfaces/CursoInterface'
import { toast } from 'sonner'
import { Paginacion } from '../../../shared/Paginacion'
import AsignarCursoColumna from './AsignarCursoColumna'

export default function AsignarCurso(): JSX.Element {
  const [loadingComponents, setLoadingComponents] = useState(false)
  const [loadingProductos, setLoadingProductos] = useState(false)
  const [productos, setProductos] = useState([])
  const [cursosUsuarios, setCursosUsuarios] = useState<CursosUsuarios[]>([])
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [totalRegistros, setTotalRegistros] = useState(0)
  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(12)

  async function getCursos(): Promise<void> {
    setLoadingProductos(true)

    const { data, status } = await axios.get(`${Global.url}/cursos`)

    if (status === 200) {
      setLoadingProductos(false)
      setProductos(data.cursos)
    }
  }

  async function cursosAsignados (): Promise<void> {
    try {
      const { data } = await axios.get(`${Global.url}/cursos/asignados/alumno/${id ?? ''}`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      setCursosUsuarios(data.cursos)
      setTotalRegistros(data.cursos.length)
    } catch (error) {
      toast.error('Error al traer datos del producto')
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
      productoId: ''
    },
    validationSchema: CursosAsignarSchema,
    onSubmit: async (values) => {
      if (loadingComponents) return
      setLoadingComponents(true)
      try {
        const newValues = {
          cursoId: values.productoId
        }

        const { status } = await axios.post(
          `${Global.url}/cursos/asignarManualmente/${id ?? ''}`,
          newValues,
          {
            headers: {
              Authorization: `Bearer ${token !== null && token !== '' ? token : ''
                }`
            }
          }
        )
        if (status === 200) {
          toast.success('Asignación exitosa')
          navigate('/admin/alumnos')
          return
        }
        toast.error('Error al asignar el curso, intenta mas tarde')
      } catch (error) {
        toast.error('Error al asignar el curso')
        console.log(error)
      } finally {
        setLoadingComponents(false)
      }
    }
  })

  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  const totalPosts = cursosUsuarios.length
  const filterDate = (): CursosUsuarios[] => {
    console.log(cursosUsuarios)
    if (cursosUsuarios.length !== 0 && cursosUsuarios) {
      console.log(cursosUsuarios.length)
      return cursosUsuarios.slice(indexOfFirstPost, indexOfLastPost)
    }
    return []
  }

  useEffect(() => {
    getCursos()
    cursosAsignados()
  }, [])

  return (
    <>
      {loadingProductos || loadingComponents
        ? (
          <Loading />
        )
        : (
          <>
            <form
              className="bg-secondary-100 p-8 rounded-xl mt-4"
              onSubmit={handleSubmit}
            >
              <div className="w-full flex flex-col gap-5 lg:flex-row">
                <div className="w-full lg:relative mb-5">
                  <TitleBriefs titulo="Curso" />
                  <select
                    title='Selecciona una categoria'
                    className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                                                      rounded-md transition-all"
                    name="productoId"
                    value={values.productoId}
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Seleccionar</option>
                    {productos.map((curso: Curso) => (
                      <option value={curso.id} key={curso.id}>
                        {curso.nombre}
                      </option>
                    ))}
                  </select>
                  <Errors errors={errors.productoId} touched={touched.productoId} />
                </div>
              </div>

              <div className="flex gap-2 w-full justify-end">
                <input type="hidden" name="oculto" value="1" />
                <Link
                  to="/admin/alumnos"
                  className="bg-red-500 px-4 py-2 rounded-md text-white"
                >
                  Cancelar
                </Link>
                <input
                  type="submit"
                  className="bg-green-500 text-black hover:bg-green-600 flex items-center gap-2 py-2 px-4 rounded-lg transition-colors cursor-pointer"
                  value="Registrar"
                />
              </div>
            </form>
            <div className='w-full p-8 mt-4 bg-secondary-100 rounded-xl'>
              <div className="hidden grid-cols-1 gap-4 p-4 mb-10 md:grid md:grid-cols-6">
                <h5 className="md:text-center">ID</h5>
                <h5 className="md:text-center">Curso</h5>
                <h5 className="md:text-center">Categoría</h5>
                <h5 className="md:text-center">Horas</h5>
                <h5 className="md:text-center">Creado en</h5>
                <h5 className="md:text-center">Acciones</h5>
              </div>
              {cursosUsuarios.length > 0 && filterDate().map((pro: CursosUsuarios) => (
                <div
                  className="grid items-center grid-cols-1 gap-4 p-4 mb-4 md:grid-cols-6 bg-secondary-900 rounded-xl"
                  key={pro.id}
                >
                  <AsignarCursoColumna key={pro.id} pro={pro} cantidadRegistros={cantidadRegistros} token={token ?? ''} getListaProfesores={cursosAsignados} totalPosts={totalPosts} paginaActual={paginaActual} setpaginaActual={setpaginaActual} />
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-between gap-5 mt-8 md:flex-row md:gap-0 content_buttons ">
              <p className="ml-1 text-md"> {totalRegistros} Registros </p>
              <Paginacion
                totalPosts={totalPosts}
                cantidadRegistros={cantidadRegistros}
                paginaActual={paginaActual}
                setpaginaActual={setpaginaActual}
              />
            </div>
          </>
        )}
    </>
  )
}
