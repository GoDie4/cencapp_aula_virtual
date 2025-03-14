/* eslint-disable @next/next/no-img-element */

import CardCurso from "../components/public/curso/CardCurso";
import Certificados from "../components/public/curso/Certificados";
import Certificados2 from "../components/public/curso/Certificados2";
import Link from "next/link";
import { Header } from "../components/public/estructura/Header";
import { Footer } from "../components/public/estructura/Footer";
import Carrito from "../components/public/utils/Carrito";
import { Slide } from "../components/shared/slide/Slide";
import { ContentMain } from "../components/public/estructura/ContentMain";
import { formatUrl } from "@/logic/formateador";
import { config } from "@/config/config";
import { getServerSideProps } from "@/server/getServerSideProps";
import { FormContacto } from "./(landing)/contacto/@components/FormContacto";
import { Convenios } from "./(landing)/@components/Convenios";
import { CardVideo } from "./(landing)/@components/CardVideo";
import { Curso } from "@/interfaces/CursoInterface";
import { Categoria } from "@/interfaces/CategoriaInterface";
import { HomeMetadata } from "@/layouts/seo/HomeMetaData";
export function generateMetadata() {
  const metadata = HomeMetadata();
  return metadata;
}
export default async function page() {
  const dataCursos = await getServerSideProps("cursos");
  const dataCategorias = await getServerSideProps("categorias");

  return (
    <>
      <Header />
      <Carrito />
      <main className="w-full">
        <div className="slide">
          <Slide />
        </div>
        <section className="">
          <ContentMain className="py-20">
            <div className="w-full mb-10">
              <h2 className="text-3xl font-bold text-center md:text-4xl lg:text-5xl text-primary-main">
                Cursos
              </h2>
            </div>
            <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
              {dataCursos.cursos.map((cur: Curso) => {
                return (
                  <div className="w-full" key={cur.id}>
                    <CardCurso
                      id={cur.id ?? ""}
                      horas={String(cur.horas)}
                      img={`${config.imagesUrl}${cur.imagen}`}
                      precio={String(cur.precio)}
                      titulo={cur.nombre}
                    />
                  </div>
                );
              })}
            </div>
          </ContentMain>
        </section>

        <section className="w-full ">
          <ContentMain className="py-20">
            <div className="mb-20 text-center">
              <h2 className="text-4xl font-bold text-blue-800">
                Áreas de capacitación
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {dataCategorias.categorias.map((cat: Categoria) => {
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
                              <img
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

        <div className="bg-white-100">
          <ContentMain className="py-20">
            <div className="mb-20 text-center">
              <h2 className="text-4xl font-bold text-primary-main">
                Mira algunas de nuestras clases
              </h2>
            </div>
            <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="w-full overflow-hidden rounded-2xl">
                <CardVideo id="tJbJZvy5F4E" />
                {/* <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/tJbJZvy5F4E?si=mLLZw1OSXixbzWeU"
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe> */}
              </div>
              <div className="w-full overflow-hidden rounded-2xl">
                <CardVideo id="RlFjXdQhnO0" />

                {/* <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/RlFjXdQhnO0?si=U16kGnDMO7Zy-oVS"
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe> */}
              </div>
              <div className="w-full overflow-hidden rounded-2xl">
                <CardVideo id="nwx_nHqE-Ko" />

                {/* <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/nwx_nHqE-Ko?si=g_I5tlc7W2f7aAib"
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe> */}
              </div>
            </div>
          </ContentMain>
        </div>

        <section className="convenios">
          <ContentMain className="py-20">
            <div className="mb-20 text-center">
              <h2 className="text-4xl font-bold text-primary-main">
                Convenios y clases
              </h2>
            </div>
            <Convenios />
          </ContentMain>
        </section>

        <section className="bg-[url('../assets/fondos/fondo3.webp')] bg-fixed overflow-hidden bg-cover">
          <div className="flex flex-col lg:flex-row">
            <div className="min-h-[300px] lg:min-h-[550px] w-full lg:w-[47%] bg-fixed bg-cover p-8 lg:p-[8rem_18rem] bg-center flex flex-col justify-center items-center">
              <Certificados />
            </div>
            <div className="p-8 lg:p-[8rem_16rem] w-full lg:w-[53%] bg-cover bg-fixed relative bg-center z-10 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
              <div className="absolute w-full h-full bg-black-main opacity-50 top-0 left-0 z-[-1]"></div>
              <span className="text-2xl text-white-main font-semibold tracking-[4px] block mb-4 lg:mb-8">
                CIP - AMAZONAS
              </span>
              <h4 className="mb-4 text-3xl font-bold text-secondary-main md:text-4xl lg:text-5xl lg:mb-8">
                CERTIFICADO CONVENIO
              </h4>
              <p className="text-lg text-white-100">
                Con el respaldo de una organización líder reconocida
                nacionalmente, nuestro programa te brinda las habilidades y el
                conocimiento necesarios para destacarte en cualquier industria.
                Desde la gestión eficiente de recursos hasta la implementación
                de estrategias innovadoras, te convertirás en un experto en
                liderazgo de proyectos.
              </p>
              {/* Si tienes un enlace, descomenta y ajusta: */}
              {/* <a
            href="#"
            className="block px-6 py-3 mt-8 mb-4 text-lg text-center text-white rounded-md lg:mt-16 lg:mb-8 bg-main-color w-fit"
          >
            Tu Enlace
          </a> */}
            </div>
          </div>
        </section>

        <section className="bg-[url('../assets/fondos/fondo3.webp')] bg-fixed overflow-hidden bg-cover">
          <div className="flex flex-col lg:flex-row">
            <div className="p-8 lg:p-[8rem_16rem] w-full lg:w-[53%] bg-cover bg-fixed relative bg-center z-10 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
              <div className="absolute w-full h-full bg-black-main opacity-50 top-0 left-0 z-[-1]"></div>
              <span className="text-2xl text-white-main font-semibold tracking-[4px] block mb-4 lg:mb-8">
                CIP - AMAZONAS
              </span>
              <h4 className="mb-4 text-3xl font-bold text-secondary-main md:text-4xl lg:text-5xl lg:mb-8">
                CERTIFICADO CONVENIO
              </h4>
              <p className="text-lg text-white-100">
                Con el respaldo de una organización líder reconocida
                nacionalmente, nuestro programa te brinda las habilidades y el
                conocimiento necesarios para destacarte en cualquier industria.
                Desde la gestión eficiente de recursos hasta la implementación
                de estrategias innovadoras, te convertirás en un experto en
                liderazgo de proyectos.
              </p>
              {/* Si tienes un enlace, descomenta y ajusta: */}
              {/* <a
            href="#"
            className="block px-6 py-3 mt-8 mb-4 text-lg text-center text-white rounded-md lg:mt-16 lg:mb-8 bg-main-color w-fit"
          >
            Tu Enlace
          </a> */}
            </div>
            <div className="min-h-[300px] lg:min-h-[550px] w-full lg:w-[47%] bg-fixed bg-cover p-8 lg:p-[8rem_18rem] bg-center flex flex-col justify-center items-center">
              <Certificados2 />
            </div>
          </div>
        </section>

        <section className="px-8 lg:px-20">
          <ContentMain className="py-20">
            <FormContacto />
          </ContentMain>
        </section>
      </main>
      <Footer />
    </>
  );
}
