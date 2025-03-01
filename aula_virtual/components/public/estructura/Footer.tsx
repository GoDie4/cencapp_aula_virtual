'use client'
import {
  BsChevronRight,
  BsEnvelope,
  BsFacebook,
  BsPhoneFill,
  BsYoutube
} from 'react-icons/bs'
import { logo_white, lp } from '../../shared/images'
import { BiSolidMapPin } from 'react-icons/bi'
import Image from 'next/image'
import { JSX } from 'react'
import Link from 'next/link'

export const Footer = (): JSX.Element => {
  return (
    <>
      <footer className="footer">
        <div className="footer__main">
          <div className="footer__main__item">
            <Image src={logo_white} alt="" />
            <p>
              Convertimos ideas en realidades, construyendo un mañana sólido, un
              proyecto a la vez
            </p>

            <div className="socialMedia">
              <div className="socialMedia__main">
                <div className="socialMedia__main__item">
                  <a title='facebook:CENCAPP' href="https://www.facebook.com/profile.php?id=100083328371374" target='_blank' rel="noreferrer noopener">
                    <BsFacebook />
                  </a>
                </div>
                <div className="socialMedia__main__item">
                  <a href="https://www.youtube.com/@cencapp" target='_blank' rel="noreferrer">
                    <BsYoutube />
                  </a>
                </div>

              </div>
            </div>
          </div>
          <div className="footer__main__item">
            <ul>
              <h5>Capacitaciones</h5>
              <li>
                <BsChevronRight />
                <Link href="/capacitaciones">Estructuras</Link>
              </li>
              <li>
                <BsChevronRight />
                <Link href="/capacitaciones">Infraestructura en edificaciones</Link>
              </li>
              <li>
                <BsChevronRight />
                <Link href="/capacitaciones">Infraestructura en obras viales</Link>
              </li>
              <li>
                <BsChevronRight />
                <Link href="/capacitaciones">Infraestructura de obras de saneamiento</Link>
              </li>

              <li>
                <BsChevronRight />
                <Link href="/capacitaciones">BIM</Link>
              </li>
              <li>
                <BsChevronRight />
                <Link href="/capacitaciones">Construcción</Link>
              </li>
              <li>
                <BsChevronRight />
                <Link href="/capacitaciones">Geotecnia</Link>
              </li>
              <li>
                <BsChevronRight />
                <Link href="/capacitaciones">Topografía y fotogametría</Link>
              </li>
            </ul>
          </div>
          <div className="footer__main__item">
            <ul>
              <h5>Enlaces</h5>
              <li>
                <BsChevronRight />
                <Link href="/">Inicio</Link>
              </li>
              <li>
                <BsChevronRight />
                <Link href="/nosotros">Nosotros</Link>
              </li>
              <li>
                <BsChevronRight />
                <Link href="/capacitaciones">Capacitaciones</Link>
              </li>

              <li>
                <BsChevronRight />
                <Link href="/inscripcion">Inscripción</Link>
              </li>

              <li>
                <BsChevronRight />
                <Link href="/contacto">Contacto</Link>
              </li>
            </ul>
          </div>
          <div className="footer__main__item">
            <ul>
              <h5>Contáctanos</h5>
              <li>
                <BiSolidMapPin />
                <Link href="#">Psje. Matiza Rimachi Cuadra 3</Link>
              </li>
              <li>
                <BsPhoneFill />
                <a href="tel:+519730044253">(+51) 973 044 253</a>
              </li>
              <li>
                <BsEnvelope />
                <a href="mail:ventas@cencapperu.com">ventas@cencapperu.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__copy">
          <div className="footer__copy__main">
            <div className="footer__copy__main__item">
              <p>
                © 2024 <span>CENCAPP.</span> Todos los derechos
                reservados
              </p>
            </div>
            <div className="footer__copy__main__item">
              <p>
                Design by:{' '}
                <a href="https://logosperu.com.pe/">
                  <img src={lp} alt="Logos Perú" width={20} />
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
