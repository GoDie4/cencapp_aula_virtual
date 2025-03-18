import { FormEvent, useState } from "react";
import { TestInterface, TestResuelto } from "../../../../interfaces/TestInterface";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { Global } from "../../../../helper/Global";

export function ColocarPuntaje({ test, testResuelto }: { test: TestInterface, testResuelto: TestResuelto }) {
  const [puntaje, setPuntaje] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPuntaje(event.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
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
      const response = await axios.post(`${Global.url}/colocarPuntaje`, {
        testId: testResuelto.id,
        puntaje: puntaje
      })
      if (response.status === 200) {
        toast.success(response.data.message)
      }
      
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.message)
      }
    }

  }

  return (
    <>
      <form className="w-full space-y-5" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col space-y-3">
          <label htmlFor="puntaje" className="font-medium">Colocar el Puntaje Final: ({test.puntaje_maxima} max.) </label>
          <input type="number" onChange={handleChange} name="puntaje" id="puntaje" className="p-3 bg-gray-200 rounded-2xl" />
        </div>
        <button type="submit" className="mx-auto px-4 py-2 bg-primary text-white rounded-xl">Enviar Puntaje</button>
      </form>
    </>
  )
}