import React from "react";
import { FormRecuperarContrasena } from "./FormRecuperarContrasena";

export const RecuperarContrasena = () => {
  return (
    <div>
      <div className="w-full">
        <h2 className="text-2xl md:text-3xl text-primary-main font-bold text-center mb-8">
          Ingresa tu correo
        </h2>
        <FormRecuperarContrasena />
      </div>
    </div>
  );
};
