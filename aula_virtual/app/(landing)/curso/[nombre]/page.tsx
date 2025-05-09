/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  FiInfo,
  FiTarget,
  FiSettings,
  FiAward,
  FiDollarSign,
} from "react-icons/fi";
import Banner from "../../../../components/public/Banner";
import { BsWhatsapp } from "react-icons/bs";
import * as React from "react";

import { RenderTemarioItem } from "../@components/TemarioItem";

import { Curso } from "@/interfaces/CursoInterface";
import axios from "axios";
import { config } from "@/config/config";
import { revertUrl } from "@/logic/formateador";
import { SeoCurso } from "@/seo/SeoCurso";

export async function generateMetadata({ params }: { params: any }) {
  const metadata = await SeoCurso({ params });
  return metadata;
}

async function getCurso(nombre: string): Promise<Curso> {
  const response = await axios.get(`${config.apiUrl}/cursosBuscar/${nombre}`);
  return response.data;
}

const ViewCurso = async ({
  params,
}: {
  params: Promise<{ nombre: string }>;
}): Promise<React.JSX.Element> => {
  const nombre = (await params).nombre;
  const curso: Curso = await getCurso(revertUrl(nombre));

  console.log("curso: ", curso);

  if (!curso) {
    return <div>Curso no encontrado</div>;
  }

//   const renderIcon = (icono: any): any => {
//     switch (icono) {
//       case "video":
//         return <FiVideo className="benefit-icon" />;
//       case "award":
//         return <FiAward className="benefit-icon" />;
//       case "message":
//         return <FiMessageCircle className="benefit-icon" />;
//       case "clock":
//         return <FiClock className="benefit-icon" />;
//       case "clipboard":
//         return <FiClipboard className="benefit-icon" />;
//       case "tool":
//         return <FiTool className="benefit-icon" />;
//       // Agregar más casos según los íconos necesarios
//       default:
//         return null;
//     }
//   };

  return (
    <>
      <Banner
        titulo={curso.nombre}
        imagen={`${config.imagesUrl}${curso.banner ?? ""}`}
      />

      <div className="px-5 py-20 lg:px-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-black-900">
                <FiInfo className="text-xl text-secondary-main" />
                Presentación del curso
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: curso?.detalles?.presentacion ?? "",
                }}
              ></p>
            </section>

            {curso?.detalles?.dirigido && (
              <section className="space-y-4">
                <h2 className="flex items-center gap-2 text-2xl font-semibold text-black-900">
                  <FiSettings className="text-xl text-secondary-main" />
                  Dirigido a
                </h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: curso.detalles?.dirigido ?? "",
                  }}
                ></p>
              </section>
            )}

            {curso?.detalles?.objetivo && (
              <section className="space-y-4">
                <h2 className="flex items-center gap-2 text-2xl font-semibold text-black-900">
                  <FiTarget className="text-xl text-secondary-main" />
                  Objetivo
                </h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: curso.detalles?.objetivo ?? "",
                  }}
                ></p>
              </section>
            )}

            {curso?.detalles?.metodologia && (
              <section className="space-y-4">
                <h2 className="flex items-center gap-2 text-2xl font-semibold text-black-900">
                  <FiSettings className="text-xl text-secondary-main" />
                  Metodología
                </h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: curso.detalles?.metodologia ?? "",
                  }}
                ></p>
              </section>
            )}

            {curso?.detalles?.certificacion && (
              <section className="space-y-4">
                <h2 className="flex items-center gap-2 text-2xl font-semibold text-black-900">
                  <FiAward className="text-xl text-secondary-main" />
                  Certificación
                </h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: curso.detalles?.certificacion ?? "",
                  }}
                ></p>
              </section>
            )}

            {/* Comentarios de secciones temario omitidas */}
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-semibold">Beneficios</h2>
            {curso?.beneficios && (
              <section className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {curso.beneficios.map((beneficio, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center p-4 rounded-lg shadow-lg"
                    >
                      <img
                        src={`${config.imagesUrl}${beneficio.icono ?? ""}`}
                       // src="https://api.cencapperu.com/public/beneficios/iconos/icono-1746032087570-620464914.png"
                        alt=""
                        className="h-[350px]"
                      />
                      <p className="mt-4 text-center">{beneficio.texto}</p>
                    </div>
                  ))}
                  {/* Comentarios de beneficios omitidos */}
                </div>
              </section>
            )}

            <section className="py-5 space-y-4 shadow-md rounded-main">
              <h2 className="flex items-center justify-center gap-2 text-2xl font-semibold text-center md:text-3xl lg:text-4xl text-primary-main">
                <FiDollarSign className="text-xl" />
                Inversión
              </h2>
              {curso?.dolar ? (
                <div className="text-lg text-center md:text-xl lg:text-2xl">
                  S/ {curso.precio}.00 Soles ó {curso.dolar}.00 Dólares
                </div>
              ) : (
                <div className="text-lg text-center md:text-xl lg:text-2xl">
                  S/ {curso.precio}.00 Soles
                </div>
              )}

              {curso?.descuento && (
                <div className="space-y-2">
                  <span className="font-semibold">Descuentos CENCAPP</span>
                  <p>
                    Pago al contado por grupo de 3 personas: <br /> 80 soles ó
                    25 dólares.
                  </p>
                </div>
              )}
            </section>

            {/* Comentarios de sección formas de pago omitida */}

            <div className="mt-8">
              <a
                href="https://wa.me//+51947172367"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 text-xl font-medium text-center bg-green-500 md:text-2xl rounded-main hover:bg-green-600 text-white-main"
              >
                <BsWhatsapp />
                Más información
              </a>
            </div>
          </div>
        </div>
      </div>
      <RenderTemarioItem curso={curso} />
      {/*curso.temario && (
        <section className="temario2">
          {curso.temario.map((sesion: any, index: number) => (
            <TemarioItem
              key={index}
              sesion={sesion.titulo}
              expanded={expanded === `panel${index + 1}`}
              handleChange={handleChange(`panel${index + 1}`)}
              detalles={sesion.detalles}
            />
          ))}
        </section>
      )*/}
    </>
  );
};

export default ViewCurso;
