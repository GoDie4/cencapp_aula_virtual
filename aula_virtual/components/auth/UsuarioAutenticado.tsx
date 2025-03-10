import useAuth from "@/hooks/useAuth";
import React from "react";
import { FaUserGraduate, FaUserTie } from "react-icons/fa";
import { MenuProfile } from "../../app/(dashboard)/@components/profile/MenuProfile";

export default function UsuarioAutenticado() {
  const { user } = useAuth();
  return (
    <button
      type="button"
      className={`flex gap-2 bg-primary-main btn--menuProfile  rounded-main px-4 py-3 items-center  relative`}
    >
      <span>
        {user?.rolId === 2 ? (
          <FaUserGraduate className={`text-2xl  text-white-main`} />
        ) : (
          <FaUserTie className={` text-2xl  text-white-main`} />
        )}
      </span>
      <p className="text-white-main">Hola {user?.nombres.split(" ")[0]}</p>

      <MenuProfile />
    </button>
  );
}
