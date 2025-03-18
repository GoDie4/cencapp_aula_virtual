import React, { Dispatch, SetStateAction} from "react";
import { FiChevronDown } from "react-icons/fi";
import { Curso } from "../@interfaces/FetchMaterialInterface";

export const HeaderMaterial = ({
  curso,
  expandedCourses,
  setExpandedCourses,
}: {
  curso: Curso;
  expandedCourses: Record<string, boolean>;
  setExpandedCourses: Dispatch<SetStateAction<Record<string, boolean>>>;
}) => {
  const toggleCourseExpansion = (cursoId: string): void => {
    setExpandedCourses((prev) => ({
      ...prev,
      [cursoId]: !prev[cursoId],
    }));
  };
  let contadorMateriales = 0;
  curso.curso.Seccion.map((seccion) => {
    seccion.clases.map((clase) => {
      for (let i = 0; i < clase.materiales.length; i++) {
        contadorMateriales++;
      }
    })
  })
  return (
    <div
      className="px-4 py-5 sm:px-6 flex justify-between items-center cursor-pointer hover:bg-gray-50"
      onClick={() => toggleCourseExpansion(curso.id.toString())}
    >
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {curso.curso.nombre}
        </h3>
        {
          curso.curso.cursosUsuarios.map((usuario) => {
            return (<p className="mt-1 max-w-2xl text-sm text-gray-500" key={usuario.usuario.id}>
              Profesor: {usuario.usuario.nombres}
            </p>)
          })}
      </div>
      <div className="flex items-center">
        <span className="bg-primary-100 text-primary-main text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
          {contadorMateriales} materiales
        </span>
        <FiChevronDown
          className={`h-5 w-5 text-gray-500 transform ${expandedCourses[curso.id] ? "rotate-180" : ""
            } transition-transform duration-200`}
        />
      </div>
    </div>
  );
};
