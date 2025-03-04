"use client";
import React from "react";
import { FaUser } from "react-icons/fa";

export default function InicioSesionBoton() {
  return (
    <div className="px-6 py-3 rounded-lg bg-primary-main flex gap-2 items-center">
      <span>
        <FaUser color="white" />
      </span>
      <span className="text-white-main">Iniciar Sesión</span>
    </div>
  );
}
