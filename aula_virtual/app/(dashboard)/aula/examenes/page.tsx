import { NextPage } from "next";

import { TitleAula } from "../../@components/estructura/TitleAula";
import Tabs, {
  TabContent,
  TabTitle,
} from "../../../../components/navigation/Tabs";
import { ExamenesMetadata } from "@/seo/aula/ExamenesMetaData";

export function generateMetadata() {
  const metadata = ExamenesMetadata();
  return metadata;
}


const Page: NextPage = () => {
  const examenesPendientes = [
    {
      id: "EX001",
      nombre: "Parcial de Topografía",
      curso: "Topografía en obras civiles",
      fechaLimite: "15/03/2025",
      estado: "pendiente",
    },
    {
      id: "EX002",
      nombre: "Parcial de Topografía",
      curso: "Topografía en obras civiles",
      fechaLimite: "20/03/2025",
      estado: "pendiente",
    },
    {
      id: "EX003",
      nombre: "Parcial de Topografía",
      curso: "Topografía en obras civiles",
      fechaLimite: "12/03/2025",
      estado: "pendiente",
    },
  ];

  const examenesTerminados = [
    {
      id: "EX004",
      nombre: "Examen de Topografía",
      curso: "Topografía en obras civiles",
      fechaFinalizacion: "01/03/2025",
      calificacion: "19/20",
    },
    {
      id: "EX005",
      nombre: "Examen de Topografía",
      curso: "Topografía en obras civiles",
      fechaFinalizacion: "28/02/2025",
      calificacion: "18/20",
    },
  ];
  return (
    <>
      <div className="w-full ">
        <TitleAula titulo="Mis Exámenes" />

        <div className="w-full">
          <Tabs>
            <TabTitle title="Exámenes pendientes" className="text-lg" />
            <TabContent>
              <div className="w-full">
                <div className="hidden sm:block">
                  <table className="w-full divide-y divide-gray-200 min-w-max">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-xs font-medium text-left uppercase text-black-700">
                          ID
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-left uppercase text-black-700">
                          Nombre
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-left uppercase text-black-700">
                          Curso
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-left uppercase text-black-700">
                          Fecha Límite
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-left uppercase text-black-700">
                          Estado
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-left uppercase text-black-700">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {examenesPendientes.map((examen) => (
                        <tr key={examen.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {examen.id}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                            {examen.nombre}
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap text-black-700">
                            {examen.curso}
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap text-black-700">
                            {examen.fechaLimite}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
                              Pendiente
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                            <button className="text-primary-main hover:text-primary-900">
                              Dar examen
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-4 sm:hidden">
                  {examenesPendientes.map((examen) => (
                    <div
                      key={examen.id}
                      className="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-gray-900">
                          ID: {examen.id}
                        </p>
                        <span className="px-2 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                          Pendiente
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-900">
                        <span className="font-semibold">Nombre:</span>{" "}
                        {examen.nombre}
                      </p>
                      <p className="text-sm text-black-700">
                        <span className="font-semibold">Curso:</span>{" "}
                        {examen.curso}
                      </p>
                      <p className="text-sm text-black-700">
                        <span className="font-semibold">Fecha Límite:</span>{" "}
                        {examen.fechaLimite}
                      </p>
                      <div className="mt-2">
                        <button className="text-sm font-medium text-primary-main hover:text-primary-900">
                          Dar examen
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabContent>
            <TabTitle title="Exámenes terminados" />
            <TabContent>
              <div className="w-full">
                <div className="hidden overflow-x-auto rounded-lg shadow sm:block">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium text-left uppercase text-black-700">
                          ID
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-left uppercase text-black-700">
                          Nombre del Examen
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-left uppercase text-black-700">
                          Curso
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-left uppercase text-black-700">
                          Fecha Finalización
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-left uppercase text-black-700">
                          Calificación
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-left uppercase text-black-700">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {examenesTerminados.map((examen) => (
                        <tr key={examen.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {examen.id}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                            {examen.nombre}
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap text-black-700">
                            {examen.curso}
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap text-black-700">
                            {examen.fechaFinalizacion}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                              {examen.calificacion}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            <button className="text-primary-main hover:text-primary-900">
                              Ver Detalles
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-4 sm:hidden">
                  {examenesTerminados.map((examen) => (
                    <div
                      key={examen.id}
                      className="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-gray-900">
                          ID: {examen.id}
                        </p>
                        <span className="px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                          {examen.calificacion}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-900">
                        <span className="font-semibold">Nombre:</span>{" "}
                        {examen.nombre}
                      </p>
                      <p className="text-sm text-black-700">
                        <span className="font-semibold">Curso:</span>{" "}
                        {examen.curso}
                      </p>
                      <p className="text-sm text-black-700">
                        <span className="font-semibold">
                          Fecha Finalización:
                        </span>{" "}
                        {examen.fechaFinalizacion}
                      </p>
                      <div className="mt-2">
                        <button className="text-sm font-medium text-primary-main hover:text-primary-900">
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Page;
