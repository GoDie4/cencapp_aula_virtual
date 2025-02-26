import Link from "next/link"
import { JSX } from "react"

const CardCurso = ({ img, horas, titulo, precio }: { img: string, horas: string, titulo: string, precio: string }): JSX.Element => {
  function eliminarTildes (texto: string): string {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  }
  function formatearURL (nombre: string): string {
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
        <img src={img} alt="" />
        <span>{horas}</span>
        <span className="precio">S/{precio}.00</span>
      </div>
      <div className="cardCurso__title">
        <h5 className="line-clamp-2">{titulo}</h5>

        <div className="vermas">
          <Link href={`/curso/${formatearURL(titulo)}`}>Ver más</Link>
        </div>
      </div>
    </div>
  )
}

export default CardCurso
