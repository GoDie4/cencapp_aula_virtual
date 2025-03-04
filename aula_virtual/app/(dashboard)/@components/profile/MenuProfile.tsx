import Link from "next/link";
import React from "react";
import { CgLogOut } from "react-icons/cg";
import { FaUser } from "react-icons/fa6";
export const MenuProfile = () => {
  return (
    <div className="absolute top-full menuProfile  bg-white-main w-52 rounded-main right-4 shadow--menuProfile p-4 transition-all duration-500 ease-out">
      <ul className="space-y-4">
        <li className="hover:bg-secondary-main/10 px-4 py-2 rounded-main">
          <Link href={""} className="flex items-center gap-2">
            <span>
              <FaUser className="text-lg text-secondary-main" />
            </span>
            <p>Perfil</p>
          </Link>
        </li>
        <li className="hover:bg-secondary-main/10 px-4 py-2 rounded-main">
          <Link href={""} className="flex items-center gap-2">
            <span>
              <CgLogOut className="text-lg text-secondary-main" />
            </span>
            <p>Cerrar sesión</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};
