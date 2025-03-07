/* eslint-disable @next/next/no-img-element */
"use client";

import Banner from "../../../components/public/Banner";
import { slide2 } from "../../../components/shared/images";
import { JSX, useEffect } from "react";
import Link from "next/link";
import { useCategorias } from "@/hooks/useCategorias";
import Image from "next/image";
import { formatUrl } from "@/logic/formateador";
import { config } from "@/config/config";
import { ContentMain } from "../../../components/public/estructura/ContentMain";

const Capacitacion = (): JSX.Element => {
  const { categorias } = useCategorias();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(categorias);
  return (
    <>
      <Banner titulo="Capacitaciones" imagen={`${slide2.src}`} />
      <section className="">
        <ContentMain className="py-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categorias.map((cat) => {
              return (
                <div className="group" key={cat.id}>
                  <Link
                    href={`/cursos/${formatUrl(cat.nombre)}`}
                    className="block"
                  >
                    <div className="relative flex items-center justify-center overflow-hidden transition-transform duration-300 rounded-lg shadow-md">
                      <img
                        src={`${config.imagesUrl}${cat.url_imagen}`}
                        alt=""
                        className="w-full h-[350px] object-cover group-hover:scale-125 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 m-auto rounded-xl w-[200px] h-[180px] group-hover:w-full group-hover:h-full flex items-center justify-center px-8 py-10 bg-black-main bg-opacity-70 transition-all duration-300">
                        <div className="text-center text-white">
                          <span className="flex justify-center p-4 mx-auto mb-2 text-3xl bg-transparent rounded-full w-fit h-fit text-secondary-main group-hover:bg-white-main">
                            <Image
                              src={`${config.imagesUrl}${cat.url_icono}`}
                              width={30}
                              height={30}
                              alt={cat.nombre}
                            />
                          </span>
                          <h5 className="text-lg text-white-main">
                            {cat.nombre}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </ContentMain>
      </section>
    </>
  );
};

export default Capacitacion;
