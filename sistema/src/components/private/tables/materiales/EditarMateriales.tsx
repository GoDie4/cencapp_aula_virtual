import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { type MaterialValues } from '../../../../interfaces/MaterialesInterface'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import { useFormik } from 'formik'
import Editor from '../../../shared/Editar'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { Errors } from '../../../shared/Errors'
import { Loading } from '../../../shared/Loading'

export default function EditarMateriales (): JSX.Element {
  const token = localStorage.getItem('token')
  const { id } = useParams()
  const navigate = useNavigate()
  const [loadingComponents, setLoadingComponents] = useState(false)
  const [documento, setDocumento] = useState<File | null>(null)
  const [pathArchivo, setPathArchivo] = useState('')
  const [mimeType, setMimeType] = useState('')
  const [size, setSize] = useState('')
  const [content, setContent] = useState('')

  const handleDocumentoChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDocumento(event.target.files ? event.target.files[0] : null)
  }

  const saveMaterial = async (
    values: MaterialValues
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('descripcion', content)
    formData.append('nombre', values.nombre)
    formData.append('path_archivo', pathArchivo)
    formData.append('mime_type', mimeType)
    if (documento) {
      formData.append('archivo', documento)
    }
    try {
      const { status } = await axios.postForm(
        `${Global.url}/materiales/${id ?? ''}`,
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
        navigate('/admin/materiales')
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
        nombre: '',
        descripcion: ''
      },
      onSubmit: saveMaterial
    })

  const getMaterial = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${Global.url}/materiales/${id ?? ''}`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      setValues({
        descripcion: data.material.descripcion,
        nombre: data.material.nombre
      })
      setContent(data.material.descripcion)
      setPathArchivo(data.material.path_archivo)
      setMimeType(data.material.mime_type)
      setSize(data.material.size)
      setLoadingComponents(false)
    } catch (error) {
      toast.error('Error al traer los datos de las materiales')
      console.log(error)
    }
  }

  useEffect(() => {
    getMaterial()
  }, [])
  return (
    <>
      {loadingComponents
        ? (<Loading />)
        : (
          <form
            className="bg-secondary-100 p-8 rounded-xl mt-4"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex flex-col gap-5 lg:flex-row">
              <div className="w-full lg:relative mb-5">
                <TitleBriefs titulo="Titulo" />
                <InputsBriefs
                  name="nombre"
                  type="text"
                  value={values.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors errors={errors.nombre} touched={touched.nombre} />
              </div>
            </div>
            <div>
              <div className="w-full lg:relative">
                <TitleBriefs titulo="Archivo" />
                <InputsBriefs
                  name="archivo"
                  type="file"
                  onChange={handleDocumentoChange}
                  onBlur={handleBlur}
                />
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
                to="/admin/materiales"
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
