"use client";
import { useEffect, useState } from "react";
// import { CursoMaterial } from "../../cursos/@interfaces/InterfacesCurso";
import { ItemMaterial } from "./ItemMaterial";
import { HeaderMaterial } from "./HeaderMaterial";
import axios from "axios";
import {
  Curso,
  ResponseFetchMaterial,
} from "../@interfaces/FetchMaterialInterface";
import { config } from "@/config/config";

const Materiales: React.FC = () => {
  const [cursosMaterial, setCursosMaterial] = useState<Curso[]>([]);
  const [expandedCourses, setExpandedCourses] = useState<
    Record<string, boolean>
  >({});
  /*
  const cursos: CursoMaterial[] = [
    {
      id: "C001",
      nombre: "Topografía General",
      profesor: "Logos Perú 1",
      materiales: [
        {
          id: "M001",
          nombre: "Introducción a la Topografía",
          tipo: "pdf",
          fecha: "01/03/2025",
          tamano: "2.1 MB",
        },
        {
          id: "M002",
          nombre: "Instrumentos de medición",
          tipo: "doc",
          fecha: "04/03/2025",
          tamano: "3.5 MB",
        },
        {
          id: "M003",
          nombre: "Uso de estación total",
          tipo: "pdf",
          fecha: "08/03/2025",
          tamano: "20.4 MB",
        },
      ],
    },
    {
      id: "C002",
      nombre: "Geodesia ",
      profesor: "Logos Perú 2",
      materiales: [
        {
          id: "M004",
          nombre: "Conceptos básicos de Geodesia",
          tipo: "pdf",
          fecha: "02/03/2025",
          tamano: "1.9 MB",
        },
        {
          id: "M005",
          nombre: "Elaboración de mapas topográficos",
          tipo: "doc",
          fecha: "06/03/2025",
          tamano: "2.8 MB",
        },
      ],
    },
  ];
  */

  const getMateriales = async () => {
    const response = await axios.get<ResponseFetchMaterial>(
      `${config.apiUrl}/obtenerCursoMaterialesPorAlumno`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      }
    );
    console.log(response.data);
    setCursosMaterial(response.data.cursos);
  };

  useEffect(() => {
    getMateriales();
  }, []);

  return (
    <div className=" bg-secondary-50">
      <main className="py-6 px-2 md:px-4 ">
        <div className="space-y-4">
          {cursosMaterial.map((curso) => (
            <div
              key={curso.id}
              className="bg-white-main shadow rounded-lg overflow-hidden"
            >
              <HeaderMaterial
                curso={curso}
                expandedCourses={expandedCourses}
                setExpandedCourses={setExpandedCourses}
              />

              {expandedCourses[curso.id] && (
                <ItemMaterial seccion={curso.curso.Seccion} />
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Materiales;
