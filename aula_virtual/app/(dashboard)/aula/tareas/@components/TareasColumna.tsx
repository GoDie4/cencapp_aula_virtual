'use client'
import React, { useContext } from "react";
import { FaDownload } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { CursosUsuario } from "../../materiales/@interfaces/FetchMaterialInterface";
import { DialogResponsiveContext } from "@/context/DialogResponsive";
import axios from "axios";
import { config } from "@/config/config";
import { parseDate } from "@/logic/parseDate";
import FormRespuestaTarea from "./FormRespuestaTarea";
interface Root {
  examenes: CursosUsuario[];
}
export const TareasColumna = ({ data }: { data: Root }) => {
  const { handleClickOpen } = useContext(DialogResponsiveContext);
  const handleClickArchivo = async (
    id: string,
    nombre: string
  ): Promise<void> => {
    const token = localStorage.getItem("token");
    try {
      const respuesta = await axios.get(
        `${config.apiUrl}/tests/documento/${id ?? ""}`,
        {
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
  function enviarArchivoModal(id: string) {
    handleClickOpen({
      title: "Enviar respuesta",
      content: <FormRespuestaTarea id={id} />,
    });
  }
  console.log(data)
  return (
    <>

      {data.examenes.map((curUs: CursosUsuario) => {
        console.log(curUs);
        if (curUs.curso) {
          if (curUs.curso.Seccion) {
            return curUs.curso.Seccion?.map((seccion) => {
              return seccion.clases?.map((clase) => {
                return clase.test?.map((examen) => {
                  return (
                    <tr key={examen.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {examen.id}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {examen.titulo}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap text-black-700">
                        {clase.nombre}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap text-black-700">
                        {parseDate(examen.fecha_fin)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
                          {examen.estado}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap flex gap-3 items-center">
                        <button
                          title="descargar"
                          onClick={() => {
                            handleClickArchivo(examen.id, examen.titulo);
                          }}
                          className="text-primary-main hover:text-primary-900"
                        >
                          <FaDownload size={23} />
                        </button>
                        <button
                          title="Enviar respuesta"
                          onClick={() => {
                            enviarArchivoModal(examen.id);
                          }}
                          className="text-secondary-500 hover:text-secondary-800"
                        >
                          <LuSend size={23} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              });
            })
          } else {
            return <></>
          }
        } else {
          return <></>
        }
      })}
    </>
  );
};
