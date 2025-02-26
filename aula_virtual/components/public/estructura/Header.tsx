'use client'
// Imagenes
import { logo, logo_white } from '../../shared/images'
import { MdOutlineMenu } from 'react-icons/md'
// Iconos
import { CiMobile1 } from 'react-icons/ci'
import { JSX, useEffect, useState } from 'react'
import Link from 'next/link'
export const Header = (): JSX.Element => {
  const [scroll, setScroll] = useState(0)

  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const handleScroll = (): void => {
      setScroll(window.scrollY)
    }

    // Asigna el evento de scroll al montar el componente
    window.addEventListener('scroll', handleScroll)

    // Limpia el evento al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const headerClass = scroll > 0 ? 'fixedActive' : ''
  return (
    <>
        <header className={`header ${headerClass} ${menu ? 'fixedActive' : ''}`}>
            <nav className="header__nav">
                <div className="header__nav__logo">
                    <picture>
                        <Link href="/"><img src={logo_white.src} alt="" className="lg_white" /></Link>
                        <Link href="/"><img src={logo.src} alt="" className="lg"/></Link>

                    </picture>
                </div>
                <div className="header__nav__menu">
                    <ul className={`${menu ? 'showMenu' : ''}`}>
                        <li>
                            <Link onClick={() => { setMenu(false) }} href="/">Inicio</Link>
                        </li>
                        <li>
                            <Link onClick={() => { setMenu(false) }} href="/nosotros">Nosotros</Link>
                        </li>
                        <li>
                            <Link onClick={() => { setMenu(false) }} href="/capacitaciones">Capacitaciones</Link>
                        </li>
                        <li>
                            <Link onClick={() => { setMenu(false) }} href="/inscripcion">Inscripción</Link>
                        </li>
                        <li>
                            <Link onClick={() => { setMenu(false) }} href="/contacto">Contacto</Link>
                        </li>
                    </ul>
                </div>
                <div className="header__nav__data">
                    <div className="header__nav__data__info">
                        <span>
                            <a href="tel:+51973044253"><CiMobile1/>(+51) 973 044 253</a>
                        </span>

                    </div>

                </div>

                <div className="header__nav__button">
                    <button type="button" onClick={() => { setMenu(!menu) }}><MdOutlineMenu/></button>
                </div>
            </nav>

        </header>
    </>
  )
}
