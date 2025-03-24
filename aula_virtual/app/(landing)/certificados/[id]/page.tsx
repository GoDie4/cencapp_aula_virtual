import { getServerSideProps } from "@/server/getServerSideProps";
import { TitleAula } from "../../../(dashboard)/@components/estructura/TitleAula";
import Banner from "../../../../components/public/Banner";
import { slide2 } from "../../../../components/shared/images";
import { Certificado } from "@/interfaces/CertificadoInterface";
import { ButtonDescargarCertificado } from "../../../(dashboard)/aula/certificados/@components/ButtonDescargarCertificado";
import { ContentMain } from "../../../../components/public/estructura/ContentMain";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const data = await getServerSideProps(`certificados/certificadosByUser/${id}`);

  return (
    <>
      <Banner imagen={`${slide2.src}`} titulo="Certificados" />
      <div>
        <ContentMain className="py-20">
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
                {data.certificados && data.certificados.length > 0 ? (
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
                            className={
                              "text-primary-main hover:text-primary-900"
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody className="text-center">
                    <tr>
                      <td colSpan={4}>No se encontraron certificados</td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>

            {data.certificados && data.certificados.length > 0 ? (
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
            ) : (
              <p className="space-y-4 sm:hidden text-center">
                No se encontraron certificados
              </p>
            )}
          </div>
        </ContentMain>
      </div>
    </>
  );
}
