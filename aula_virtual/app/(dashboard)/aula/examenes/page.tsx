import { NextPage } from "next";

import { TitleAula } from "../../@components/estructura/TitleAula";
import Tabs, {
  TabContent,
  TabTitle,
} from "../../../../components/navigation/Tabs";
import { ExamenesMetadata } from "@/seo/aula/ExamenesMetaData";
import { getServerSideProps } from "@/server/getServerSideProps";
import { CursosUsuario } from "../materiales/@interfaces/FetchMaterialInterface";
import { TestResuelto } from "@/interfaces/TestInterface";
import ExamenColumna from "./@components/ExamenColumna";
import ExamenResueltoColumna from "./@components/ExamenResueltoColumna";
import ExmaneResponsiveColumna from "./@components/ExmaneResponsiveColumna";
import ExamenResueltoResponsiveColumna from "./@components/ExamenResueltoResponsiveColumna";

export function generateMetadata() {
  return ExamenesMetadata();
}

interface Root {
  examenes: CursosUsuario[];
}

interface Root2 {
  testResueltos: TestResuelto[];
}

const Page: NextPage = async () => {
  const data: Root = await getServerSideProps("obtenerExamenesAsignados");
  const dataResueltos: Root2 = await getServerSideProps("examenes/resueltos");

  /*
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
  */
  /*
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
  */
  return (
    <div className="w-full">
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
                      <th className="px-4 py-3 text-xs font-medium text-left uppercase text-black-700">ID</th>
                      <th className="px-4 py-3 text-xs font-medium text-left uppercase text-black-700">Nombre</th>
                      <th className="px-4 py-3 text-xs font-medium text-left uppercase text-black-700">Curso</th>
                      <th className="px-4 py-3 text-xs font-medium text-left uppercase text-black-700">Fecha Límite</th>
                      <th className="px-4 py-3 text-xs font-medium text-left uppercase text-black-700">Estado</th>
                      <th className="px-4 py-3 text-xs font-medium text-left uppercase text-black-700">Acciones</th>
                    </tr>
                  </thead>
                  <ExamenColumna data={data} />
                </table>
              </div>

              <div className="space-y-4 sm:hidden">
                <ExmaneResponsiveColumna data={data} />
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
                      <th className="px-6 py-3 text-xs font-medium text-left uppercase text-black-700">ID</th>
                      <th className="px-6 py-3 text-xs font-medium text-left uppercase text-black-700">Nombre del Examen</th>
                      <th className="px-6 py-3 text-xs font-medium text-left uppercase text-black-700">Curso</th>
                      <th className="px-6 py-3 text-xs font-medium text-left uppercase text-black-700">Fecha Finalización</th>
                      <th className="px-6 py-3 text-xs font-medium text-left uppercase text-black-700">Calificación</th>
                      <th className="px-6 py-3 text-xs font-medium text-left uppercase text-black-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <ExamenResueltoColumna dataResueltos={dataResueltos} />
                  </tbody>
                </table>
              </div>

              <div className="space-y-4 sm:hidden">
                <ExamenResueltoResponsiveColumna dataResueltos={dataResueltos} />
              </div>
            </div>
          </TabContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
