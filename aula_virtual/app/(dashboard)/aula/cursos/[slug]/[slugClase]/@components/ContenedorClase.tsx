"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ReproductorClase } from "./ReproductorClase";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { useAuth } from "@/context/AuthContext";
import { config } from "@/config/config";

export const ContenedorClase = ({ dataClase }: { dataClase: any }) => {
    const porcentajeRaw = dataClase?.clase?.seccion?.curso?.PorcentajeCurso?.[0]?.porcentaje;
    const [porcentaje, setPorcentaje] = useState<number>(Number(porcentajeRaw) || 0);
    useEffect(() => {
        if (dataClase?.clase?.seccion?.curso?.PorcentajeCurso?.length > 0) {
          const porcentajeRaw = dataClase.clase.seccion.curso.PorcentajeCurso[0].porcentaje;
          setPorcentaje(Number(porcentajeRaw) || 0);
        } else {
          setPorcentaje(0); // o dejarlo como está si quieres que sea 0 por defecto
        }
      }, [dataClase]);
console.log("dataclase: ", dataClase)

  const { user } = useAuth();
  return (
    <>
      <div className="w-full rounded-main overflow-hidden">
        <ReproductorClase
          key={dataClase.clase.seccion.id}
          id={dataClase.clase.url_video}
          userId={user?.id ?? ""}
          cursoId={dataClase?.clase?.seccion.cursoId}
          setProgreso={setPorcentaje}
          totalClases={dataClase.totalClases}
          porcentajeGuardado={
            dataClase.clase.seccion.curso.PorcentajeCurso[0]?.porcentaje ?? 0
          }
          posicionClase={dataClase.clase.posicion}
          seccionId={dataClase.clase.seccion.posicion}
          dataClase={dataClase}
        />
      </div>
      <div className="w-full  px-1 md:px-3 py-5 lg:p-5">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-3/5 flex items center gap-3">
            <div className="w-fit">
              <img
                src={`${config.imagesUrl}${dataClase.clase.seccion.curso.imagen}`}
                alt=""
                className="w-16 h-16 rounded-lg overflow-hidden"
              />
            </div>
            <div className="w-fit flex flex-col justify-center">
              <h5 className="font-semibold text-lg text-black-900">
                {dataClase.clase.seccion.nombre}
              </h5>
              <p className="text-black-700 text-sm">
                Por <span>{dataClase.clase.seccion.curso.cursosUsuarios[0].usuario.nombres + " " + dataClase.clase.seccion.curso.cursosUsuarios[0].usuario.apellidos}</span>
              </p>
            </div>
          </div>
          <div className="w-full lg:w-2/5  mt-5 md:mt-0 flex justify-end items-center gap-5">
            <p className="font-medium text-black-500  text-lg ">
              Clase {dataClase.clase.posicion} de {dataClase.totalClases}
            </p>

            {dataClase.ultimaClase && porcentaje >= 90 ? (
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
                    !dataClase.siguienteClase || isNaN(porcentaje) || porcentaje < 90
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
