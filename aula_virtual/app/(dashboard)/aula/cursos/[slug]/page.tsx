/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { ProgressCurso } from "../@components/ProgressCurso";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../../public/components/shadcdn/Accordion";
import { getServerSideProps } from "@/server/getServerSideProps";
import { Clase, Seccion } from "../@interfaces/InterfacesCurso";
import { config } from "@/config/config";

import { IoCheckmark } from "react-icons/io5";

// export const clases = [
//   {
//     id: "item-1",
//     title: "Introducción a la Topografía",
//     content: [
//       {
//         topic: "¿Qué es la topografía y su importancia en la construcción?",
//         duration: 20,
//       },
//       { topic: "Aplicaciones en obras civiles.", duration: 20 },
//       { topic: "Instrumentos topográficos básicos.", duration: 20 },
//     ],
//   },
//   {
//     id: "item-2",
//     title: "Principios y Fundamentos de la Topografía",
//     content: [
//       {
//         topic: "Conceptos básicos: nivelación, planimetría y altimetría.",
//         duration: 30,
//       },
//       { topic: "Sistemas de coordenadas y proyecciones.", duration: 30 },
//       { topic: "Interpretación de planos topográficos.", duration: 30 },
//     ],
//   },
//   {
//     id: "item-3",
//     title: "Equipos y Herramientas Topográficas",
//     content: [
//       { topic: "Uso del nivel óptico y electrónico.", duration: 25 },
//       { topic: "Estaciones totales y su funcionamiento.", duration: 25 },
//       { topic: "GPS y tecnología satelital en topografía.", duration: 25 },
//     ],
//   },
//   {
//     id: "item-4",
//     title: "Métodos de Levantamiento Topográfico",
//     content: [
//       { topic: "Levantamientos planimétricos y altimétricos.", duration: 40 },
//       { topic: "Uso de taquimetría en la topografía.", duration: 40 },
//       { topic: "Levantamientos con drones y escaneo láser.", duration: 40 },
//     ],
//   },
//   {
//     id: "item-5",
//     title: "Nivelación y Cálculo de Cotas",
//     content: [
//       {
//         topic: "Métodos de nivelación: geométrica y trigonométrica.",
//         duration: 30,
//       },
//       { topic: "Cálculo de diferencias de altura y pendientes.", duration: 30 },
//       { topic: "Curvas de nivel y su representación en planos.", duration: 30 },
//     ],
//   },
//   {
//     id: "item-6",
//     title: "Replanteo en Obras Civiles",
//     content: [
//       {
//         topic: "Métodos de replanteo en carreteras y edificaciones.",
//         duration: 30,
//       },
//       { topic: "Uso de coordenadas y sistemas de referencia.", duration: 25 },
//       { topic: "Errores comunes y cómo corregirlos.", duration: 25 },
//     ],
//   },
//   {
//     id: "item-7",
//     title: "Cálculo de Volúmenes y Movimientos de Tierra",
//     content: [
//       {
//         topic: "Métodos de cálculo de volumen de excavación y relleno.",
//         duration: 35,
//       },
//       { topic: "Aplicaciones en obras de infraestructura.", duration: 35 },
//       { topic: "Software para el cálculo topográfico.", duration: 40 },
//     ],
//   },
//   {
//     id: "item-8",
//     title: "Control y Supervisión Topográfica en Obras",
//     content: [
//       {
//         topic: "Monitoreo y control de deformaciones en estructuras.",
//         duration: 30,
//       },
//       { topic: "Uso de instrumentación avanzada.", duration: 35 },
//       { topic: "Seguridad en trabajos topográficos.", duration: 35 },
//     ],
//   },
//   {
//     id: "item-9",
//     title: "Aplicaciones Tecnológicas en Topografía",
//     content: [
//       {
//         topic: "Uso de BIM (Building Information Modeling) en topografía.",
//         duration: 40,
//       },
//       {
//         topic: "Integración de SIG (Sistemas de Información Geográfica).",
//         duration: 40,
//       },
//       {
//         topic:
//           "Software especializado en topografía (AutoCAD Civil 3D, TopoCal, etc.).",
//         duration: 40,
//       },
//     ],
//   },
//   {
//     id: "item-10",
//     title: "Proyecto Final y Evaluación",
//     content: [
//       {
//         topic: "Aplicación de conocimientos en un caso práctico.",
//         duration: 60,
//       },
//       { topic: "Levantamiento y replanteo de una obra real.", duration: 60 },
//       { topic: "Presentación de informes topográficos.", duration: 60 },
//     ],
//   },
// ];

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const dataCurso = await getServerSideProps(`cursoPorSlug/${slug}`);

  if (!dataCurso) {
    return <p>No tienes acceso a este curso</p>;
  }
  const clasesPlanas = dataCurso?.Seccion
    ? dataCurso.Seccion.sort(
        (a: any, b: any) => a.posicion - b.posicion
      ).flatMap((seccion: Seccion) => seccion?.clases)
    : [];

  const seccionConPosicionUno = dataCurso?.Seccion?.find(
    (sec: Seccion) => sec.posicion === 1
  );
  const primeraClase = seccionConPosicionUno?.clases?.[0];
  return (
    <>
      <div className="w-full p-3 md:p-5 space-y-16">
        <div className="w-full flex flex-col xl:flex-row gap-10">
          <div className="w-full xl:w-3/5">
            <Link
              href={"/aula/cursos"}
              className="flex mb-3 items-center gap-1 text-primary-main"
            >
              <FaLongArrowAltLeft /> Regresar a mis cursos
            </Link>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black-900">
              {dataCurso?.nombre}
            </h2>
            <p className="mt-6 text-lg ">Por Logos Perú</p>
            <div className="w-full space-y-5 my-5 text-black-900 line-clamp-5">
              <p
                dangerouslySetInnerHTML={{
                  __html: dataCurso?.detalles.presentacion ?? "",
                }}
              ></p>
            </div>
            <div className="w-fit my-8 flex items-center gap-3">
              <span className="text-secondary-main text-2xl">
                <IoPlay />
              </span>
              {dataCurso?.PorcentajeCurso[0]?.porcentaje && dataCurso.PorcentajeCurso[0].porcentaje > 0 ? (
                <>
                  {dataCurso?.PorcentajeCurso[0]?.ultimaClase.clase} -{" "}
                  {dataCurso?.PorcentajeCurso[0]?.ultimaClase.seccion}
                </>
              ) : (
                <p className="text-lg underline text-primary-main line-clamp-1">
                  {dataCurso?.Seccion[0]?.clases[0].nombre} -{" "}
                  {dataCurso?.Seccion[0]?.nombre}
                </p>
              )}
            </div>
            <div className="w-fit">
              {dataCurso?.PorcentajeCurso[0]?.porcentaje > 0 &&
                dataCurso?.PorcentajeCurso[0]?.porcentaje < 99 && (
                  <Link
                    href={`/aula/cursos/${dataCurso.slug}/${dataCurso?.PorcentajeCurso[0]?.ultimaClase.slugClase}`}
                    className="bg-secondary-main hover:bg-secondary-700 transition-all duration-300 ease-out  rounded-main text-lg text-white-main font-bold px-5 py-3 flex w-fit items-center"
                  >
                    Continuar curso
                  </Link>
                )}

              {dataCurso?.PorcentajeCurso[0]?.porcentaje > 99 && (
                <Link
                  href={`/aula/cursos/${dataCurso.slug}/${dataCurso?.Seccion[0]?.clases[0].slug}`}
                  className="bg-secondary-400 hover:bg-secondary-500 transition-all duration-300 ease-out  rounded-main text-lg text-black-900 font-bold px-5 py-3 flex w-fit items-center"
                >
                  Dar examen
                </Link>
              )}
              {(dataCurso?.PorcentajeCurso[0]?.porcentaje === 0 ||
                !dataCurso.PorcentajeCurso[0]?.porcentaje) && (
                <Link
                  href={`/aula/cursos/${dataCurso.slug}/${primeraClase.slug}`}
                  className="bg-secondary-main hover:bg-secondary-700 transition-all duration-300 ease-out  rounded-main text-lg text-white-main font-bold px-5 py-3 flex w-fit items-center"
                >
                  Empezar curso
                </Link>
              )}
            </div>
          </div>
          <div className="w-full xl:w-2/5 pt-12">
            <div className="flex  flex-col-reverse lg:flex-col">
              <div className="w-fit mt-3 md:mt-0   md:mb-3">
                <img
                  src={`${config.imagesUrl}${dataCurso?.imagen}`}
                  alt=""
                  className="block rounded-main h-[345px] object-cover"
                />
              </div>
              <div className="w-full">
                <ProgressCurso
                  progreso={dataCurso.PorcentajeCurso[0]?.porcentaje}
                  version2
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-8 ">
          <div className="w-full">
            <h3 className="text-2xl text-primary-main mb-6">
              Contenidos de clases
            </h3>

            <Accordion type="single" collapsible className="w-full">
              {dataCurso?.Seccion.map((seccion: Seccion) => (
                <AccordionItem key={seccion.id} value={seccion.id}>
                  <AccordionTrigger className="bg-primary-900 justify-end mb-0.5 px-4 flex-row-reverse py-3 text-white-main rounded-t-main text-lg w-full">
                    {seccion.nombre}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 py-3 px-5 pl-8 text-base">
                      {seccion?.clases.map((item: Clase) => {
                        const totalClases = clasesPlanas.length;
                        const indexGlobal = clasesPlanas.findIndex(
                          (c: any) => c.id === item.id
                        );
                        const porcentajePorClase = 100 / totalClases;

                        const claseVista =
                          dataCurso.PorcentajeCurso[0]?.porcentaje >=
                          Math.floor(porcentajePorClase * (indexGlobal + 1));

                        return (
                          <li key={item.id} className="flex justify-between">
                            <p className="flex items-center gap-1">
                              {claseVista && (
                                <span className="flex-shrink-0 text-lg text-green-500">
                                  <IoCheckmark />
                                </span>
                              )}
                              <span>{item.nombre}</span>
                            </p>
                            <span className="text-sm text-gray-500">
                              {item.duracion}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
