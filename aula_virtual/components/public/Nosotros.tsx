import {

  FaLightbulb,
  FaBalanceScale,
  FaMedal,
  FaStar

} from 'react-icons/fa'
import Banner from './Banner'
import { slide1 } from '../shared/images'
import { useEffect } from 'react'

const Nosotros = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
    <Banner imagen={`${slide1}`} titulo='Nosotros'/>
      <section className="nosotros">
        <div className="nosotros__main">
          <div className="nosotros__main__item">
            <h2>Misión</h2>
            <p className="mb-10">
              En Cencapp, nos visualizamos como el líder indiscutible en la
              capacitación de ingenieros a nivel global, ofreciendo programas
              innovadores que impulsan la excelencia técnica y el crecimiento
              profesional en un mundo en constante evolución.
            </p>
            <h2>Visión</h2>
            <p>
              Nuestra visión es convertirnos en el principal motor de
              transformación para ingenieros en todo el mundo, ofreciendo
              capacitaciones de vanguardia que no solo potencien sus habilidades
              técnicas, sino que también inspiren la innovación y el liderazgo
              en la ingeniería del futuro.
            </p>
          </div>
          <div className="nosotros__main__item">
            <h5>Capacitación y Asesoramiento Profesional</h5>

            <div className="content">
              {/* <div className="lg">
                  <img src={ico_white} alt="" />
                </div> */}
              <h2>
                <em>
                  {'"'}Desatamos el poder del conocimiento para impulsar la
                  ingeniería hacia nuevos horizontes.{'"'}
                </em>
              </h2>
            </div>
          </div>
        </div>
      </section>
      <section className="valores" style={{ paddingBottom: '82px' }}>
        <div className="valores__main">
          <div className="valores__main__item">
            <span>
              <FaLightbulb />
            </span>
            <p>Innovación</p>
          </div>
          <div className="valores__main__item">
            <span>
              <FaBalanceScale />
            </span>
            <p>Honestidad</p>
          </div>
          <div className="valores__main__item">
            <span>
              <FaMedal />
            </span>
            <p>Calidad</p>
          </div>
          <div className="valores__main__item">
            <span>
              <FaStar />
            </span>
            <p>Excelencia</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Nosotros
