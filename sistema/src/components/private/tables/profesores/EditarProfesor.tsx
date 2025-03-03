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
import { toast } from 'sonner'
import { type ProfesoresModificate } from '../../../shared/aula/Aula'
import { SchemaProfesores } from '../../../shared/Schemas'

export const EditarProfesor = (): JSX.Element => {
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { setTitle } = useAuth()

  const [loadingComponents, setLoadingComponents] = useState(true)

  useEffect(() => {
    setTitle('Editar profesor')
    getProfesor()
  }, [])
  const saveProfesor = async (values: ProfesoresModificate): Promise<void> => {
    setLoadingComponents(true)
    const data = {
      nombres: values.nombres,
      apellidos: values.apellidos,
      celular: values.celular,
      email: values.email,
      password: values.password
    }

    try {
      const { status } = await axios.post(
        `${Global.url}/profesores/${id ?? ''}`,
        data,
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
        navigate('/admin/profesores')
      }
    } catch (error) {
      console.log(error)
      toast.error('Error al  actualizar')
      Swal.fire('Error', '', 'error')
    }
    setLoadingComponents(false)
  }

  const getProfesor = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${Global.url}/profesores/${id ?? ''}`, {
        headers: {
          Authorization: `Bearer ${
            token !== null && token !== '' ? token : ''
          }`
        }
      })
      setValues({
        ...values,
        nombres: data.profesor.nombres,
        apellidos: data.profesor.apellidos,
        celular: data.profesor.celular,
        email: data.profesor.email,
        password: data.profesor.password
      })
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
      nombres: '',
      apellidos: '',
      celular: '',
      email: '',
      password: ''
    },
    validationSchema: SchemaProfesores,
    onSubmit: saveProfesor
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
            <div className="w-full mb-5 lg:1/2 lg:relative">
              <TitleBriefs titulo=" Nombres" />
              <InputsBriefs
                name="nombres"
                type="text"
                value={values.nombres}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.nombres} touched={touched.nombres} />
            </div>
            <div className="w-full mb-5 lg:1/2 lg:relative">
              <TitleBriefs titulo="Apellidos" />
              <InputsBriefs
                name="apellidos"
                type="text"
                value={values.apellidos}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.apellidos} touched={touched.apellidos} />
            </div>
          </div>
          <div className="flex flex-col w-full gap-5 lg:flex-row">
            <div className="w-full mb-5 lg:1/2 lg:relative">
              <TitleBriefs titulo="Celular" />
              <InputsBriefs
                name="celular"
                type="text"
                value={values.celular}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.celular} touched={touched.celular} />
            </div>
            <div className="w-full mb-5 lg:1/2 lg:relative">
              <TitleBriefs titulo="Email" />
              <InputsBriefs
                name="email"
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.email} touched={touched.email} />
            </div>
          </div>
          <div className="flex flex-col w-full gap-5 lg:flex-row">
            <div className="w-full mb-5 lg:1/2 lg:relative">
              <TitleBriefs titulo="Contraseña" />
              <InputsBriefs
                name="password"
                type="text"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.password} touched={touched.password} />
            </div>
          </div>

          <div className="flex justify-end w-full gap-2">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/profesores"
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
