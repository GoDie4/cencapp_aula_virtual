/* eslint-disable multiline-ternary */
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import { Loading } from '../../../shared/Loading'
import { useFormik } from 'formik'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { Errors } from '../../../shared/Errors'
import {
  type beneficiosValuesModificate,
  type ImagenState
} from '../../../shared/Interfaces'
import { ImageUploader } from '../../../shared/ImageUploader'
import { toast } from 'sonner'
import { SchemaBeneficio } from '../../../shared/Schemas'
import { type Curso } from '../../../../interfaces/CursoInterface'

export const AgregarBeneficio = (): JSX.Element => {
  const navigate = useNavigate()
  const [imagen1, setImagen1] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const token = localStorage.getItem('token')

  const [boton1, setBoton1] = useState(false)
  const [url1, setUrl1] = useState('')
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
  const [loadingComponents, setLoadingComponents] = useState(false)

  const saveBeneficio = async (
    values: beneficiosValuesModificate
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('texto', values.texto)
    formData.append('cursoId', values.cursoId)

    if (imagen1.archivo != null && imagen1.archivo !== undefined) {
      formData.append('icono', imagen1.archivo)
    }

    try {
      const { status } = await axios.post(
        `${Global.url}/beneficios`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== '' ? token : ''
            }`
          }
        }
      )
      if (status !== 201) {
        toast.warning('Complete todos los datos')
      } else if (status === 201) {
        toast.success('Creado correctamente')
        navigate('/admin/beneficios')
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
        texto: '',
        cursoId: ''
      },
      validationSchema: SchemaBeneficio,
      onSubmit: saveBeneficio
    })

  useEffect(() => {
    getCursos()
  }, [])
  return (
    <>
      {loadingComponents ? (
        <Loading />
      ) : (
        <form
          className="p-8 mt-4 bg-secondary-100 rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full gap-5 lg:flex-row">
            <div className="w-full mb-5 lg:1/3 lg:relative">
              <TitleBriefs titulo="Texto" />
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
            <div className="w-full ">
              <div className="w-full ">
                <p>
                  Icono<span className="text-red-500">*</span>
                </p>
              </div>
              <div className="flex items-center flex-1 gap-4">
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
              value="Registrar"
            />
          </div>
        </form>
      )}
    </>
  )
}
