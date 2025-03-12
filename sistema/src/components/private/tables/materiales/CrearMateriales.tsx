import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Global } from '../../../../helper/Global'
import { toast } from 'sonner'
import { type MaterialValues } from '../../../../interfaces/MaterialesInterface'
import { useFormik } from 'formik'
import Editor from '../../../shared/Editar'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { type ClasesInterface } from '../../../../interfaces/ClasesInterface'
import { type SeccionInterface } from '../../../../interfaces/SeccionInterface'
import { type Curso } from '../../../../interfaces/CursoInterface'
import { Errors } from '../../../shared/Errors'
import { Loading } from '../../../shared/Loading'

export default function CrearMateriales (): JSX.Element {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [loadingComponents, setLoadingComponents] = useState(false)
  const [cursos, setCursos] = useState([])
  const [secciones, setSecciones] = useState([])
  const [clases, setClases] = useState([])
  const [cursoSeleccionado, setCursoSeleccionado] = useState('')
  const [seccionSeleccionado, setSeccionSeleccionado] = useState('')
  const [claseSeleccionado, setClaseSeleccionado] = useState('')
  const [content, setContent] = useState('')
  const [documento, setDocumento] = useState<File | null>(null)

  const handleDocumentoChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDocumento(event.target.files ? event.target.files[0] : null)
  }

  const handleChangeCurso = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCursoSeleccionado(e.target.value)
  }

  const handleChangeSeccion = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSeccionSeleccionado(e.target.value)
  }

  const handleChangeClase = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setClaseSeleccionado(e.target.value)
  }

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

  const getSecciones = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${Global.url}/seccionesCurso/` + cursoSeleccionado, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      setSecciones(data.secciones)
      setLoadingComponents(false)
    } catch (e) {
      console.log(e)
    }
  }

  const getClases = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${Global.url}/clasesSeccion/` + seccionSeleccionado, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''
            }`
        }
      })
      setClases(data.clases)
      setLoadingComponents(false)
    } catch (e) {
      console.log(e)
    }
  }

  const saveMaterial = async (
    values: MaterialValues
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('descripcion', content)
    formData.append('nombre', values.nombre)
    formData.append('claseId', claseSeleccionado)
    if (documento) {
      formData.append('archivo', documento)
    }
    try {
      const { status } = await axios.postForm(
        `${Global.url}/materiales`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token !== null && token !== '' ? token : ''
              }`
          }
        }
      )
      if (status === 201) {
        toast.success('Registro exitoso')
        navigate('/admin/examenes')
      }
      if (status === 400) {
        toast.warning('Complete todos los datos')
      }
      if (status === 401) {
        navigate('/login')
      }
      setLoadingComponents(false)
    } catch (error) {
      console.log(error)
      toast.error('Error al crear registro')
    }
    setLoadingComponents(false)
  }
  const { handleSubmit, handleChange, errors, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        nombre: '',
        descripcion: ''
      },
      onSubmit: saveMaterial
    })
  useEffect(() => {
    getCursos()
  }, [])

  useEffect(() => {
    if (cursoSeleccionado) {
      getSecciones()
    }
  }, [cursoSeleccionado])

  useEffect(() => {
    if (seccionSeleccionado) {
      getClases()
    }
  }, [seccionSeleccionado])

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
              <div className="w-full lg:relative mb-5">
                <TitleBriefs titulo="Titulo" />
                <InputsBriefs
<<<<<<< HEAD
                  name="nombre"
=======
                  name="titulo"
>>>>>>> cd7880420e4851159fd4fed12b6f38253b2a0bae
                  type="text"
                  value={values.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors errors={errors.nombre} touched={touched.nombre} />
              </div>
            </div>
            <div className='mb-5 flex max-lg:flex-col gap-4'>
              <div className="w-full lg:w-1/3">
                <TitleBriefs titulo="Asignar cursos" />
                <select
                  title='Selecciona una categoria'
                  className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                                    focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                                    rounded-md transition-all"
                  name="cursoId"
                  value={cursoSeleccionado}
                  autoComplete="off"
                  onChange={handleChangeCurso}
                  onBlur={handleBlur}
                >
                  <option value="">Seleccionar</option>
                  {cursos.map((curso: Curso) => (
                    <option value={curso.id} key={curso.id}>
                      {curso.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full lg:w-1/3">
                <TitleBriefs titulo="Asignar secciones" />
                <select
                  title='Selecciona una categoria'
                  className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                                    focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                                    rounded-md transition-all"
                  value={seccionSeleccionado}
                  autoComplete="off"
                  onChange={handleChangeSeccion}
                  onBlur={handleBlur}
                  disabled={secciones.length === 0}
                >
                  <option value="">Seleccionar</option>
                  {secciones.map((seccion: SeccionInterface) => (
                    <option value={seccion.id} key={seccion.id}>
                      {seccion.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full lg:w-1/3">
                <TitleBriefs titulo="Asignar clase" />
                <select
                  title='Selecciona una categoria'
                  className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                                    focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                                    rounded-md transition-all"
                  name="cursoId"
                  value={claseSeleccionado}
                  autoComplete="off"
                  onChange={handleChangeClase}
                  onBlur={handleBlur}
                  disabled={clases.length === 0}
                >
                  <option value="">Seleccionar</option>
                  {clases.map((clase: ClasesInterface) => (
                    <option value={clase.id} key={clase.id}>
                      {clase.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <div className="w-full lg:relative">
                <TitleBriefs titulo="Archivo" />
                <InputsBriefs
                  name="archivo"
                  type="file"
                  onChange={handleDocumentoChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-y-2 my-20 relative">
                <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
                  Descripción<span className="text-red-500">*</span>
                </p>
                <div className="flex-1 w-full md:w-3/4">
                  <Editor content={content} setContent={setContent} />
                </div>
              </div>
            </div>

            <div className="flex gap-2 w-full justify-end">
              <input type="hidden" name="oculto" value="1" />
              <Link
                to="/admin/materiales"
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
