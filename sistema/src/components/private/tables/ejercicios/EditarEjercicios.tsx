import { Link, useNavigate, useParams } from 'react-router-dom'
import Editor from '../../../shared/Editar'
import { Errors } from '../../../shared/Errors'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { formatearFechaParaInputDate } from '../../../../logic/parseDate'
import { Loading } from '../../../shared/Loading'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import { useFormik } from 'formik'
import { type TestValues } from '../../../../interfaces/TestInterface'
import useAuth from '../../../../hooks/useAuth'

export default function EditarEjercicios (): JSX.Element {
  const { id } = useParams()
  const { auth } = useAuth()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [loadingComponents, setLoadingComponents] = useState(false)
  const [documento, setDocumento] = useState<File | null>(null)
  const [content, setContent] = useState('')

  const handleDocumentoChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDocumento(event.target.files ? event.target.files[0] : null)
  }
  const saveExamen = async (
    values: TestValues
  ): Promise<void> => {
    setLoadingComponents(true)
    const formData = new FormData()
    formData.append('titulo', values.titulo)
    formData.append('fecha_fin', String(values.fecha_fin))
    formData.append('fecha_inicio', String(values.fecha_inicio))
    formData.append('tiempo_limite', String(values.tiempo_limite))
    formData.append('puntaje_maxima', String(values.puntaje_maxima))
    formData.append('activo', String(values.activo))
    formData.append('descripcion', content)
    formData.append('tipo_prueba', 'EJERCICIO')
    if (documento) {
      formData.append('archivo', documento)
    }
    try {
      const { status } = await axios.postForm(
        `${Global.url}/tests/${id ?? ''}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token !== null && token !== '' ? token : ''
              }`
          }
        }
      )
      if (status === 200) {
        toast.success('Registro exitoso')
        navigate('/admin/examenes')
      }
      if (status === 400) {
        toast.warning('Complete todos los datos')
      }
      if (status === 401) {
        navigate('/login')
      }
      setLoadingComponents(false)
    } catch (error) {
      console.log(error)
      toast.error('Error al crear registro')
    }
    setLoadingComponents(false)
  }

  const { handleSubmit, handleChange, errors, values, touched, handleBlur, setValues } =
    useFormik({
      initialValues: {
        titulo: '',
        descripcion: '',
        fecha_fin: '',
        fecha_inicio: '',
        tiempo_limite: '',
        puntaje_maxima: '',
        activo: false
      },
      onSubmit: saveExamen
    })
  const getExamen = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${Global.url}/tests/${id ?? ''}`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      setValues({
        descripcion: data.test.descripcion,
        fecha_fin: data.test.fecha_fin,
        fecha_inicio: data.test.fecha_inicio,
        puntaje_maxima: data.test.puntaje_maxima,
        tiempo_limite: data.test.tiempo_limite,
        titulo: data.test.titulo,
        activo: data.test.activo
      })
      setContent(data.test.descripcion)
      setLoadingComponents(false)
    } catch (error) {
      toast.error('Error al traer los datos de las cursos')
      console.log(error)
    }
  }

  useEffect(() => {
    getExamen()
  }, [])

  return (
    <>
      {loadingComponents
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
                <TitleBriefs titulo="Titulo" />
                <InputsBriefs
                  name="titulo"
                  type="text"
                  value={values.titulo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors errors={errors.titulo} touched={touched.titulo} />
              </div>
              <div className="w-full lg:relative mb-5">
                <TitleBriefs titulo="Fecha de inicio" />
                <InputsBriefs
                  name="fecha_inicio"
                  type="date"
                  value={formatearFechaParaInputDate(values.fecha_inicio)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="w-full lg:relative mb-5">
                <TitleBriefs titulo="Fecha de fin" />
                <InputsBriefs
                  name="fecha_fin"
                  type="date"
                  value={formatearFechaParaInputDate(values.fecha_fin)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-5 lg:flex-row">
              <div className="w-full lg:relative mb-5">
                <TitleBriefs titulo="Puntaje Máximo" />
                <InputsBriefs
                  name="puntaje_maxima"
                  type="text"
                  value={values.puntaje_maxima}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors errors={errors.puntaje_maxima} touched={touched.puntaje_maxima} />
              </div>
              <div className="w-full lg:relative mb-5">
                <TitleBriefs titulo="Tiempo Limite (minutos)" />
                <InputsBriefs
                  name="tiempo_limite"
                  type="text"
                  value={values.tiempo_limite}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors errors={errors.tiempo_limite} touched={touched.tiempo_limite} />
              </div>
            </div>
            <div className='w-full flex max-lg:flex-col gap-5'>
              <div className="w-full lg:w-1/2 lg:relative">
                <TitleBriefs titulo="Archivo" />
                <InputsBriefs
                  name="puntaje_maxima"
                  type="file"
                  onChange={handleDocumentoChange}
                  onBlur={handleBlur}
                />
                <Errors errors={errors.puntaje_maxima} touched={touched.puntaje_maxima} />
              </div>
              <div className='w-full lg:w-1/2 flex gap-4 items-center'>
                <input type="checkbox" name="activo" id="activo" className='w-5 h-5' checked={values.activo} onChange={handleChange} onBlur={handleBlur}/>
                <label htmlFor="activo">Activo</label>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-y-2 my-20 relative">
              <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
                Descripción<span className="text-red-500">*</span>
              </p>
              <div className="flex-1 w-full md:w-3/4">
                <Editor content={content} setContent={setContent} />
              </div>
            </div>

            <div className="flex gap-2 w-full justify-end">
              <input type="hidden" name="oculto" value="1" />
              <Link
                to={ auth.rolId === 1 ? '/admin/examenes' : `/admin/examenes/cargo/${auth.id}`}
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
