/* eslint-disable @next/next/no-img-element */
"use client";
import {
  FaBuilding,
  FaCity,
  FaTint,
  FaProjectDiagram,
  FaHardHat,
  FaMapMarkerAlt,
} from "react-icons/fa";
import area1 from "../../../assets/areas/1.webp";
import area2 from "../../../assets/areas/2.webp";
import area3 from "../../../assets/areas/3.webp";
import area4 from "../../../assets/areas/4.webp";
import area5 from "../../../assets/areas/5.webp";
import area6 from "../../../assets/areas/6.webp";
import area7 from "../../../assets/areas/7.webp";
import area8 from "../../../assets/areas/8.webp";
import { GiMining, GiRoad } from "react-icons/gi"; // Para Geotecnia
import Banner from "../../../components/public/Banner";
import { slide2 } from "../../../components/shared/images";
import { JSX, useEffect } from "react";
import Link from "next/link";
import { ContentMain } from "../../../components/public/estructura/ContentMain";

const Capacitacion = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  function eliminarTildes(texto: string): string {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  function formatearURL(nombre: string): string {
    // Eliminar espacios al principio y al final del nombre
    let url = nombre.trim();

    // Convertir todo el string a minúsculas
    url = url.toLowerCase();

    // Reemplazar los espacios por guiones
    url = url.replace(/ /g, "");

    // Eliminar tildes
    url = eliminarTildes(url);

    // Reemplazar caracteres especiales por sus equivalentes URL seguros
    url = url.replace(/[^a-zA-Z0-9-]/g, "");

    // Retornar la URL formateada
    return url;
  }
  return (
    <>
      <Banner titulo="Capacitaciones" imagen={`${slide2.src}`} />
      <section>
        <ContentMain className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group">
              <Link
                href={`/cursos/${formatearURL("estructuras")}`}
                className="block"
              >
                <div className="relative overflow-hidden flex items-center justify-center rounded-lg shadow-md transition-transform duration-300">
                  <img
                    src={area1.src}
                    alt=""
                    className="w-full h-[350px] object-cover group-hover:scale-125 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 m-auto rounded-xl w-[200px] h-[180px] group-hover:w-full group-hover:h-full flex items-center justify-center px-8 py-10 bg-black-main bg-opacity-70 transition-all duration-300">
                    <div className="text-white text-center">
                      <span className="text-3xl mx-auto w-fit h-fit rounded-full p-4 mb-2 flex justify-center text-secondary-main bg-transparent group-hover:bg-white-main">
                        <FaBuilding />
                      </span>
                      <h5 className="text-lg text-white-main">Estructuras</h5>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            {/* Infraestructura en edificaciones */}
            <div className="group">
              <div className="relative overflow-hidden flex items-center justify-center rounded-lg shadow-md transition-transform duration-300">
                <img
                  src={area2.src}
                  alt=""
                  className="w-full h-[350px] object-cover group-hover:scale-125 transition-transform duration-300"
                />
                <div className="absolute inset-0 m-auto rounded-xl w-[200px] h-[180px] group-hover:w-full group-hover:h-full flex items-center justify-center px-8 py-10 bg-black-main bg-opacity-70 transition-all duration-300">
                  <div className="text-white text-center">
                    <span className="text-3xl mx-auto w-fit h-fit rounded-full p-4 mb-2 flex justify-center text-secondary-main bg-transparent group-hover:bg-white-main">
                      <FaCity />
                    </span>
                    <h5 className="text-lg text-white-main">
                      Infraestructura en edificaciones
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            {/* Infraestructura en Obras Viales */}
            <div className="group">
              <div className="relative overflow-hidden flex items-center justify-center rounded-lg shadow-md transition-transform duration-300">
                <img
                  src={area3.src}
                  alt=""
                  className="w-full h-[350px] object-cover group-hover:scale-125 transition-transform duration-300"
                />
                <div className="absolute inset-0 m-auto rounded-xl w-[200px] h-[180px] group-hover:w-full group-hover:h-full flex items-center justify-center px-8 py-10 bg-black-main bg-opacity-70 transition-all duration-300">
                  <div className="text-white text-center">
                    <span className="text-3xl mx-auto w-fit h-fit rounded-full p-4 mb-2 flex justify-center text-secondary-main bg-transparent group-hover:bg-white-main">
                      <GiRoad />
                    </span>
                    <h5 className="text-lg text-white-main">
                      Infraestructura en Obras Viales
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            {/* Infraestructura de Obras de Saneamiento */}
            <div className="group">
              <div className="relative overflow-hidden flex items-center justify-center rounded-lg shadow-md transition-transform duration-300">
                <img
                  src={area4.src}
                  alt=""
                  className="w-full h-[350px] object-cover group-hover:scale-125 transition-transform duration-300"
                />
                <div className="absolute inset-0 m-auto rounded-xl w-[200px] h-[180px] group-hover:w-full group-hover:h-full flex items-center justify-center px-8 py-10 bg-black-main bg-opacity-70 transition-all duration-300">
                  <div className="text-white text-center">
                    <span className="text-3xl mx-auto w-fit h-fit rounded-full p-4 mb-2 flex justify-center text-secondary-main bg-transparent group-hover:bg-white-main">
                      <FaTint />
                    </span>
                    <h5 className="text-lg text-white-main">
                      Infraestructura de Obras de Saneamiento
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            {/* BIM */}
            <div className="group">
              <div className="relative overflow-hidden flex items-center justify-center rounded-lg shadow-md transition-transform duration-300">
                <img
                  src={area5.src}
                  alt=""
                  className="w-full h-[350px] object-cover group-hover:scale-125 transition-transform duration-300"
                />
                <div className="absolute inset-0 m-auto rounded-xl w-[200px] h-[180px] group-hover:w-full group-hover:h-full flex items-center justify-center px-8 py-10 bg-black-main bg-opacity-70 transition-all duration-300">
                  <div className="text-white text-center">
                    <span className="text-3xl mx-auto w-fit h-fit rounded-full p-4 mb-2 flex justify-center text-secondary-main bg-transparent group-hover:bg-white-main">
                      <FaProjectDiagram />
                    </span>
                    <h5 className="text-lg text-white-main">BIM</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="group">
              <Link
                href={`/cursos/${formatearURL("construcción")}`}
                className="block"
              >
                <div className="relative overflow-hidden flex items-center justify-center rounded-lg shadow-md transition-transform duration-300">
                  <img
                    src={area6.src}
                    alt=""
                    className="w-full h-[350px] object-cover group-hover:scale-125 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 m-auto rounded-xl w-[200px] h-[180px] group-hover:w-full group-hover:h-full flex items-center justify-center px-8 py-10 bg-black-main bg-opacity-70 transition-all duration-300">
                    <div className="text-white text-center">
                      <span className="text-3xl mx-auto w-fit h-fit rounded-full p-4 mb-2 flex justify-center text-secondary-main bg-transparent group-hover:bg-white-main">
                        <FaHardHat />
                      </span>
                      <h5 className="text-lg text-white-main">Construcción</h5>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            {/* Geotecnia */}
            <div className="group">
              <div className="relative overflow-hidden flex items-center justify-center rounded-lg shadow-md transition-transform duration-300">
                <img
                  src={area7.src}
                  alt=""
                  className="w-full h-[350px] object-cover group-hover:scale-125 transition-transform duration-300"
                />
                <div className="absolute inset-0 m-auto rounded-xl w-[200px] h-[180px] group-hover:w-full group-hover:h-full flex items-center justify-center px-8 py-10 bg-black-main bg-opacity-70 transition-all duration-300">
                  <div className="text-white text-center">
                    <span className="text-3xl mx-auto w-fit h-fit rounded-full p-4 mb-2 flex justify-center text-secondary-main bg-transparent group-hover:bg-white-main">
                      <GiMining />
                    </span>
                    <h5 className="text-lg text-white-main">Geotecnia</h5>
                  </div>
                </div>
              </div>
            </div>
            {/* Topografía */}
            <div className="group">
              <div className="relative overflow-hidden flex items-center justify-center rounded-lg shadow-md transition-transform duration-300">
                <img
                  src={area8.src}
                  alt=""
                  className="w-full h-[350px] object-cover group-hover:scale-125 transition-transform duration-300"
                />
                <div className="absolute inset-0 m-auto rounded-xl w-[200px] h-[180px] group-hover:w-full group-hover:h-full flex items-center justify-center px-8 py-10 bg-black-main bg-opacity-70 transition-all duration-300">
                  <div className="text-white text-center">
                    <span className="text-3xl mx-auto w-fit h-fit rounded-full p-4 mb-2 flex justify-center text-secondary-main bg-transparent group-hover:bg-white-main">
                      <FaMapMarkerAlt />
                    </span>
                    <h5 className="text-lg text-white-main">
                      Topografía y Fotogametría
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContentMain>
      </section>
    </>
  );
};

export default Capacitacion;
