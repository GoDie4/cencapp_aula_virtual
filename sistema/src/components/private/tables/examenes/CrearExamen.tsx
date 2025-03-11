import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Global } from '../../../../helper/Global'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { type TestValues } from '../../../../interfaces/TestInterface'
import { Errors } from '../../../shared/Errors'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { Loading } from '../../../shared/Loading'
import { type Curso } from '../../../../interfaces/CursoInterface'
import Editor from '../../../shared/Editar'
import { formatearFechaParaInputDate } from '../../../../logic/parseDate'

export default function CrearExamen (): JSX.Element {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [loadingComponents, setLoadingComponents] = useState(false)
  const [cursos, setCursos] = useState([])
  const [cursoSeleccionado, setCursoSeleccionado] = useState('')
  const [content, setContent] = useState('')
  const [documento, setDocumento] = useState<File | null>(null)

  const handleDocumentoChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDocumento(event.target.files ? event.target.files[0] : null)
  }

  const handleChangeCurso = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCursoSeleccionado(e.target.value)
  }

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

  const saveExamen = async (
    values: TestValues
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('titulo', values.titulo)
    formData.append('fecha_fin', String(values.fecha_fin))
    formData.append('fecha_inicio', String(values.fecha_inicio))
    formData.append('tiempo_limite', String(values.tiempo_limite))
    formData.append('puntaje_maxima', String(values.puntaje_maxima))
    formData.append('descripcion', content)
    formData.append('tipo_prueba', 'EXAMEN')
    formData.append('cursoId', cursoSeleccionado)
    if (documento) {
      formData.append('archivo', documento)
    }
    try {
      const { status } = await axios.postForm(
        `${Global.url}/tests`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token !== null && token !== '' ? token : ''
              }`
          }
        }
      )
      if (status === 201) {
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

  const { handleSubmit, handleChange, errors, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        titulo: '',
        descripcion: '',
        fecha_fin: '',
        fecha_inicio: '',
        tiempo_limite: '',
        puntaje_maxima: '',
        activo: true
      },
      onSubmit: saveExamen
    })

  useEffect(() => {
    getCursos()
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
            <div className='mb-5 flex max-lg:flex-col gap-4'>
              <div className="w-full lg:w-1/3">
                <TitleBriefs titulo="Asignar cursos" />
                <select
                  title='Selecciona un curso'
                  className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                                    focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                                    rounded-md transition-all"
                  name="cursoId"
                  value={cursoSeleccionado}
                  autoComplete="off"
                  onChange={handleChangeCurso}
                  onBlur={handleBlur}
                >
                  <option value="">Seleccionar</option>
                  {cursos.map((curso: Curso) => (
                    <option value={curso.id} key={curso.id}>
                      {curso.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full lg:w-1/3 lg:relative mb-5">
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
              <div className="w-full lg:w-1/3 lg:relative mb-5">
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
            <div>
              <div className="w-full lg:relative">
                <TitleBriefs titulo="Archivo" />
                <InputsBriefs
                  name="puntaje_maxima"
                  type="file"
                  onChange={handleDocumentoChange}
                  onBlur={handleBlur}
                />
                <Errors errors={errors.puntaje_maxima} touched={touched.puntaje_maxima} />
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-y-2 my-20 relative">
                <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
                  Descripción<span className="text-red-500">*</span>
                </p>
                <div className="flex-1 w-full md:w-3/4">
                  <Editor content={content} setContent={setContent} />
                </div>
              </div>
            </div>

            <div className="flex gap-2 w-full justify-end">
              <input type="hidden" name="oculto" value="1" />
              <Link
                to="/admin/examenes"
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
