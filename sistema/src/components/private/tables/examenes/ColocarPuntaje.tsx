import { type FormEvent, useContext, useState } from 'react'
import {
  type TestInterface,
  type TestResuelto
} from '../../../../interfaces/TestInterface'
import { toast } from 'sonner'
import axios, { AxiosError } from 'axios'
import { Global } from '../../../../helper/Global'
import { ModalContext } from '../../../../context/ModalProvider'

export function ColocarPuntaje ({
  test,
  testResuelto,
  getExamenes
}: {
  test: TestInterface
  testResuelto: TestResuelto
  getExamenes: () => Promise<void>
}): JSX.Element {
  const [puntaje, setPuntaje] = useState('')
  const { handleClose } = useContext(ModalContext)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPuntaje(event.target.value)
  }

  const handleSubmit = async (e: FormEvent): Promise<any> => {
    e.preventDefault()
    if (Number(puntaje) < 0) {
      toast.error('El puntaje debe ser mayor a 0 y no negativo')
      return
    }
    if (Number(puntaje) > Number(test.puntaje_maxima)) {
      toast.error('Está superando el puntaje máximo')
      return
    }
    try {
      const response = await axios.post(
        `${Global.url}/colocarPuntaje`,
        {
          testId: testResuelto.id,
          puntaje
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`
          }
        }
      )
      if (response.status === 200) {
        toast.success(response.data.message)
        handleClose()
        getExamenes()
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.message)
      }
    }
  }

  return (
    <>
      <form className="w-full space-y-5" onSubmit={(e) => { handleSubmit(e) }}>
        <div className="flex flex-col w-full space-y-3">
          <label htmlFor="puntaje" className="font-medium">
            Colocar el Puntaje Final: ({test.puntaje_maxima} max.){' '}
          </label>
          <input
            type="number"
            onChange={handleChange}
            name="puntaje"
            id="puntaje"
            className="p-3 bg-gray-200 rounded-2xl"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 mx-auto text-white bg-primary rounded-xl"
        >
          Enviar Puntaje
        </button>
      </form>
    </>
  )
}
