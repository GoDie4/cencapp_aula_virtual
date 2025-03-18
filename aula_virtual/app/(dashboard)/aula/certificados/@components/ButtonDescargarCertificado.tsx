"use client";
import { config } from "@/config/config";
import { Certificado } from "@/interfaces/CertificadoInterface";
import axios from "axios";
import React from "react";

export const ButtonDescargarCertificado = ({
  certificado,
  className,
}: {
  certificado: Certificado;
  className?: string;
}) => {
  const handleClickArchivo = async (): Promise<void> => {
    const token = localStorage.getItem("token");
    try {
      const respuesta = await axios.get(
        `${config.apiUrl}/certificados/descargarCertificadoByAlumno/${
          certificado.id ?? ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${token ?? ""}`,
          },
          withCredentials: true,
          responseType: "blob",
        }
        
      );

      const url = window.URL.createObjectURL(respuesta.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${certificado.nombre}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button
      className={className}
      onClick={() => {
        handleClickArchivo();
      }}
    >
      Descargar certificado
    </button>
  );
};
