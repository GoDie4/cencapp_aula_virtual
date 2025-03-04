/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  FaBookOpen,
  FaClipboardCheck,
  FaTasks,
  FaFolderOpen,
  FaComments,
} from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { IoChevronBackOutline } from "react-icons/io5";
const rutasHeaderAula = [
  { nombre: "Cursos", ruta: "cursos", icono: <FaBookOpen /> },
  { nombre: "Exámenes", ruta: "examenes", icono: <FaClipboardCheck /> },
  { nombre: "Tareas", ruta: "tareas", icono: <FaTasks /> },
  { nombre: "Materiales", ruta: "materiales", icono: <FaFolderOpen /> },
  { nombre: "Comentarios", ruta: "comentarios", icono: <FaComments /> },
];

export const SideBarAula = ({
  ocultarSideBar,
  setOcultarSideBar,
}: {
  ocultarSideBar: boolean;
  setOcultarSideBar: Dispatch<SetStateAction<boolean>>;
}) => {
  const [itemActive, setItemActive] = useState<string>(
    `${rutasHeaderAula[0].nombre.toLowerCase()}`
  );
  return (
    <header
      className={`py-12 px-5 ${
        ocultarSideBar ? "w-20" : "w-64"
      }   bg-gradient-to-br from-primary-950 to-primary-main h-screen relative transition-all duration-500 ease-out`}
    >
      <button
        type="button"
        onClick={() => {
          setOcultarSideBar(!ocultarSideBar);
        }}
        className={`bg-gradient-to-br z-50  from-secondary-800 to-secondary-main absolute top-6 -right-4  w-8 h-8 flex items-center justify-center text-white-main text-2xl rounded-full transition-all duration-500 ease-out ${
          ocultarSideBar ? "rotate-180" : "rotate-0"
        }`}
      >
        <IoChevronBackOutline />
      </button>
      <div className="h-full flex flex-col justify-between">
        <div className="w-full">
          <div className="w-full">
            <img
              src="/assets/images/logo/logo-white.png"
              alt=""
              className="block w-32 mx-auto"
            />
          </div>
          <nav className="py-10 h-auto ">
            <ul className="space-y-4">
              {rutasHeaderAula.map((item, index) => (
                <li
                  key={index}
                  title={item.nombre}
                  className={`py-3 text-center ${
                    itemActive === item.nombre.toLowerCase()
                      ? "bg-white-main/10"
                      : ""
                  } rounded-main hover:bg-white-main/10 ${
                    ocultarSideBar ? "px-0" : "px-5"
                  }`}
                >
                  <Link
                    href={`/aula/${item.ruta}`}
                    onClick={() => setItemActive(item.nombre.toLowerCase())}
                    className={`flex items-center gap-2 ${
                      itemActive === item.nombre.toLowerCase()
                        ? "text-white-main"
                        : "text-white-300"
                    }  ${ocultarSideBar ? "justify-center" : "justify-start"}`}
                  >
                    <span className="text-xl ">{item.icono}</span>
                    <p
                      className={`${
                        ocultarSideBar ? "hidden" : "block"
                      } delay-75`}
                    >
                      {item.nombre}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <button
          type="button"
          className={`px-5 outline-none text-white-main py-3 flex ${
            ocultarSideBar ? "justify-center" : "justify-start"
          } items-center gap-2 transition-all duration-500 group hover:bg-secondary-main rounded-main`}
        >
          <span className="text-xl text-secondary-main group-hover:text-primary-main transition-all">
            <CgLogOut />
          </span>
          <p className={`${ocultarSideBar ? "hidden" : "block"} delay-75`}>
            Cerrar sesión
          </p>
        </button>
      </div>
    </header>
  );
};
