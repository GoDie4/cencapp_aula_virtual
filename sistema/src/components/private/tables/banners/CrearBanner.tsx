import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import { Loading } from '../../../shared/Loading'
import { useFormik } from 'formik'
import { SchemaBanner } from '../../../shared/Schemas'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { Errors } from '../../../shared/Errors'
import {
  type bannersValuesModificate,
  type ImagenState
} from '../../../shared/Interfaces'
import { ImageUploader } from '../../../shared/ImageUploader'
import { toast } from 'sonner'

export const CrearBanner = (): JSX.Element => {
  const navigate = useNavigate()
  const [imagen1, setImagen1] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton1, setBoton1] = useState(false)
  const [url1, setUrl1] = useState('')

  const [loadingComponents, setLoadingComponents] = useState(false)

  const saveBanner = async (
    values: bannersValuesModificate
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('titulo', values.titulo)
    formData.append('descripcion', values.descripcion)
    if (imagen1.archivo != null && imagen1.archivo !== undefined) {
      formData.append('imagen1', imagen1.archivo)
    }
    try {
      const { data } = await axios.post(
        `${Global.url}/banners/register`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== '' ? token : ''
            }`
          }
        }
      )
      console.log(data)
      if (data.message == 'Complete los datos') {
        toast.warning('Complete todos los datos')
      } else if (data.message == 'success') {
        toast.success('Creado correctamente')
        navigate('/admin/banners')
      }
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
        descripcion: ''
      },
      validationSchema: SchemaBanner,
      onSubmit: saveBanner
    })

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
              <TitleBriefs titulo="Título" />
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
              <TitleBriefs titulo="Descripción" />
              <InputsBriefs
                name="descripcion"
                type="text"
                value={values.descripcion}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.descripcion} touched={touched.descripcion} />
            </div>

          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-8">
            <div className="w-full ">
              <div className="w-full ">
                <p>
                  Fondo<span className="text-red-500">*</span>
                </p>
              </div>
              <div className="flex-1 flex  items-center gap-4">
                <ImageUploader
                  url={url1}
                  setUrl={setUrl1}
                  boton={boton1}
                  setBoton={setBoton1}
                  setImagen={setImagen1}
                  clase="1"
                />
              </div>
            </div>

          </div>

          <div className="flex gap-2 w-full justify-end">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/banners"
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
