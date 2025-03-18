"use client";
import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";

export default function InicioSesionBoton() {
  return (
    <Link
      href="/login"
      className="px-4 py-3 bg-primary-main rounded-main text-white-main flex gap-2 items-center"
    >
      <span>
        <FaUser className={`text-2xl  text-white-main`} />
      </span>
      <span>Iniciar Sesión</span>
    </Link>
  );
}
