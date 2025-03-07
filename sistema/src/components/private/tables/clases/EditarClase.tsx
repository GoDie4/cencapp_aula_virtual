import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Global } from '../../../../helper/Global'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { ClaseValuesModificate } from '../../../shared/Interfaces'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { Errors } from '../../../shared/Errors'
import { Loading } from '../../../shared/Loading'
import '@justinribeiro/lite-youtube'
import { extraerIdYouTube } from '../../../../logic/extraerID'
import { ClasesInterface } from '../../../../interfaces/ClasesInterface'

export default function EditarClase(): JSX.Element {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [clase, setClase] = useState<ClasesInterface>()
  const [videoId, setVideoId] = useState('')
  const [videoIdNuevo, setVideoIdNuevo] = useState('')
  const [loadingComponents, setLoadingComponents] = useState(false)
  const [url, setUrl] = useState('')

  useEffect(() => {
    getClase()
  }, [])

  const handleVideoId = (e: { target: { value: string } }) => {
    setUrl(e.target.value)
    setVideoIdNuevo(extraerIdYouTube(e.target.value) ?? '')
  }

  const saveSeccion = async (
    values: ClaseValuesModificate
  ): Promise<void> => {
    setLoadingComponents(true)
    const datos: ClaseValuesModificate = {
      nombre: values.nombre,
      posicion: values.posicion,
      duracion: values.duracion,
      url_video: videoIdNuevo ? videoIdNuevo : videoId
    }
    /*
    const formData = new FormData()
    formData.append('nombre', values.nombre)
    formData.append('posicion', values.posicion)
    formData.append('cursoId', values.cursoId)
    */
    try {
      const { status, data } = await axios.post(
        `${Global.url}/clases/${clase?.id}`,
        datos,
        {
          headers: {
            Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
          }
        }
      )
      if (status !== 200) {
        toast.warning(data.message)
      } else if (status === 200) {
        toast.success('Creado correctamente')
        navigate('/admin/clases')
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
        duracion: '',
        posicion: ''
      },
      // validationSchema: SchemaCategorias,
      onSubmit: saveSeccion
    });
  const getClase = async (): Promise<void> => {
    try {
      const { data } = await axios.get(
        `${Global.url}/clases/${id ?? ''}`,
        {
          headers: {
            Authorization: `Bearer ${token !== null && token !== '' ? token : ''
              }`
          }
        }
      )
      setClase(data.clase)
      setValues({
        ...values,
        nombre: data.clase.nombre,
        duracion: data.clase.duracion,
        posicion: data.clase.posicion,
      })
      setVideoId(data.clase.url_video)
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
                videoId !== '' && videoIdNuevo === '' && (
                  <div className='w-full mb-5'>
                    <lite-youtube videoid={videoId}></lite-youtube>
                  </div>
                )
              }
              {
                videoIdNuevo !== '' && (
                  <div className='w-full mb-5'>
                    <lite-youtube videoid={videoIdNuevo}></lite-youtube>
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
