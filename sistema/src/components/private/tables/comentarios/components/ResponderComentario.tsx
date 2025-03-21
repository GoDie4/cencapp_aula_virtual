import { useFormik } from 'formik'
import { Errors } from '../../../../shared/Errors'
import { useContext } from 'react'
import { type RespuestaComentarioModificate } from '../../../../../interfaces/ComentarioInterface'
import axios from 'axios'
import { Global } from '../../../../../helper/Global'
import { toast } from 'sonner'
import { ModalContext } from '../../../../../context/ModalProvider'

export const ResponderComentario = ({
  comentarioId
}: {
  comentarioId: string
}): JSX.Element => {
  const { handleClose } = useContext(ModalContext)

  const enviarRespuesta = async (
    values: RespuestaComentarioModificate
  ): Promise<void> => {
    const token = localStorage.getItem('token')

    const data = {
      respuesta: values.respuesta,
      comentarioId
    }

    console.log(data)

    try {
      const { status } = await axios.post(
        `${Global.url}/respuestas/save`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== '' ? token : ''
            }`
          }
        }
      )
      if (status === 201) {
        toast.success('Respuesta enviada')
        handleClose()
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
      toast.error('Error al crear registro')
    }
  }

  const { handleSubmit, handleChange, errors, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        respuesta: ''
      },
      onSubmit: enviarRespuesta
    })

  return (
    <form className="w-full space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col w-full space-y-3">
        <label htmlFor="puntaje" className="font-medium ">
          Coloca una respuesta
        </label>
        <input
          name="respuesta"
          onBlur={handleBlur}
          onChange={handleChange}
          type="text"
          className="w-full px-3 py-2 bg-gray-400 rounded-lg"
          value={values.respuesta}
        />

        <Errors errors={errors.respuesta} touched={touched.respuesta} />
      </div>
      <button
        type="submit"
        className="px-4 py-2 mx-auto text-white bg-main rounded-xl"
      >
        Enviar respuesta
      </button>
    </form>
  )
}
