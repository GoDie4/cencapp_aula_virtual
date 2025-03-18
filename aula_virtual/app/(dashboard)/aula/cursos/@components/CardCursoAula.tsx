/* eslint-disable @next/next/no-img-element */
import { config } from "@/config/config";
import { Curso } from "@/interfaces/CursoInterface";
import Link from "next/link";
import React from "react";

export const CardCursoAula = ({ curso }: { curso: Curso }) => {
  return (
    <div className="w-full group shadow--cursoAula rounded-main overflow-hidden p-2">
      <div className="w-full flex flex-col xl:flex-row gap-1 sm:gap-4">
        <div className="w-full z-10 xl:w-1/5 relative overflow-hidden  rounded-main">
          <div className="absolute flex items-center justify-center w-full h-full top-full group-hover:top-0 left-0 bg-secondary-main/70 transition-all duration-200">
            <Link
              href={`/aula/cursos/${curso.slug}`}
              className="flex w-fit px-4 py-1 rounded-full bg-white-main text-black-900 transition-all duration-200 hover:bg-primary-main  hover:text-white-main"
            >
              Ingresar
            </Link>
          </div>
          <img
            src={`${config.imagesUrl}${curso.imagen}`}
            alt=""
            className="block w-full h-full object-cover"
          />
        </div>
        <div className="w-full xl:w-4/5 py-2">
          <h5 className="text-xl font-bold text-primary-900 mb-1">
            {curso.nombre}
          </h5>
          <p
            className="text-black-900  mb-4 line-clamp-4 min-h-[80px]"
            dangerouslySetInnerHTML={{
              __html: curso.detalles?.presentacion ?? "",
            }}
          ></p>
          <span className="text-sm w-fit block rounded-full py-1 px-4  bg-secondary-200">
            {curso.categoria?.nombre}
          </span>
        </div>
      </div>
    </div>
  );
};
