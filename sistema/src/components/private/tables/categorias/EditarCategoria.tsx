/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import Swal from 'sweetalert2'
import { Loading } from '../../../shared/Loading'
import { useFormik } from 'formik'
import { SchemaCategorias } from '../../../shared/Schemas'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { Errors } from '../../../shared/Errors'
import {
  type ImagenState,
  type categoriasValuesMoficate
} from '../../../shared/Interfaces'
import { ImageUpdate } from '../../../shared/ImageUpdate'
import { toast } from 'sonner'
import { formatName } from '../../../shared/funtions'

export const EditarCategoria = (): JSX.Element => {
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { setTitle } = useAuth()
  const [imagen1, setImagen1] = useState('')
  const [boton1, setBoton1] = useState(false)
  const [url1, setUrl1] = useState('')
  const [imagenNueva1, SetImagenNueva1] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [imagen2, setImagen2] = useState('')
  const [boton2, setBoton2] = useState(false)
  const [url2, setUrl2] = useState('')
  const [imagenNueva2, SetImagenNueva2] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [loadingComponents, setLoadingComponents] = useState(true)

  useEffect(() => {
    setTitle('Editar Categoria')
    getCategoria()
  }, [])
  const saveCategoria = async (
    values: categoriasValuesMoficate
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('nombre', values.nombre)
    formData.append('url', formatName(values.nombre))
    if (imagenNueva1.archivo != null) {
      formData.append('url_imagen', imagenNueva1.archivo)
    }
    if (imagenNueva2.archivo != null) {
      formData.append('url_icono', imagenNueva2.archivo)
    }
    try {
      const { status } = await axios.post(
        `${Global.url}/categorias/${id ?? ''}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== '' ? token : ''
            }`
          }
        }
      )
      if (status !== 200) {
        toast.warning('Complete todos los datos')
      } else if (status === 200) {
        toast.success('Actualizado correctamente')
        navigate('/admin/categorias')
      }
    } catch (error) {
      console.log(error)
      toast.error('Error al  actualizar')
      Swal.fire('Error', '', 'error')
    }
    setLoadingComponents(false)
  }

  const getCategoria = async (): Promise<void> => {
    try {
      const { data } = await axios.get(
        `${Global.url}/categorias/${id ?? ''}`,
        {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== '' ? token : ''
            }`
          }
        }
      )
      setValues({
        ...values,
        nombre: data.categoria.nombre
      })
      setImagen1(data.categoria.url_imagen)
      setImagen2(data.categoria.url_icono)
      setLoadingComponents(false)
    } catch (error) {
      console.log(error)
    }
  }
  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    setValues,
    touched,
    handleBlur
  } = useFormik({
    initialValues: {
      nombre: ''
    },
    validationSchema: SchemaCategorias,
    onSubmit: saveCategoria
  })

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
            <div className="w-full lg:1/3 lg:relative mb-5">
              <TitleBriefs titulo=" Nombre de la categoria" />
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

          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-8">
            <div className="w-full lg:w-1/2">
              <div className="w-full">
                <p>
                  Icono<span className="text-red-500">*</span>
                </p>
              </div>
              <div className="flex-1 flex  items-center gap-4">
                <ImageUpdate
                  globalUrl="categorias/uploads"
                  url={url1}
                  setUrl={setUrl1}
                  boton={boton1}
                  setBoton={setBoton1}
                  imagen={imagen1}
                  setImagen={SetImagenNueva1}
                  clase="1"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="w-full">
                <p>
                  Fondo<span className="text-red-500">*</span>
                </p>
              </div>
              <div className="flex-1 flex  items-center gap-4">
                <ImageUpdate
                  globalUrl="categorias/uploads"
                  url={url2}
                  setUrl={setUrl2}
                  boton={boton2}
                  setBoton={setBoton2}
                  imagen={imagen2}
                  setImagen={SetImagenNueva2}
                  clase="2"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 w-full justify-end">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/categorias"
              className="bg-red-500 px-4 py-2 rounded-md text-white"
            >
              Cancelar
            </Link>
            <input
              type="submit"
              className="bg-green-500 text-black hover:bg-green-600 flex items-center gap-2 py-2 px-4 rounded-lg transition-colors cursor-pointer"
              value="Editar"
            />
          </div>
        </form>
          )}
    </>
  )
}
