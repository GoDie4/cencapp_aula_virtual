import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { CursosAsignarSchema } from '../../../../schemas/CursosActionsSchema'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { Errors } from '../../../shared/Errors'
import { Loading } from '../../../shared/Loading'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import { Curso } from '../../../../interfaces/CursoInterface'
import { toast } from 'sonner'

export default function AsignarCurso(): JSX.Element {
  const [loadingComponents, setLoadingComponents] = useState(false)
  const [loadingProductos, setLoadingProductos] = useState(false)
  const [productos, setProductos] = useState([])
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  async function getCursos (): Promise<void> {
    setLoadingProductos(true)

    const { data, status } = await axios.get(`${Global.url}/cursos`)

    if (status === 200) {
      setLoadingProductos(false)
      setProductos(data.cursos)
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
        if (status == 200) {
          toast.success('Asignación exitosa')
          navigate('/admin/alumnos')
        }
        toast.error('Error al asignar el curso')
      } catch (error) {
        toast.error('Error al asignar el curso')
        console.log(error)
      } finally {
        setLoadingComponents(false)
      }
    }
  })

  useEffect(() => {
    getCursos()
  }, [])

  return (
    <>
      {loadingProductos || loadingComponents
        ? (
          <Loading />
        )
        : (
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
        )}
    </>
  )
}
