import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import { Loading } from '../../../shared/Loading'
import { useFormik } from 'formik'
import { SchemaCategorias } from '../../../shared/Schemas'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { Errors } from '../../../shared/Errors'
import { toast } from 'sonner'

export const CrearDepartamento = (): JSX.Element => {
  const navigate = useNavigate()
  const [loadingComponents, setLoadingComponents] = useState(false)

  const saveCategoria = async (values: any): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.post(
        `${Global.url}/departamentos/register`,
        { nombre: values.nombre },
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
        navigate('/admin/departamentos')
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
        nombre: ''
      },
      validationSchema: SchemaCategorias,
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
          <div className="w-full lg:relative mb-5">
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
          <div className="flex gap-2 w-full justify-end">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/departamentos"
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
