'use client'
import { useCarrito } from "@/store/useCarrito"
import Image from "next/image"
import Link from "next/link"
import { JSX, useEffect, useState } from "react"
import { toast } from "sonner"
//import Swal from "sweetalert2"

const CardCurso = ({ id, img, horas, titulo, precio }: { id: string, img: string, horas: string, titulo: string, precio: string}): JSX.Element => {
  const [pedido, setPedido] = useState(false)
  const { carrito ,agregarCarrito, removerCarrito } = useCarrito()
  useEffect(() => {
    setPedido(carrito.some((c) => c.id === id))
  }, [carrito.length])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault()
    if (pedido) {
      removerCarrito({
        id: id,
        nombre: titulo,
        precio: parseFloat(precio),
        horas: parseInt(horas),
        imagen: img,
        categoriaId: 1,
      })
      toast.success("Curso agregado al carrito")
    }
    else {
      agregarCarrito({
        id: id,
        nombre: titulo,
        precio: parseFloat(precio),
        horas: parseInt(horas),
        imagen: img,
        categoriaId: 1,
      })
      toast.success("Curso eliminado del carrito")
    }
  }

  function eliminarTildes(texto: string): string {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  }
  function formatearURL(nombre: string): string {
    // Eliminar espacios al principio y al final del nombre
    let url = nombre.trim()

    // Convertir todo el string a minúsculas
    url = url.toLowerCase()

    // Reemplazar los espacios por guiones
    url = url.replace(/ /g, '')

    // Eliminar tildes
    url = eliminarTildes(url)

    // Reemplazar caracteres especiales por sus equivalentes URL seguros
    url = url.replace(/[^a-zA-Z0-9-]/g, '')

    // Retornar la URL formateada
    return url
  }
  return (
    <div className="cardCurso shadow-md">
      <div className="cardCurso__img">
        <Image src={img} alt="" width={700} height={400} />
        <span>{horas}</span>
        <span className="precio">S/{precio}.00</span>
      </div>
      <div className="cardCurso__title">
        <h5 className="line-clamp-2">{titulo}</h5>

        <div className="vermas justify-evenly gap-3 flex-wrap">
          {/*<Link href={`/curso/${formatearURL(titulo)}`}>Ver más</Link>*/}
          <button onClick={handleClick} type="button" title="añadir" className="px-6 py-3 text-xl bg-primary text-white rounded-lg w-fit">{pedido ? 'Quitar de Carrito' : 'Añadir al Carrito'}</button>
          <Link href={`/curso/${formatearURL(titulo)}`} className="text-white bg-[#0bb24f] py-3 px-6 text-xl rounded-lg w-fit">Ver más</Link>
        </div>
      </div>
    </div>
  )
}

export default CardCurso
