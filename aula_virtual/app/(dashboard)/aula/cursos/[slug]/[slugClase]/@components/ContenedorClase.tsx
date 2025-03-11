"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import React, { useState } from "react";
import { ReproductorClase } from "./ReproductorClase";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

export const ContenedorClase = ({ dataClase }: { dataClase: any }) => {
  const [porcentaje, setPorcentaje] = useState<number>(0);
  return (
    <>
      <div className="w-full rounded-main overflow-hidden">
        <ReproductorClase
          id={dataClase.clase.url_video}
          setProgreso={setPorcentaje}
        />
      </div>
      <div className="w-full  px-1 md:px-3 py-5 lg:p-5">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-3/5 flex items center gap-3">
            <div className="w-fit">
              <img
                src="/assets/images/cursos/1.webp"
                alt=""
                className="w-16 h-16 rounded-lg overflow-hidden"
              />
            </div>
            <div className="w-fit flex flex-col justify-center">
              <h5 className="font-semibold text-lg text-black-900">
                {dataClase.clase.seccion.nombre}
              </h5>
              <p className="text-black-700 text-sm">
                Por <span>Logos Perú</span>
              </p>
            </div>
          </div>
          <div className="w-full lg:w-2/5  mt-5 md:mt-0 flex justify-end items-center gap-5">
            <p className="font-medium text-black-500  text-lg ">
              Clase {dataClase.clase.posicion} de {dataClase.totalClases}
            </p>

            {dataClase.ultimaClase && porcentaje >= 90 ?(
              <a
                href=""
                className="flex bg-secondary-main rounded-main px-5 w-fit py-3 text-white-main font-bold text-center"
              >
                Descargar examen
              </a>
            ) : (
              <div className="flex items-center gap-3 flex-shrink-0">
                <Link
                  href={`/aula/cursos/${dataClase.clase.seccion.curso.slug}/${dataClase.anteriorClase?.slug}`}
                  className={`flex p-2 sm:p-3 border-2 text-primary-main rounded-main border-primary-main text-2xl transition-all duration-200 hover:bg-primary-main hover:text-white-main ${
                    !dataClase.anteriorClase
                      ? "pointer-events-none opacity-50"
                      : ""
                  }`}
                >
                  <MdSkipPrevious />
                </Link>
                <Link
                  href={`/aula/cursos/${dataClase.clase.seccion.curso.slug}/${dataClase.siguienteClase?.slug}`}
                  className={`flex p-2 sm:p-3 border-2 text-primary-main  rounded-main border-primary-main text-2xl transition-all duration-200 hover:bg-primary-main hover:text-white-main ${
                    !dataClase.siguienteClase || porcentaje < 90
                      ? "pointer-events-none opacity-50"
                      : ""
                  }`}
                >
                  <MdSkipNext />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
