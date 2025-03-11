import React, { useEffect, useState } from 'react'
import { Loading } from '../../../shared/Loading'
import { useFormik } from 'formik'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Global } from '../../../../helper/Global'
import axios from 'axios'
import { toast } from 'sonner'
import { type ProfesorInterface } from '../../../../interfaces/ProfesoresInterface'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { Errors } from '../../../shared/Errors'

interface CursoCargoValues {
  profesorId: string
}

export default function CargoCurso (): JSX.Element {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [profesores, setProfesores] = useState([])
  const { id } = useParams()
  const [loadingComponents, setLoadingComponents] = useState(true)

  const getCurso = async (): Promise<void> => {
    try {
      setLoadingComponents(true)
      const { data } = await axios.get(`${Global.url}/profesores`, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      setProfesores(data.profesores)
    } catch (error) {
      toast.error('Error al traer datos del producto')
      console.log(error)
    } finally {
      setLoadingComponents(false)
    }
  }

  const cursoCargo = async (values: CursoCargoValues): Promise<void> => {
    try {
      const body = {
        profesorId: values.profesorId,
        cursoId: id
      }
      const { status } = await axios.post(`${Global.url}/cargoCurso`, body, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      if (status === 200) {
        toast.success('Registro exitoso')
        navigate('/admin/cursos')
      }
    } catch (error) {
      toast.error('Error al subir producto')
      console.log(error)
    }
  }
  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur
  } = useFormik({
    initialValues: {
      profesorId: ''
    },
    onSubmit: cursoCargo
  })

  useEffect(() => {
    getCurso()
  }, [])

  return (
    <>
      {loadingComponents
        ?
        (<Loading />)
        : (
          <form
            className="bg-secondary-100 p-8 rounded-xl mt-4"
            onSubmit={handleSubmit}
          >
            <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-4 lg:gap-2">
              <div className='w-full'>
                <TitleBriefs titulo="Asignar profesor" />
                <select
                  title='Selecciona una profesor'
                  className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                                      rounded-md transition-all"
                  name="profesorId"
                  value={values.profesorId}
                  autoComplete="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Seleccionar</option>
                  {profesores.map((profesor: ProfesorInterface) => (
                    <option value={profesor.id} key={profesor.id}>
                      {profesor.nombres}
                    </option>
                  ))}
                </select>
                <Errors
                  errors={errors.profesorId}
                  touched={touched.profesorId}
                />
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
        )
      }
    </>
  )
}
