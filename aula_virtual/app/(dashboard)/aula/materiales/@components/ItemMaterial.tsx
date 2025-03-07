import React from "react";
import {
  FaFilePdf,
  FaFileWord,
  FaFilePowerpoint,
  FaFileVideo,
  FaFileArchive,
  FaFileAlt,
} from "react-icons/fa";
import { CursoMaterial } from "../../cursos/@interfaces/InterfacesCurso";
const getIconForMaterialType = (tipo: string) => {
  switch (tipo.toLowerCase()) {
    case "pdf":
      return <FaFilePdf className="text-red-500" size={20} />;
    case "doc":
    case "docx":
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
export const ItemMaterial = ({curso}: {curso: CursoMaterial}) => {
  return (
    <div className="border-t border-gray-200 bg-white-100/30">
      <ul className="divide-y divide-gray-200">
        {curso.materiales.map((material) => (
          <li key={material.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {getIconForMaterialType(material.tipo)}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {material.nombre}
                  </p>
                  <p className="text-xs text-gray-500">
                    Subido el {material.fecha} • {material.tamano}
                  </p>
                </div>
              </div>
              <div>
                <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-primary-main bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Descargar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
