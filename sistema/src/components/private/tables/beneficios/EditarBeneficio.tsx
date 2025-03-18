/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import Swal from 'sweetalert2'
import { Loading } from '../../../shared/Loading'
import { useFormik } from 'formik'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { Errors } from '../../../shared/Errors'
import {
  type beneficiosValuesModificate,
  type ImagenState
} from '../../../shared/Interfaces'
import { ImageUpdate } from '../../../shared/ImageUpdate'
import { toast } from 'sonner'
import { SchemaBeneficio } from '../../../shared/Schemas'
import { type Curso } from '../../../../interfaces/CursoInterface'

export const EditarBeneficio = (): JSX.Element => {
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
  const [loadingComponents, setLoadingComponents] = useState(true)
  const [cursos, setCursos] = useState([])
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
    setTitle('Editar Beneficio')
    getBeneficio()
    getCursos()
  }, [])
  const saveBeneficio = async (
    values: beneficiosValuesModificate
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('texto', values.texto)
    formData.append('cursoId', values.cursoId)

    if (imagenNueva1.archivo != null) {
      formData.append('icono', imagenNueva1.archivo)
    }
    try {
      const { status } = await axios.put(
        `${Global.url}/beneficios/${id ?? ''}`,
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
        navigate('/admin/beneficios')
      }
    } catch (error) {
      console.log(error)
      toast.error('Error al  actualizar')
      Swal.fire('Error', '', 'error')
    }
    setLoadingComponents(false)
  }

  const getBeneficio = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${Global.url}/beneficios/${id ?? ''}`, {
        headers: {
          Authorization: `Bearer ${
            token !== null && token !== '' ? token : ''
          }`
        }
      })
      setValues({
        ...values,
        texto: data.texto,
        cursoId: data.cursoId
      })
      setImagen1(data.icono)
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
      texto: '',
      cursoId: ''
    },
    validationSchema: SchemaBeneficio,
    onSubmit: saveBeneficio
  })

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
            <div className="w-full mb-5 lg:1/3 lg:relative">
              <TitleBriefs titulo="Texto del beneficio" />
              <InputsBriefs
                name="texto"
                type="text"
                value={values.texto}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.texto} touched={touched.texto} />
            </div>
          </div>
          <div className="w-full">
            <div className="w-full mb-5">
              <TitleBriefs titulo="Asignar curso" />
              <select
                title="Buscar un curso"
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
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-8 md:flex-row md:items-center">
            <div className="w-full">
              <div className="w-full">
                <p>
                  Icono<span className="text-red-500">*</span>
                </p>
              </div>
              <div className="flex items-center flex-1 gap-4">
                <ImageUpdate
                  globalUrl="beneficios/uploads"
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
          </div>

          <div className="flex justify-end w-full gap-2">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/beneficios"
              className="px-4 py-2 text-white bg-red-500 rounded-md"
            >
              Cancelar
            </Link>
            <input
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-black transition-colors bg-green-500 rounded-lg cursor-pointer hover:bg-green-600"
              value="Editar"
            />
          </div>
        </form>
          )}
    </>
  )
}
