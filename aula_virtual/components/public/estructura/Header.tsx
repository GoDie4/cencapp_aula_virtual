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

export const Header = (): JSX.Element => {
  const [scroll, setScroll] = useState(0);

  const [menu, setMenu] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = (): void => {
      setScroll(window.scrollY);
    };

    // Asigna el evento de scroll al montar el componente
    window.addEventListener("scroll", handleScroll);

    // Limpia el evento al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClass = scroll > 0 ? "fixedActive" : "";
  return (
    <>
      <header
        className={`fixed w-full z-[998] transition-all duration-200 ${headerClass} ${
          menu ? "fixedActive" : ""
        }`}
      >
        <ContentMain>
          <nav className="flex items-center justify-between py-2.5">
            <div className="pt-1.5 pb-1.5 w-20">
              <picture>
                <Link href="/">
                  <img src={logo_white.src} alt="" className="w-20 lg_white" />
                </Link>
                <Link href="/">
                  <img src={logo.src} alt="" className="w-20 lg" />
                </Link>
              </picture>
            </div>
            <div className="hidden md:block">
              {" "}
              {/* Oculto en móviles */}
              <ul className="flex gap-10">
                <li>
                  <Link
                    onClick={() => setMenu(false)}
                    href="/"
                    className="text-lg font-medium text-white relative transition-all duration-300 hover:text-green-500 hover:tracking-wider before:content-[''] before:absolute before:w-0 before:top-full before:h-[2px] before:left-0 before:bg-green-500 before:transition-all before:duration-200 hover:before:w-full"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setMenu(false)}
                    href="/nosotros"
                    className="text-lg font-medium text-white relative transition-all duration-300 hover:text-green-500 hover:tracking-wider before:content-[''] before:absolute before:w-0 before:top-full before:h-[2px] before:left-0 before:bg-green-500 before:transition-all before:duration-200 hover:before:w-full"
                  >
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setMenu(false)}
                    href="/capacitaciones"
                    className="text-lg font-medium text-white relative transition-all duration-300 hover:text-green-500 hover:tracking-wider before:content-[''] before:absolute before:w-0 before:top-full before:h-[2px] before:left-0 before:bg-green-500 before:transition-all before:duration-200 hover:before:w-full"
                  >
                    Capacitaciones
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setMenu(false)}
                    href="/inscripcion"
                    className="text-lg font-medium text-white relative transition-all duration-300 hover:text-green-500 hover:tracking-wider before:content-[''] before:absolute before:w-0 before:top-full before:h-[2px] before:left-0 before:bg-green-500 before:transition-all before:duration-200 hover:before:w-full"
                  >
                    Inscripción
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setMenu(false)}
                    href="/contacto"
                    className="text-lg font-medium text-white relative transition-all duration-300 hover:text-green-500 hover:tracking-wider before:content-[''] before:absolute before:w-0 before:top-full before:h-[2px] before:left-0 before:bg-green-500 before:transition-all before:duration-200 hover:before:w-full"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div className="hidden md:flex gap-10 items-center">
              {" "}
              {/* Oculto en móviles */}
              <div>
                <span>
                  <Link
                    href="/login"
                    className="flex items-center text-sm gap-2 text-white"
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
            <div className="md:hidden bg-green-500 text-white w-12 h-12 rounded flex items-center justify-center text-3xl mr-4">
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
            className={`md:hidden absolute top-full left-0 w-full bg-white flex flex-col items-center justify-center py-6 gap-4 transition-all duration-300 ${
              menu
                ? "clip-path-[polygon(0_0,100%_0,100%_100%,0_100%)]"
                : "clip-path-[polygon(0_0,100%_0,100%_0,0_0)]"
            }`}
          >
            <Link
              onClick={() => setMenu(false)}
              href="/"
              className="text-base font-medium text-gray-800"
            >
              Inicio
            </Link>
            <Link
              onClick={() => setMenu(false)}
              href="/nosotros"
              className="text-base font-medium text-gray-800"
            >
              Nosotros
            </Link>
            <Link
              onClick={() => setMenu(false)}
              href="/capacitaciones"
              className="text-base font-medium text-gray-800"
            >
              Capacitaciones
            </Link>
            <Link
              onClick={() => setMenu(false)}
              href="/inscripcion"
              className="text-base font-medium text-gray-800"
            >
              Inscripción
            </Link>
            <Link
              onClick={() => setMenu(false)}
              href="/contacto"
              className="text-base font-medium text-gray-800"
            >
              Contacto
            </Link>
          </div>
        </ContentMain>
      </header>
    </>
  );
};
