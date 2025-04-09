/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Errors } from '../../../shared/Errors'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { Loading } from '../../../shared/Loading'
import { Global } from '../../../../helper/Global'
import axios, { AxiosError } from 'axios'
import { useFormik } from 'formik'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { type SeccionValues } from '../../../shared/Interfaces'
import { type Curso } from '../../../../interfaces/CursoInterface'

export default function EditarSeccion (): JSX.Element {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [cursos, setCursos] = useState([])
  // const [profesor, setProfesor] = useState<ProfesorInterface>()
  const [loadingComponents, setLoadingComponents] = useState(false)

  const getCursos = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${Global.url}/cursos`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      setCursos(data.cursos)
      setLoadingComponents(false)
    } catch (error) {
      toast.error('Error al traer los datos de las cursos')
      console.log(error)
    }
  }

  useEffect(() => {
    getSeccion()
    getCursos()
  }, [])

  const EditarSeccion = async (
    values: SeccionValues
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    /*
    const formData = new FormData()
    formData.append('nombres', values.nombre)
    formData.append('apellidos', values.posicion)
    formData.append('email', values.cursoId)
    */
    const body = {
      nombre: values.nombre,
      posicion: values.posicion,
      cursoId: values.cursoId
    }
    try {
      const { status, data } = await axios.post(
        `${Global.url}/secciones/${id ?? ''}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token !== null && token !== '' ? token : ''
              }`
          }
        }
      )
      if (status === 200) {
        toast.success(data.message)
        navigate('/admin/secciones')
      }
      if (status === 400) {
        throw new Error('Complete todos los datos')
      }
      if (status === 401) {
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    }
    setLoadingComponents(false)
  }

  const { handleSubmit, handleChange, errors, values, touched, handleBlur, setValues } =
    useFormik({
      initialValues: {
        nombre: '',
        posicion: '',
        cursoId: ''
      },
      // validationSchema: ProfesorEditSchema,
      onSubmit: EditarSeccion
    })

  const getSeccion = async (): Promise<void> => {
    try {
      const { data } = await axios.get(
        `${Global.url}/secciones/${id ?? ''}`,
        {
          headers: {
            Authorization: `Bearer ${token !== null && token !== '' ? token : ''
              }`
          }
        }
      )
      setValues({
        ...values,
        nombre: data.seccion.nombre,
        cursoId: data.seccion.cursoId,
        posicion: data.seccion.posicion
      })
      setLoadingComponents(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {
        loadingComponents
          ? (<Loading />)
          : (
            <form
              className="p-8 mt-4 bg-secondary-100 rounded-xl"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col w-full gap-5 lg:flex-row">
                <div className="w-full mb-5 lg:w-1/3">
                  <TitleBriefs titulo=" Nombre de la sección" />
                  <InputsBriefs
                    name="nombre"
                    type="text"
                    value={values.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Errors errors={errors.nombre} touched={touched.nombre} />
                </div>
                <div className="w-full mb-5 lg:w-1/3">
                  <TitleBriefs titulo="Posición de la sección" />
                  <InputsBriefs
                    name="posicion"
                    type="text"
                    value={values.posicion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Errors errors={errors.posicion} touched={touched.posicion} />
                </div>
                <div className="w-full lg:w-1/3">
                  <TitleBriefs titulo="Asignar curso" />
                  <select
                    title='Selecciona una curso'
                    className="block w-full pt-4 pb-4 pl-4 pr-4 mt-2 mb-0 ml-0 mr-0 text-base placeholder-gray-400 transition-all border border-black rounded-md outline-none focus:outline-none focus:border-black bg-secondary-900"
                    name="cursoId"
                    value={values.cursoId}
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Seleccionar Curso</option>
                    {cursos.map((curso: Curso) => (
                      <option value={curso.id} key={curso.id}>
                        {curso.nombre}
                      </option>
                    ))}
                  </select>
                  <Errors
                    errors={errors.cursoId}
                    touched={touched.cursoId}
                  />
                </div>
              </div>

              <div className="flex justify-end w-full gap-2">
                <input type="hidden" name="oculto" value="1" />
                <Link
                  to="/admin/secciones"
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
            )}
    </>
  )
}
