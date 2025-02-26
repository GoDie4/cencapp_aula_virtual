/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useParams } from 'react-router-dom'
import CardCurso from './CardCurso'
import Banner from '../Banner'
import area8 from '../../../assets/areas/8.webp'
import area6 from '../../../assets/areas/6.webp'
import area1 from '../../../assets/areas/1.webp'

import curso1 from '../../../assets/cursos/1.webp'
import curso2 from '../../../assets/cursos/2.webp'
import curso3 from '../../../assets/cursos/3.webp'
import curso4 from '../../../assets/cursos/4.webp'
import { useEffect } from 'react'

const Cursos = (): JSX.Element => {
  const { nombre } = useParams()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const cursosInfo = {
    topografiayfotogametria: {
      titulo: 'Topografía y Fotogametría',
      fondo: `${area8}`,
      cursos: [
        {
          titulo: 'Levantamiento topográfico',
          img: `${curso4}`,
          precio: '120',
          horas: '32 horas'
        },
        {
          titulo: 'Topografía en obras civiles',
          img: `${curso1}`,
          precio: '350',
          horas: '40 horas'
        }
      ]
    },
    construccion: {
      titulo: 'Construcción',
      fondo: `${area6}`,
      cursos: [
        {
          titulo: 'Presupuesto y programación de obras con presupuesto.pe',
          img: `${curso2}`,
          precio: '80',
          horas: '48 horas'
        }
      ]
    },
    estructuras: {
      titulo: 'Estructuras',
      fondo: `${area1}`,
      cursos: [
        {
          horas: '32 horas',
          img: `${curso3}`,
          precio: '100',
          titulo: 'Elaboración de planos estructurales con Autocad Structural Detailling'
        }
      ]
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const curso = cursosInfo[nombre] // Obtenemos los datos del curso según el nombre de la URL

  if (!curso) {
    return <div>Curso no encontrado</div>
  }
  return (
    <>
      <Banner imagen={`${curso.fondo}`} titulo={curso.titulo} />
      <div className="gridCursos">
        <div className="gridCursos__title"></div>
        <div className="gridCursos__main">
          {curso.cursos.map((curso: any, index: number) => (
            <div className="gridCursos__main__item" key={index}>
              <CardCurso
                horas={curso.horas}
                img={curso.img}
                precio={curso.precio}
                titulo={curso.titulo}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Cursos
