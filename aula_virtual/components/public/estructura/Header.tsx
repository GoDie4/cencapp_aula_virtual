/* eslint-disable @next/next/no-img-element */
"use client";
// Imagenes
import { logo, logo_white } from "../../shared/images";
import { MdOutlineMenu } from "react-icons/md";
// Iconos
// import { CiMobile1 } from 'react-icons/ci'
import { JSX, useEffect, useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import InicioSesionBoton from "../../auth/InicioSesionBoton";
import UsuarioAutenticado from "../../auth/UsuarioAutenticado";
import { ContentMain } from "./ContentMain";
import { NavLinkMenu } from "./components/NavLinkMenu";

const navLinks = [
  { id: 1, text: "Inicio", href: "/" },
  { id: 2, text: "Nosotros", href: "/nosotros" },
  { id: 3, text: "Capacitaciones", href: "/capacitaciones" },
  { id: 4, text: "Inscripción", href: "/inscripcion" },
  { id: 5, text: "Contacto", href: "/contacto" },
];

export const Header = (): JSX.Element => {
  const [scroll, setScroll] = useState(0);

  const [menu, setMenu] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = (): void => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClass =
    scroll > 0 ? "bg-white-main shadow-lg" : "text-white-main";
  return (
    <>
      <header
        className={`fixed w-full z-[998] transition-all  ${headerClass} ${
          menu ? "bg-white-main" : ""
        }`}
      >
        <ContentMain>
          <nav className="flex items-center justify-between py-2.5">
            <div className="pt-1.5 pb-1.5 w-20">
              <picture>
                <Link href="/">
                  <img
                    src={logo_white.src}
                    alt=""
                    className={`w-20 ${scroll > 0 || menu ? "hidden" : "block"}`}
                  />
                </Link>
                <Link href="/">
                  <img src={logo.src} alt="" className={`w-20 ${scroll > 0 || menu ? "block" : "hidden"}`} />
                </Link>
              </picture>
            </div>
            <div className="hidden md:block">
              {" "}
              <ul className="flex gap-10">
                {navLinks.map(({ id, text, href }) => (
                  <li key={id}>
                    <NavLinkMenu
                      href={href}
                      text={text}
                      onClick={() => setMenu(false)}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="items-center hidden gap-10 md:flex">
              {" "}
              {/* Oculto en móviles */}
              <div>
                <span>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 text-sm text-white"
                  >
                    {user?.email ? (
                      <UsuarioAutenticado />
                    ) : (
                      <InicioSesionBoton />
                    )}
                  </Link>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 mr-4 text-3xl text-white bg-green-500 rounded md:hidden">
              <button
                title="boton"
                type="button"
                onClick={() => setMenu(!menu)}
              >
                <MdOutlineMenu />
              </button>
            </div>
          </nav>
          {/* Menú móvil */}
          <div
            className={`md:hidden absolute text-black-900 top-full left-0 w-full bg-white-main flex flex-col items-center justify-center py-6 gap-4 transition-all duration-300 ${
              menu
                ? "menuShow"
                : "menuOculto"
            }`}
          >
            {navLinks.map(({ id, text, href }) => (
              <NavLinkMenu
                key={id}
                href={href}
                text={text}
                onClick={() => setMenu(false)}
              />
            ))}
          </div>
        </ContentMain>
      </header>
    </>
  );
};
