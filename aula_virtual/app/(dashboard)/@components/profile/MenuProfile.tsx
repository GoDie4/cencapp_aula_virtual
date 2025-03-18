import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React from "react";
import { CgLogOut } from "react-icons/cg";
import { FaUser } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
export const MenuProfile = () => {
  const { cerrarSesion } = useAuth();
  return (
    <div className="absolute z-[999] top-full menuProfile  bg-white-main w-52 rounded-main right-0 shadow--menuProfile p-4 transition-all duration-500 ease-out">
      <ul className="space-y-4">
        <li className="hover:bg-secondary-main/10 px-4 py-2 rounded-main">
          <Link href={"/aula"} className="flex items-center gap-2">
            <span>
              <SiGoogleclassroom className="text-lg text-secondary-main" />
            </span>
            <p className="text-black-900">Aula Virtual</p>
          </Link>
        </li>
        <li className="hover:bg-secondary-main/10 px-4 py-2 rounded-main">
          <Link href={"/aula/perfil"} className="flex items-center gap-2">
            <span>
              <FaUser className="text-lg text-secondary-main" />
            </span>
            <p className="text-black-900">Perfil</p>
          </Link>
        </li>
        <li className="hover:bg-secondary-main/10 px-4 py-2 rounded-main">
          <span
            role="button"
            onClick={() => {
              cerrarSesion();
            }}
            className="flex items-center gap-2"
          >
            <span>
              <CgLogOut className="text-lg text-secondary-main" />
            </span>
            <p className="text-black-900">Cerrar sesión</p>
          </span>
        </li>
      </ul>
    </div>
  );
};
