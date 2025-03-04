import { useAuth } from "@/context/AuthContext";
import React from "react";
import { GoTriangleDown } from "react-icons/go";
import { MenuProfile } from "../profile/MenuProfile";
export const HeaderAula = () => {
  const { user } = useAuth();
  return (
    <div className="bg-white-main flex items-center justify-between relative  pl-10 pr-4 h-20">
      <div className="w-fit">
        <p className="text-xl ">Bienvenido! {user?.nombres}</p>
      </div>
      <div className="w-fit">
        <button
          type="button"
          className="flex px-4 btn--menuProfile py-3 relative rounded-main items-center gap-2 hover:bg-secondary-50"
        >
          <span className="bg-primary-950 w-10 h-10 uppercase text-white-main font-bold rounded-full flex items-center justify-center">
            <p>
              {user?.nombres.slice(0, 1) + "" + user?.apellidos.slice(0, 1)}
            </p>
          </span>
          <p>{user?.nombres + " " + user?.apellidos}</p>
          <span>
            <GoTriangleDown />
          </span>
          <MenuProfile />
        </button>
      </div>
    </div>
  );
};
