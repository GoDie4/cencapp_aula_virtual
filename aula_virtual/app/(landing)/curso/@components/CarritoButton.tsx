'use client'

import { Curso } from "@/interfaces/CursoInterface"
import { CursoPedido, useCarrito } from "@/store/useCarrito"
import { useEffect, useState } from "react"
import { IoCartSharp } from "react-icons/io5"

export function CarritoButton ({ curso }: { curso: Curso }) {
  const [pedido, setPedido] = useState(false)
  const { agregarCarrito, removerCarrito, carrito } = useCarrito()

  useEffect(() => {
    if (carrito.find((car) => car.id === curso.id)) {
      setPedido(true)
    }
  }, [carrito, carrito.length, curso.id])

  function handleCarrito (curso: Curso) {
    const newPedido: CursoPedido = {
      ...curso,
      pedido
    }
    if (pedido) {
      removerCarrito(newPedido)
      setPedido(!pedido)
    }
    else {
      agregarCarrito(newPedido)
      setPedido(!pedido)
    }
  }

  return (
    <button onClick={() => handleCarrito(curso)} title="Agregar" type="button" className='w-full h-auto uppercase tracking-wider bg-primary-600 text-white-main mt-7 py-5 text-3xl font-medium flex justify-center items-center gap-2 rounded-lg'>
      <span> <IoCartSharp size={30} /> </span>
      <span>{pedido ? 'Quitar del Carrito' : 'Enviar al Carrito'}</span>
    </button>
  )
}