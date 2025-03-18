import Tabs, {
  TabContent,
  TabTitle,
} from "../../../../components/navigation/Tabs";
import { TitleAula } from "../../@components/estructura/TitleAula";
import { TareasMetadata } from "@/seo/aula/TareasMetaData";
import { TareasColumna } from "./@components/TareasColumna";
import { getServerSideProps } from "@/server/getServerSideProps";
export function generateMetadata() {
  const metadata = TareasMetadata;
  return metadata;
}
export default async function page() {
  const tareasPendientes = [
    {
      id: "T001",
      nombre: "Levantamiento topográfico en campo",
      curso: "Topografía en obras civiles",
      fechaLimite: "15/03/2025",
      estado: "pendiente",
    },
    {
      id: "T002",
      nombre: "Cálculo de nivelación diferencial",
      curso: "Topografía en obras civiles",
      fechaLimite: "20/03/2025",
      estado: "pendiente",
    },
    {
      id: "T003",
      nombre: "Informe sobre georreferenciación",
      curso: "Topografía en obras civiles",
      fechaLimite: "12/03/2025",
      estado: "pendiente",
    },
  ];

  const tareasTerminadas = [
    {
      id: "T004",
      nombre: "Plano topográfico de un terreno",
      curso: "Topografía en obras civiles",
      fechaFinalizacion: "01/03/2025",
      calificacion: "19/20",
    },
    {
      id: "T005",
      nombre: "Cálculo de coordenadas UTM",
      curso: "Topografía en obras civiles",
      fechaFinalizacion: "28/02/2025",
      calificacion: "18/20",
    },
  ];

    const data = await getServerSideProps("user/yo");
  
  return (
    <div>
      <TitleAula titulo="Mis Tareas" />
      <div className="w-full">
        <Tabs>
          <TabTitle title="Tareas pendientes" className="text-lg" />
          <TabContent>
            <div className="w-full">
              <div className="hidden sm:block">
                <table className="w-full min-w-max divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-black-700 uppercase">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-black-700 uppercase">
                        Nombre
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-black-700 uppercase">
                        Curso
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-black-700 uppercase">
                        Fecha Límite
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-black-700 uppercase">
                        Estado
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-black-700 uppercase">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <TareasColumna data={data}/>
                </table>
              </div>

              <div className="sm:hidden space-y-4">
                {tareasPendientes.map((tarea) => (
                  <div
                    key={tarea.id}
                    className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-bold text-gray-900">
                        ID: {tarea.id}
                      </p>
                      <span className="px-2 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pendiente
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 mt-2">
                      <span className="font-semibold">Nombre:</span>{" "}
                      {tarea.nombre}
                    </p>
                    <p className="text-sm text-black-700">
                      <span className="font-semibold">Curso:</span>{" "}
                      {tarea.curso}
                    </p>
                    <p className="text-sm text-black-700">
                      <span className="font-semibold">Fecha Límite:</span>{" "}
                      {tarea.fechaLimite}
                    </p>
                    <div className="mt-2">
                      <button className="text-primary-main hover:text-primary-900 text-sm font-medium">
                        Comenzar tarea
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabContent>
          <TabTitle title="Tareas terminadas" />
          <TabContent>
            <div className="w-full">
              <div className="hidden sm:block overflow-x-auto rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black-700 uppercase">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black-700 uppercase">
                        Nombre de la Tarea
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black-700 uppercase">
                        Curso
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black-700 uppercase">
                        Fecha Finalización
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black-700 uppercase">
                        Calificación
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black-700 uppercase">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white-main divide-y divide-gray-200">
                    {tareasTerminadas.map((tarea) => (
                      <tr key={tarea.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {tarea.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {tarea.nombre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-700">
                          {tarea.curso}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-700">
                          {tarea.fechaFinalizacion}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {tarea.calificacion}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary-main hover:text-primary-900">
                            Ver Detalles
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="sm:hidden space-y-4">
                {tareasTerminadas.map((tarea) => (
                  <div
                    key={tarea.id}
                    className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-bold text-gray-900">
                        ID: {tarea.id}
                      </p>
                      <span className="px-2 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {tarea.calificacion}
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 mt-2">
                      <span className="font-semibold">Nombre:</span>{" "}
                      {tarea.nombre}
                    </p>
                    <p className="text-sm text-black-700">
                      <span className="font-semibold">Curso:</span>{" "}
                      {tarea.curso}
                    </p>
                    <p className="text-sm text-black-700">
                      <span className="font-semibold">Fecha Finalización:</span>{" "}
                      {tarea.fechaFinalizacion}
                    </p>
                    <div className="mt-2">
                      <button className="text-primary-main hover:text-primary-900 text-sm font-medium">
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
  );
};

