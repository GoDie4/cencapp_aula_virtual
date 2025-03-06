/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable multiline-ternary */
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import { Loading } from '../../../shared/Loading'
import { useFormik } from 'formik'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { Errors } from '../../../shared/Errors'
import { ImageUploader } from '../../../shared/ImageUploader'
import {
  type productosValuesModificate,
  type ImagenState,
  type categoriasValues
} from '../../../shared/Interfaces'
import { ScheamaProductos } from '../../../shared/Schemas'
import Editor from '../../../shared/Editar'
import { toast } from 'sonner'

export const CrearProducto = (): JSX.Element => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [categorias, setCategorias] = useState([])
  const [content, setContent] = useState('')
  const [dirigido, setDirigido] = useState('')
  const [objetivo, setObjetivo] = useState('')
  const [metodologia, setMetodologia] = useState('')
  const [certificacion, setCertificacion] = useState('')
  const { setTitle } = useAuth()

  const [loadingComponents, setLoadingComponents] = useState(false)
  const [imagen1, setImagen1] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton1, setBoton1] = useState(false)
  const [url1, setUrl1] = useState('')

  const [imagen2, setImagen2] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton2, setBoton2] = useState(false)
  const [url2, setUrl2] = useState('')

  /*
  const [imagen3, setImagen3] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  */
  /*
  const [boton3, setBoton3] = useState(false)
  const [url3, setUrl3] = useState('')
  */
  const getCategorias = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${Global.url}/categorias`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      setCategorias(data.categorias)
      setLoadingComponents(false)
    } catch (error) {
      toast.error('Error al traer los datos de las categorias')
      console.log(error)
    }
  }

  useEffect(() => {
    setTitle('Registrar Producto')
    getCategorias()
  }, [])

  const saveProducto = async (
    values: productosValuesModificate
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('categoriaId', values.categoriaId)
    formData.append('nombre', values.nombre)
    formData.append('horas', String(values.horas))
    formData.append('descripcion', content)
    formData.append('dirigido', dirigido)
    formData.append('objetivo', objetivo)
    formData.append('metodologia', metodologia)
    formData.append('certificacion', certificacion)
    if (imagen1.archivo != null) {
      formData.append('url_imagen', imagen1.archivo)
    }
    if (imagen2.archivo != null) {
      formData.append('url_banner', imagen2.archivo)
    }
    formData.append('precio', values.precio)

    try {
      const { data, status } = await axios.postForm(`${Global.url}/cursos`, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
          }
        }
      )
      console.log(data)

      if (status == 400) {
        toast.warning('Complete todos los datos')
      } else if (status == 404) {
        toast.warning('La primera imagen es obligatoria')
      } else if (status == 201) {
        toast.success('Registro exitoso')
        navigate('/admin/cursos')
      } else {
        toast.error('Error al subir producto')
      }
    } catch (error: any) {
      console.log(error)
      let dataError = error.request.response
      if (dataError) {
        dataError = JSON.parse(dataError)
        if (dataError.message == 'El archivo es demasiado grande') {
          toast.warning('El archivo es demasiado grande | Max 5MB')
        } else if (dataError.message == 'url registrado') {
          toast.warning('Nombre de producto ya registrado, Cambielo!')
        } else {
          toast.error('Error al subir producto')
        }
      } else {
        toast.error('Error al subir producto')
      }
    }
    setLoadingComponents(false)
  }

  const { handleSubmit, handleChange, errors, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        nombre: '',
        categoriaId: '',
        precio: '',
        horas: 0
      },
      validationSchema: ScheamaProductos,
      onSubmit: saveProducto
    })

  return (
    <>
      {loadingComponents ? (
        <Loading />
      ) : (
        <form
          className="bg-secondary-100 p-8 rounded-xl mt-4"
          onSubmit={handleSubmit}
        >
          <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-4 lg:gap-2">
            <div className="w-full lg:w-1/2">
              <TitleBriefs titulo="Nombre del curso" />
              <InputsBriefs
                name="nombre"
                type="text"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.nombre} touched={touched.nombre} />
            </div>
            <div className="w-full lg:w-1/2">
              <TitleBriefs titulo="Asignar categoria" />
              <select
                title='Selecciona una categoria'
                className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                name="categoriaId"
                value={values.categoriaId}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Seleccionar</option>
                {categorias.map((categoria: categoriasValues) => (
                  <option value={categoria.id} key={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
              <Errors
                errors={errors.categoriaId}
                touched={touched.categoriaId}
              />
            </div>
          </div>
          <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-4 lg:gap-2">
            <div className="w-full lg:w-1/2">
              <TitleBriefs titulo="Precio del Curso" />
              <InputsBriefs
                name="precio"
                type="number"
                value={values.precio}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.precio} touched={touched.precio} />
            </div>
            <div className="w-full lg:w-1/2">
              <TitleBriefs titulo="Horas del Curso" />
              <InputsBriefs
                name="horas"
                type="number"
                value={values.horas}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.horas} touched={touched.horas} />
            </div>
          </div>

          {/* Display Color Previews */}

          <div className='w-full flex gap-6'>
            <div className="w-full lg:w-1/2 flex flex-col md:flex-row md:items-center gap-y-2 mb-10 relative">
              <p className="bg-secondary-100 pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-10px]">
                Imagen Principal del Curso<span className="text-red-500">*</span>
              </p>
              <div className="flex-1 flex flex-col lg:flex-row  items-center gap-4">
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
            <div className="w-full lg:w-1/2 flex flex-col md:flex-row md:items-center gap-y-2 mb-10 relative">
              <p className="bg-secondary-100 pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-10px]">
                Imagen de Banner del Curso<span className="text-red-500">*</span>
              </p>
              <div className="flex-1 flex flex-col lg:flex-row  items-center gap-4">
                <ImageUploader
                  url={url2}
                  setUrl={setUrl2}
                  boton={boton2}
                  setBoton={setBoton2}
                  setImagen={setImagen2}
                  clase="2"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-y-2  mb-10 relative">
            <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
              Presentación del curso<span className="text-red-500">*</span>
            </p>
            <div className="flex-1 w-full md:w-3/4">
              <Editor content={content} setContent={setContent} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 my-20 relative">
            <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
              Dirigido a<span className="text-red-500">*</span>
            </p>
            <div className="flex-1 w-full md:w-3/4">
              <Editor content={dirigido} setContent={setDirigido} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 my-20 relative">
            <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
              Objetivo<span className="text-red-500">*</span>
            </p>
            <div className="flex-1 w-full md:w-3/4">
              <Editor content={objetivo} setContent={setObjetivo} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 my-20 relative">
            <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
              Metodología<span className="text-red-500">*</span>
            </p>
            <div className="flex-1 w-full md:w-3/4">
              <Editor content={metodologia} setContent={setMetodologia} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 my-20 relative">
            <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
              Certificación<span className="text-red-500">*</span>
            </p>
            <div className="flex-1 w-full md:w-3/4">
              <Editor content={certificacion} setContent={setCertificacion} />
            </div>
          </div>

          <div className="flex gap-2 w-full justify-end">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/cursos"
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
