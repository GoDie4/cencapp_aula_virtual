import axios, { AxiosError } from 'axios'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Global } from '../../../../helper/Global'
import { toast } from 'sonner'
import { Errors } from '../../../shared/Errors'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { Loading } from '../../../shared/Loading'
import '@justinribeiro/lite-youtube'
import { type ClaseValues } from '../../../shared/Interfaces'
import { extraerIdYouTube } from '../../../../logic/extraerID'
import { type Curso } from '../../../../interfaces/CursoInterface'
import { type SeccionInterface } from '../../../../interfaces/SeccionInterface'

export default function CrearClase (): JSX.Element {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [cursos, setCursos] = useState([])
  const [secciones, setSecciones] = useState([])
  const [loadingComponents, setLoadingComponents] = useState(false)
  const [url, setUrl] = useState('')
  const [videoId, setVideoId] = useState('')
  const [cursoId, setCursoId] = useState('')

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

  const handleVideoId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const id = extraerIdYouTube(e.target.value)
    setUrl(e.target.value)
    if (id == null) {
      setVideoId('')
    } else {
      setVideoId(id)
    }
  }

  const handleCursoId = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCursoId(e.target.value)
  }

  const saveClase = async (
    values: ClaseValues
  ): Promise<void> => {
    setLoadingComponents(true)
    const datos = {
      nombre: values.nombre,
      duracion: values.duracion,
      posicion: values.posicion,
      url_video: videoId,
      seccionId: values.seccionId
    }
    /*
    const formData = new FormData()
    formData.append('nombre', values.nombre)
    formData.append('posicion', values.posicion)
    formData.append('cursoId', values.cursoId)
    */
    try {
      const { status, data } = await axios.post(
        `${Global.url}/clases`,
        datos,
        {
          headers: {
            Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
          }
        }
      )
      if (status !== 201) {
        toast.warning(data.message)
      } else if (status === 201) {
        toast.success('Creado correctamente')
        navigate('/admin/secciones')
      }
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    }
    setLoadingComponents(false)
  }

  useEffect(() => {
    getCursos()
  }, [])

  const { handleSubmit, handleChange, errors, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        nombre: '',
        duracion: '',
        posicion: '',
        seccionId: ''
      },
      // validationSchema: SchemaCategorias,
      onSubmit: saveClase
    })
  const getSecciones = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${Global.url}/seccionesCurso/${cursoId}`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
          }`
        }
      })
      setSecciones(data.secciones)
      setLoadingComponents(false)
    } catch (error) {
      toast.error('Error al traer los datos de las secciones')
      console.log(error)
    }
  }
  useEffect(() => {
    if (cursoId !== '') {
      getSecciones()
    }
  }, [cursoId])

  return (
    <>
      {
        loadingComponents
          ? (<Loading />)
          : (
            <form
              className="bg-secondary-100 p-8 rounded-xl mt-4"
              onSubmit={handleSubmit}
            >
              <div className="w-full flex flex-col gap-5 lg:flex-row">
                <div className="w-full lg:w-1/3 mb-5">
                  <TitleBriefs titulo="Título de la clase" />
                  <InputsBriefs
                    name="nombre"
                    type="text"
                    value={values.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Errors errors={errors.nombre} touched={touched.nombre} />
                </div>
                <div className="w-full lg:w-1/3 mb-5">
                  <TitleBriefs titulo="Duración de la clase" />
                  <InputsBriefs
                    name="duracion"
                    type="text"
                    value={values.duracion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Errors errors={errors.duracion} touched={touched.duracion} />
                </div>
                <div className="w-full lg:w-1/3 mb-5">
                  <TitleBriefs titulo="Posición de la clase" />
                  <InputsBriefs
                    name="posicion"
                    type="text"
                    value={values.posicion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Errors errors={errors.posicion} touched={touched.posicion} />
                </div>
              </div>
              <div className="w-full flex flex-col gap-5 lg:flex-row">
                <div className="w-full lg:w-1/2 mb-5">
                  <TitleBriefs titulo="Asignar curso" />
                  <select
                    title='Buscar un curso'
                    className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                                        focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                                        rounded-md transition-all"
                    name="cursoId"
                    value={cursoId}
                    autoComplete="off"
                    onChange={handleCursoId}
                    onBlur={handleBlur}
                  >
                    <option value="">Seleccionar Curso</option>
                    {cursos.map((curso: Curso) => (
                      <option value={curso.id} key={curso.id}>
                        {curso.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full lg:w-1/2 mb-5">
                  <TitleBriefs titulo="Asignar a una Sección" />
                  <select
                    title='Selecciona una curso'
                    className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                                        focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                                        rounded-md transition-all"
                    name="seccionId"
                    value={values.seccionId}
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={cursoId === ''}
                  >
                    <option value="">Seleccionar Sección</option>
                    {secciones.map((curso: SeccionInterface) => (
                      <option value={curso.id} key={curso.id}>
                        {curso.nombre}
                      </option>
                    ))}
                  </select>
                  <Errors
                    errors={errors.seccionId}
                    touched={touched.seccionId}
                  />
                </div>
              </div>
              <div className='w-full mb-5'>
                <TitleBriefs titulo="Url del video" />
                <InputsBriefs
                  onBlur={handleBlur}
                  name="videoId"
                  type="text"
                  onChange={handleVideoId}
                  value={url}
                />
              </div>
              {
                videoId !== '' && (
                  <div className='w-full mb-5'>
                    <lite-youtube videoid={videoId}></lite-youtube>
                  </div>
                )
              }

              <div className="flex gap-2 w-full justify-end">
                <input type="hidden" name="oculto" value="1" />
                <Link
                  to="/admin/clases"
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
