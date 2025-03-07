"use client";
import { useAuth } from "@/context/AuthContext";
import React, { Dispatch, SetStateAction } from "react";
import { GoTriangleDown } from "react-icons/go";
import { MenuProfile } from "../profile/MenuProfile";
import { TbMenu2 } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";
export const HeaderAula = ({
  scrolled,
  setShowMenu,
  showMenu,
}: {
  scrolled: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  showMenu: boolean;
}) => {
  const { user } = useAuth();

  return (
    <div
      className={`w-full z-[1200] top-0 left-0 bg-primary-950 lg:bg-white-main flex items-center justify-between pl-4 lg:pl-10 pr-4 h-20 ${
        scrolled ? "fixed " : "relative shadow"
      }`}
    >
      <div className="w-fit flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          className="w-8 h-8 rounded-full bg-primary-main p-1 flex lg:hidden  items-center justify-center text-secondary-main text-xl"
        >
          {showMenu ? <IoCloseOutline /> : <TbMenu2 />}
        </button>
        <p className="text-base sm:text-xl text-white-main lg:text-black-main">
          Bienvenido! {user?.nombres}
        </p>
      </div>
      <div className="w-fit">
        <button
          type="button"
          className="flex px-2 md:px-4 btn--menuProfile py-3 relative rounded-main items-center gap-1 sm:gap-2 hover:bg-secondary-50"
        >
          <span className="bg-primary-main lg:bg-primary-950 w-8 h-8 sm:w-10 sm:h-10 uppercase text-white-main font-bold rounded-full flex items-center justify-center">
            <p className="text-sm sm:text-base text-white-main ">
              {user?.nombres.slice(0, 1) + "" + user?.apellidos.slice(0, 1)}
            </p>
          </span>
          <p className="hidden sm:block text-sm sm:text-base  lg:text-black-main">
            {user?.nombres + " " + user?.apellidos}
          </p>

          <span className="text-secondary-main lg:text-black-main">
            <GoTriangleDown />
          </span>
          <MenuProfile />
        </button>
      </div>
    </div>
  );
};
