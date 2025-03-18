import { Certificado } from "@/interfaces/CertificadoInterface";
import { TitleAula } from "../../@components/estructura/TitleAula";
import { CertificadosMetadata } from "@/seo/aula/CertificadosMetaData";
import { getServerSideProps } from "@/server/getServerSideProps";
import { ButtonDescargarCertificado } from "./@components/ButtonDescargarCertificado";
export function generateMetadata() {
  const metadata = CertificadosMetadata;
  return metadata;
}
// const certificados = [
//   {
//     id: 1,
//     emitido_en: "2025-03-15",
//     curso: "Introducción a la Programación",
//     profesor: "María González",
//   },
//   {
//     id: 2,
//     emitido_en: "2025-02-10",
//     curso: "React Avanzado",
//     profesor: "Carlos Pérez",
//   },
//   {
//     id: 3,
//     emitido_en: "2025-01-20",
//     curso: "Bases de Datos SQL",
//     profesor: "Ana Martínez",
//   },
// ];

export default async function Page() {
  const data = await getServerSideProps("certificados/mios");

  return (
    <div>
      <TitleAula titulo="Certificados" />
      <div className="w-full">
        <div className="hidden sm:block">
          <table className="w-full divide-y divide-gray-200 min-w-max">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs font-medium text-left uppercase text-black-700">
                  ID
                </th>
                <th className="px-4 py-3 text-xs font-medium text-left uppercase text-black-700">
                  Curso
                </th>
                <th className="px-4 py-3 text-xs font-medium text-left uppercase text-black-700">
                  Emitido el
                </th>

                <th className="px-4 py-3 text-xs font-medium text-left uppercase text-black-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.certificados.map((certificado: Certificado) => (
                <tr key={certificado.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {certificado.id}
                  </td>

                  <td className="px-4 py-4 text-sm whitespace-nowrap text-black-700">
                    {certificado.curso.nombre}
                  </td>
                  <td className="px-4 py-4 text-sm whitespace-nowrap text-black-700">
                    {String(certificado.emitido_en)}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                    <ButtonDescargarCertificado
                      certificado={certificado}
                      className={"text-primary-main hover:text-primary-900"}
                    />
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 sm:hidden">
          {data.certificados.map((certificado: Certificado) => (
            <div
              key={certificado.id}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-gray-900">
                  ID: {certificado.id}
                </p>
              </div>

              <p className="text-sm text-black-700">
                <span className="font-semibold">Curso:</span>{" "}
                {certificado.curso.nombre}
              </p>
              <p className="text-sm text-black-700">
                <span className="font-semibold">Emitido el :</span>{" "}
                {String(certificado.emitido_en)}
              </p>
              <div className="mt-2">
                <ButtonDescargarCertificado
                  certificado={certificado}
                  className="text-sm font-medium text-primary-main hover:text-primary-900"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
