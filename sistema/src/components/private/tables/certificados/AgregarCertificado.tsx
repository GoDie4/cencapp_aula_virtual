import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Global } from '../../../../helper/Global'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Errors } from '../../../shared/Errors'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { Loading } from '../../../shared/Loading'
import { type Curso } from '../../../../interfaces/CursoInterface'
import { type CertificadoModificate } from '../../../../interfaces/CertificadoInterface'
import { type Usuario } from '../../../../interfaces/UserInterface'

export default function CrearCertificado (): JSX.Element {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [loadingComponents, setLoadingComponents] = useState(false)
  const [cursos, setCursos] = useState([])
  const [alumnos, setAlumnos] = useState([])

  const [cursoSeleccionado, setCursoSeleccionado] = useState('')
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState('')

  const [documento, setDocumento] = useState<File | null>(null)

  const handleDocumentoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDocumento(event.target.files ? event.target.files[0] : null)
  }

  const handleChangeCurso = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCursoSeleccionado(e.target.value)
  }

  const handleChangeAlumno = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setAlumnoSeleccionado(e.target.value)
  }

  const getCursos = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${Global.url}/cursos`, {
        headers: {
          Authorization: `Bearer ${
            token !== null && token !== '' ? token : ''
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

  const getAlumnos = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${Global.url}/alumnos`, {
        headers: {
          Authorization: `Bearer ${
            token !== null && token !== '' ? token : ''
          }`
        }
      })
      console.log(data)
      setAlumnos(data.alumnos)
      setLoadingComponents(false)
    } catch (error) {
      toast.error('Error al traer los datos de las cursos')
      console.log(error)
    }
  }

  const saveCertificado = async (
    values: CertificadoModificate
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('nombre', values.nombre)
    formData.append('cursoId', cursoSeleccionado)
    formData.append('emitido_en', String(values.emitido_en))
    formData.append('userId', alumnoSeleccionado)

    if (documento) {
      formData.append('archivo', documento)
    }
    try {
      const { status } = await axios.postForm(
        `${Global.url}/certificados`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== '' ? token : ''
            }`
          }
        }
      )
      if (status === 201) {
        toast.success('Registro exitoso')
        navigate('/admin/certificados')
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
        nombre: '',
        emitido_en: new Date()
      },
      onSubmit: saveCertificado
    })

  useEffect(() => {
    getCursos()
    getAlumnos()
  }, [])

  return (
    <>
      {loadingComponents
        ? (
        <Loading />
          )
        : (
        <form
          className="p-8 mt-4 bg-secondary-100 rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full gap-5 lg:flex-row">
            <div className="w-full mb-5 lg:relative">
              <TitleBriefs titulo="Nombre" />
              <InputsBriefs
                name="nombre"
                type="text"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.nombre} touched={touched.nombre} />
            </div>
            <div className="w-full mb-5 lg:relative">
              <TitleBriefs titulo="Fecha emitida" />
              <InputsBriefs
                name="emitido_en"
                type="date"
                value={String(values.emitido_en)}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="flex gap-4 mb-5 max-lg:flex-col">
            <div className="w-full lg:w-1/2">
              <TitleBriefs titulo="Asignar cursos" />
              <select
                title="Selecciona un curso"
                className="block w-full pt-4 pb-4 pl-4 pr-4 mt-2 mb-0 ml-0 mr-0 text-base placeholder-gray-400 transition-all border border-black rounded-md outline-none focus:outline-none focus:border-black bg-secondary-900"
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
            <div className="w-full lg:w-1/2">
              <TitleBriefs titulo="Asignar alumno" />
              <select
                title="Selecciona un alumno"
                className="block w-full pt-4 pb-4 pl-4 pr-4 mt-2 mb-0 ml-0 mr-0 text-base placeholder-gray-400 transition-all border border-black rounded-md outline-none focus:outline-none focus:border-black bg-secondary-900"
                name="userId"
                value={alumnoSeleccionado}
                autoComplete="off"
                onChange={handleChangeAlumno}
                onBlur={handleBlur}
              >
                <option value="">Seleccionar</option>
                {alumnos.map((curso: Usuario) => (
                  <option value={curso.id} key={curso.id}>
                    {curso.nombres + ' ' + curso.apellidos + ' - ' + curso.id}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full lg:relative">
              <TitleBriefs titulo="Archivo" />
              <InputsBriefs
                name="archivo"
                type="file"
                onChange={handleDocumentoChange}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div className="flex justify-end w-full gap-2">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/certificados"
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
