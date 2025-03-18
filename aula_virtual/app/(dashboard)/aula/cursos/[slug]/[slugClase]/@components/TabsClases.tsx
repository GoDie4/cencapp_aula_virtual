"use client";
import React, { useState } from "react";
import Tabs, {
  TabContent,
  TabTitle,
} from "../../../../../../../components/navigation/Tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../../../../public/components/shadcdn/Accordion";
import { Clase, Seccion } from "../../../@interfaces/InterfacesCurso";
import axios from "axios";
import { config } from "@/config/config";
import {
  FaFilePdf,
  FaFileWord,
  FaFilePowerpoint,
  FaFileVideo,
  FaFileArchive,
  FaFileAlt,
} from "react-icons/fa";
import { formatearFechaParaInputDate } from "../../../../materiales/@logic/parseDate";
import { convertirBytesAMb } from "../../../../materiales/@logic/parseToMb";
import { MaterialDataBase } from "@/interfaces/MaterialInterface";
export const TabsClases = ({ dataClase }: { dataClase: Clase }) => {
  const [clases, setClases] = useState<Clase[]>([]);

  const traerClases = async () => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/clasesPorCurso/${dataClase.seccion.cursoId}`
      );

      setClases(response.data.clases);

      console.log(response.data.clases);
    } catch (error) {
      console.log(error);
    }
  };

  const getIconForMaterialType = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case "application/pdf":
        return <FaFilePdf className="text-red-500" size={20} />;
      case "doc":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return <FaFileWord className="text-blue-500" size={20} />;
      case "ppt":
      case "pptx":
        return <FaFilePowerpoint className="text-orange-500" size={20} />;
      case "video":
        return <FaFileVideo className="text-purple-500" size={20} />;
      case "zip":
        return <FaFileArchive className="text-yellow-500" size={20} />;
      default:
        return <FaFileAlt className="text-gray-500" size={20} />;
    }
  };

  const handleClickArchivo = async (
    id: number,
    nombre: string
  ): Promise<void> => {
    const token = localStorage.getItem("token");
    try {
      const respuesta = await axios.get(
        `${config.apiUrl}/materiales/descargaAlumno/${id ?? ""}/${
          dataClase.id
        }`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token ?? ""}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(respuesta.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${nombre}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full">
      <Tabs>
        <TabTitle title="Materiales" className="text-lg md:text-xl " />
        <TabContent>
          <ul className="divide-y divide-gray-200">
            {dataClase.materiales.length > 0 ? (
              dataClase.materiales.map((material: MaterialDataBase) => {
                return (
                  <li
                    key={material.id}
                    className="px-4 py-4 sm:px-6 hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getIconForMaterialType(material.mime_type)}
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {material.nombre}
                          </p>
                          <p className="text-xs text-gray-500">
                            Subido el{" "}
                            {formatearFechaParaInputDate(
                              String(material.createdAt)
                            )}{" "}
                            •{convertirBytesAMb(material.size)}
                          </p>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() =>
                            handleClickArchivo(material.id, material.nombre)
                          }
                          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-primary-main bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Descargar
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              <p>Esta clase no cuenta con materiales</p>
            )}
          </ul>
        </TabContent>

        <TabTitle
          title="Clases"
          className=" text-lg md:text-xl "
          onClick={() => {
            traerClases();
          }}
        />
        <TabContent>
          <Accordion type="single" collapsible className="w-full">
            {clases[0]?.Seccion.map((seccion: Seccion) => (
              <AccordionItem key={seccion.id} value={seccion.id}>
                <AccordionTrigger
                  className={`bg-primary-900 justify-end mb-0.5 px-4 flex-row-reverse py-3 text-white-main rounded-t-main text-lg w-full ${
                    seccion.id === dataClase.seccionId
                      ? "opacity-100"
                      : "opacity-80"
                  }`}
                >
                  {seccion.nombre}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc  space-y-2 py-3 px-5 pl-8  text-base">
                    {seccion.clases.map((item: Clase, index) => (
                      <li key={index} className="flex justify-between">
                        <span
                          className={`${
                            item.id === dataClase.id ? "text-primary-main" : ""
                          }`}
                        >
                          {item.nombre}
                        </span>
                        <span className="text-sm text-gray-500">
                          {item.duracion}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabContent>
      </Tabs>
    </div>
  );
};
