import React, { Dispatch, SetStateAction } from "react";
import { CursoMaterial } from "../../cursos/@interfaces/InterfacesCurso";
import { FiChevronDown } from "react-icons/fi";

export const HeaderMaterial = ({
  curso,
  expandedCourses,
  setExpandedCourses,
}: {
  curso: CursoMaterial;
  expandedCourses: Record<string, boolean>;
  setExpandedCourses: Dispatch<SetStateAction<Record<string, boolean>>>;
}) => {
  const toggleCourseExpansion = (cursoId: string): void => {
    setExpandedCourses((prev) => ({
      ...prev,
      [cursoId]: !prev[cursoId],
    }));
  };
  return (
    <div
      className="px-4 py-5 sm:px-6 flex justify-between items-center cursor-pointer hover:bg-gray-50"
      onClick={() => toggleCourseExpansion(curso.id)}
    >
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {curso.nombre}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Profesor: {curso.profesor}
        </p>
      </div>
      <div className="flex items-center">
        <span className="bg-primary-100 text-primary-main text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
          {curso.materiales.length} materiales
        </span>
        <FiChevronDown
          className={`h-5 w-5 text-gray-500 transform ${
            expandedCourses[curso.id] ? "rotate-180" : ""
          } transition-transform duration-200`}
        />
      </div>
    </div>
  );
};
