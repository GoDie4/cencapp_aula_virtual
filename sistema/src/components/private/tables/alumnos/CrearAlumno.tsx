import { Link, useNavigate } from "react-router-dom"
import { Errors } from "../../../shared/Errors"
import { InputsBriefs } from "../../../shared/InputsBriefs"
import { TitleBriefs } from "../../../shared/TitleBriefs"
import { Loading } from "../../../shared/Loading"
import { ProfesorSchema } from "../../../shared/Schemas"
import { useFormik } from "formik"
import { toast } from "sonner"
import { Global } from "../../../../helper/Global"
import axios from "axios"
import { Usuario } from "../../../../interfaces/UserInterface"
import { useState } from "react"

export function CrearAlumno() {
  const navigate = useNavigate()
  const [loadingComponents, setLoadingComponents] = useState(false)

  const saveBanner = async (
    values: Usuario
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('nombres', values.nombres)
    formData.append('apellidos', values.apellidos)
    formData.append('email', values.email)
    formData.append('celular', values.celular)
    formData.append('password', values.password)
    const body = {
      nombres: values.nombres,
      apellidos: values.apellidos,
      email: values.email,
      celular: values.celular,
      password: values.password
    }
    try {
      const { status } = await axios.post(
        `${Global.url}/alumnos`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token !== null && token !== '' ? token : ''
              }`
          }
        }
      )
      if (status === 201) {
        toast.success('Registro exitoso')
        navigate('/admin/alumnos')
      }
      if (status === 400) {
        toast.warning('Complete todos los datos')
      }
      if (status === 401) {
        navigate('/login')
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
        nombres: '',
        apellidos: '',
        email: '',
        celular: '',
        password: '',
        rolId: 2
      },
      validationSchema: ProfesorSchema,
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
                <TitleBriefs titulo="Nombres" />
                <InputsBriefs
                  name="nombres"
                  type="text"
                  value={values.nombres}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors errors={errors.nombres} touched={touched.nombres} />
              </div>
              <div className="w-full lg:relative mb-5">
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
              <div className="w-full lg:relative mb-5">
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
            </div>
            <div>
            </div>
            <div className="w-full flex flex-col gap-5 lg:flex-row">
              <div className="w-full lg:relative mb-5">
                <TitleBriefs titulo="Email" />
                <InputsBriefs
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors errors={errors.email} touched={touched.email} />
              </div>
              <div className="w-full lg:relative mb-5">
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

            <div className="flex gap-2 w-full justify-end">
              <input type="hidden" name="oculto" value="1" />
              <Link
                to="/admin/alumnos"
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