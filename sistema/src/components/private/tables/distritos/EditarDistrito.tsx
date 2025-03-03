/* eslint-disable @typescript-eslint/prefer-optional-chain */
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import { Loading } from '../../../shared/Loading'
import { useFormik } from 'formik'
import { SchemaDistritos } from '../../../shared/Schemas'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { Errors } from '../../../shared/Errors'
import { toast } from 'sonner'
import useAuth from '../../../../hooks/useAuth'

export const EditarDistrito = (): JSX.Element => {
  const navigate = useNavigate()
  const { setTitle } = useAuth()
  const { id } = useParams()
  const [loadingComponents, setLoadingComponents] = useState(true)
  const token = localStorage.getItem('token')
  const [departamentos, setDepartamentos] = useState<any>(null)

  const getCategorias = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${Global.url}/departamentos/findAll`, {
        headers: {
          Authorization: `Bearer ${
            token !== null && token !== '' ? token : ''
          }`
        }
      })
      setDepartamentos(data.message)
      setLoadingComponents(false)
    } catch (error) {
      toast.error('Error al traer los datos de los departamentos')
      console.log(error)
    } finally {
      setLoadingComponents(false)
    }
  }

  const getDistrito = async (): Promise<void> => {
    try {
      const { data } = await axios.get(
        `${Global.url}/distritos/find/${id ?? ''}`,
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
        id_departamento: data.message.id_departamento,
        nombre: data.message.nombre,
        precio: data.message.precio
      })
      setLoadingComponents(false)
    } catch (error) {
      toast.error('Error al traer los datos de los departamentos')
      console.log(error)
    } finally {
      setLoadingComponents(false)
    }
  }

  useEffect(() => {
    setTitle('Registrar Departamento')
    getCategorias()
    getDistrito()
  }, [])

  const saveCategoria = async (values: any): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.post(
        `${Global.url}/distritos/update/${id ?? ''}`,
        {
          nombre: values.nombre,
          id_departamento: values.id_departamento,
          precio: values.precio
        },
        {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== '' ? token : ''
            }`
          }
        }
      )
      if (data.message == 'Complete los datos') {
        toast.warning('Complete todos los datos')
      } else if (data.message == 'success') {
        toast.success('Creado correctamente')
        navigate('/admin/distritos')
      }
    } catch (error) {
      console.log(error)
      toast.error('Error al crear registro')
    }
    setLoadingComponents(false)
  }

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
    setValues
  } = useFormik({
    initialValues: {
      id_departamento: '',
      nombre: '',
      precio: ''
    },
    validationSchema: SchemaDistritos,
    onSubmit: saveCategoria
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
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="w-full lg:relative mb-5">
              <TitleBriefs titulo=" Nombre" />
              <select
                className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                rounded-md transition-all"
                name="id_departamento"
                value={values.id_departamento}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">SELECCIONAR</option>
                {departamentos &&
                  departamentos.map((dep: any) => (
                    <option value={dep.id} key={dep.id}>
                      {dep.nombre}
                    </option>
                  ))}
              </select>
              <Errors
                errors={errors.id_departamento}
                touched={touched.id_departamento}
              />
            </div>
            <div className="w-full lg:relative mb-5">
              <TitleBriefs titulo=" Nombre" />
              <InputsBriefs
                name="nombre"
                type="text"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.nombre} touched={touched.nombre} />
            </div>
            <div className="w-full lg:relative mb-5">
              <TitleBriefs titulo="Precio" />
              <InputsBriefs
                name="precio"
                type="number"
                value={values.precio}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.precio} touched={touched.precio} />
            </div>
          </div>
          <div className="flex gap-2 w-full justify-end">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/distritos"
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
