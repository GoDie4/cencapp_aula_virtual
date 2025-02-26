import {
  FaBuilding,
  FaCity,
  FaTint,
  FaProjectDiagram,
  FaHardHat,
  FaMapMarkerAlt
} from 'react-icons/fa'
import area1 from '../../assets/areas/1.webp'
import area2 from '../../assets/areas/2.webp'
import area3 from '../../assets/areas/3.webp'
import area4 from '../../assets/areas/4.webp'
import area5 from '../../assets/areas/5.webp'
import area6 from '../../assets/areas/6.webp'
import area7 from '../../assets/areas/7.webp'
import area8 from '../../assets/areas/8.webp'
import { GiMining, GiRoad } from 'react-icons/gi' // Para Geotecnia
import Banner from './Banner'
import { slide2 } from '../shared/images'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Capacitacion = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  function eliminarTildes (texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
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
    <>
      <Banner titulo="Capacitaciones" imagen={`${slide2}`} />
      <section className="areas">
        <div className="areas__title">
          <h2>Áreas de capacitación</h2>
        </div>
        <div className="areas__main">
            <div className="areas__main__item">
              <Link to={`/cursos/${formatearURL('estructuras')}`}>
                <div className="cardArea">
                  <img src={area1} alt="" />
                  <div className="cardArea__content">
                    <span>
                      <FaBuilding />
                    </span>
                    <h5>Estructuras</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="areas__main__item">
              <div className="cardArea">
                <img src={area2} alt="" />
                <div className="cardArea__content">
                  <span>
                    <FaCity />
                  </span>
                  <h5>Infraestructura en edificaciones</h5>
                </div>
              </div>
            </div>
            <div className="areas__main__item">
              <div className="cardArea">
                <img src={area3} alt="" />
                <div className="cardArea__content">
                  <span>
                    <GiRoad />
                  </span>
                  <h5>Infraestructura en Obras Viales</h5>
                </div>
              </div>
            </div>
            <div className="areas__main__item">
              <div className="cardArea">
                <img src={area4} alt="" />
                <div className="cardArea__content">
                  <span>
                    <FaTint />
                  </span>
                  <h5>Infraestructura de Obras de Saneamiento</h5>
                </div>
              </div>
            </div>

            <div className="areas__main__item">
              <div className="cardArea">
                <img src={area5} alt="" />
                <div className="cardArea__content">
                  <span>
                    <FaProjectDiagram />
                  </span>
                  <h5>BIM</h5>
                </div>
              </div>
            </div>
            <div className="areas__main__item">
              <Link to={`/cursos/${formatearURL('construcción')}`}>
              <div className="cardArea">
                <img src={area6} alt="" />
                <div className="cardArea__content">
                  <span>
                    <FaHardHat />
                  </span>
                  <h5>Construcción</h5>
                </div>
              </div>

            </Link>
            </div>
            <div className="areas__main__item">
              <div className="cardArea">
                <img src={area7} alt="" />
                <div className="cardArea__content">
                  <span>
                    <GiMining />
                  </span>
                  <h5>Geotecnia</h5>
                </div>
              </div>
            </div>
            <div className="areas__main__item">
              <Link to={`/cursos/${formatearURL('Topografía y Fotogametría')}`}>
                <div className="cardArea">
                  <img src={area8} alt="" />
                  <div className="cardArea__content">
                    <span>
                      <FaMapMarkerAlt />
                    </span>
                    <h5>Topografía y Fotogametría</h5>
                  </div>
                </div>
              </Link>
            </div>
          </div>
      </section>
    </>
  )
}

export default Capacitacion
