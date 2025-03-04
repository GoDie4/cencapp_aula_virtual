/* eslint-disable @next/next/no-img-element */
"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import {
  FaBuilding,
  FaCity,
  FaTint,
  FaProjectDiagram,
  FaHardHat,
  FaMapMarkerAlt,
} from "react-icons/fa";
import area1 from "../assets/areas/1.webp";
import area2 from "../assets/areas/2.webp";
import area3 from "../assets/areas/3.webp";
import area4 from "../assets/areas/4.webp";
import area5 from "../assets/areas/5.webp";
import area6 from "../assets/areas/6.webp";
import area7 from "../assets/areas/7.webp";
import area8 from "../assets/areas/8.webp";
import curso1 from "../assets/cursos/1.webp";
import curso2 from "../assets/cursos/2.webp";
import curso3 from "../assets/cursos/3.webp";
import curso4 from "../assets/cursos/4.webp";

import { GiMining, GiRoad } from "react-icons/gi"; // Para Geotecnia
import { useRef, useState, useEffect, JSX } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { Global } from "@/helper/Global";
import { SchemaContacto } from "../components/shared/Schemas";
import { Errors } from "../components/shared/Errors";
import convenio1 from "../assets/convenios/1.webp";
import convenio2 from "../assets/convenios/2.jpeg";
import convenio3 from "../assets/convenios/3.jpeg";
import convenio4 from "../assets/convenios/4.jpeg";

import "swiper/css";
import "swiper/css/free-mode";

import "swiper/css/thumbs";
import CardCurso from "../components/public/curso/CardCurso";
import Certificados from "../components/public/curso/Certificados";
import Certificados2 from "../components/public/curso/Certificados2";
import Link from "next/link";
import { Header } from "../components/public/estructura/Header";
import { Footer } from "../components/public/estructura/Footer";
import Carrito from "../components/public/utils/Carrito";
import { Slide } from "../components/shared/slide/Slide";
import { ContentMain } from "../components/public/estructura/ContentMain";

// Registra el plugin CSS con GSAP
const Home = (): JSX.Element => {
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

  const [loadingCorreo, setLoadingCorreo] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const enviarCorreo = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values: any,
    recaptchaValue: string
  ): Promise<void> => {
    setLoadingCorreo(true);

    const data = new FormData();
    data.append("nombres", values.nombres);
    data.append("celular", values.celular);
    data.append("mensaje", values.mensaje);
    data.append("email", values.email);
    data.append("recaptcha", recaptchaValue);

    console.log("Datos enviados al backend:", {
      nombres: values.nombres,
      celular: values.celular,
      mensaje: values.mensaje,
      email: values.email,
      recaptcha: recaptchaValue,
    });
    try {
      const respuesta = await axios.post(`${Global.url}/enviarCorreo`, data);

      if (respuesta.data.status === "success") {
        Swal.fire("Correo enviado", "", "success");
        resetForm();
      } else {
        Swal.fire("Error al enviar el correo", "", "error");
        resetForm();
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error al enviar el correo", "", "error");
    }
    setLoadingCorreo(false);
  };
  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      nombres: "",
      celular: "",
      email: "",
      mensaje: "",
    },
    validationSchema: SchemaContacto,
    onSubmit: async (values) => {
      const recaptchaValue = recaptchaRef.current?.getValue();
      console.log("Token reCAPTCHA:", recaptchaValue);

      if (!recaptchaValue) {
        Swal.fire("Por favor, completa el reCAPTCHA", "", "warning");
        setLoadingCorreo(false);
        return;
      }
      await enviarCorreo(values, recaptchaValue);
    },
  });

  useEffect(() => {
    if (errors && isSubmitting) {
      const firstErrorKey = Object.keys(errors)[0];
      const firstErrorElement = document.getElementsByName(firstErrorKey)[0];
      if (firstErrorElement) {
        firstErrorElement.focus();
      }
    }
  }, [touched, errors, isSubmitting]);

  const mapStyles = {
    height: "500px",
    width: "100%",
  };
  return (
    <>
      <Header />
      <Carrito />
      <main className="w-full">
        <div className="slide">
          <Slide />
        </div>

        {/* PARA OSCURECER LAS IMAGENES SE PUEDE UTILIZAR LA SIGUIENTE PAGINA https://pinetools.com/es/oscurecer-imagen */}
        {/* <section className="servicios" id="servicios">
          <div className="servicios__main">
            <div className="servicios__main__item">
              <div
                className="servicios__main__item__content"
                style={{ backgroundImage: `url(${s1})` }}
              >
                <div className="bg"></div>
                <FaCog />
                <h5>Servicio 1</h5>
              </div>
              <button type="button">Contactar</button>
            </div>
            <div className="servicios__main__item">
              <div
                className="servicios__main__item__content"
                style={{ backgroundImage: `url(${s2})` }}
              >
                <div className="bg"></div>
                <FaIndustry />
                <h5>Servicio 2</h5>
              </div>
            </div>
            <div className="servicios__main__item">
              <div
                className="servicios__main__item__content"
                style={{ backgroundImage: `url(${s3})` }}
              >
                <div className="bg"></div>
                <FaCogs />
                <h5>Servicio 3</h5>
              </div>
            </div>
            <div className="servicios__main__item">
              <div
                className="servicios__main__item__content"
                style={{ backgroundImage: `url(${s4})` }}
              >
                <div className="bg"></div>
                <FaBuilding />
                <h5>Servicio 4</h5>
              </div>
            </div>
          </div>
        </section> */}

        <section className="">
          <ContentMain className="py-20">
            <div className="w-full mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary-main font-bold text-center">
                Cursos
              </h2>
            </div>
            <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="w-full">
                <CardCurso
                  id="1"
                  horas="40 horas"
                  img={`${curso1.src}`}
                  precio="350"
                  titulo="Topografía aplicada a Obras Civiles"
                />
              </div>
              <div className="w-full">
                <CardCurso
                  id="2"
                  horas="48 horas"
                  img={`${curso2.src}`}
                  precio="80"
                  titulo="Presupuesto y programación de obras con presupuesto.pe"
                />
              </div>
              <div className="w-full">
                <CardCurso
                  id="3"
                  horas="32 horas"
                  img={`${curso3.src}`}
                  precio="100"
                  titulo="Elaboración de planos estructurales con Autocad Structural Detailling"
                />
              </div>
              <div className="w-full">
                <CardCurso
                  id="4"
                  horas="32 horas"
                  img={`${curso4.src}`}
                  precio="120"
                  titulo="Levantamiento topográfico"
                />
              </div>
            </div>
          </ContentMain>
        </section>

        <section className="w-full ">
          <ContentMain className="py-20">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-primary-main">
                Áreas de capacitación
              </h2>
            </div>
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
                        <h5 className="text-lg text-white-main">
                          Construcción
                        </h5>
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

        <div className="bg-white-100">
          <ContentMain className="py-20">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-primary-main">
                Mira algunas de nuestras clases
              </h2>
            </div>
            <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="w-full overflow-hidden rounded-2xl">
                {/* <LiteYouTubeEmbed id="tJbJZvy5F4E" title="Video" />; */}
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/tJbJZvy5F4E?si=mLLZw1OSXixbzWeU"
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="w-full overflow-hidden rounded-2xl">
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/RlFjXdQhnO0?si=U16kGnDMO7Zy-oVS"
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="w-full overflow-hidden rounded-2xl">
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/nwx_nHqE-Ko?si=g_I5tlc7W2f7aAib"
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </ContentMain>
        </div>

        <section className="convenios">
          <ContentMain className="py-20">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-primary-main">
                Convenios y clases
              </h2>
            </div>
            <Swiper
              slidesPerView={5}
              spaceBetween={80}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              className="swp_convenios"
              modules={[Autoplay]}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                576: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 5,
                },
              }}
            >
              <SwiperSlide>
                <img src={convenio1.src} alt="" />
                <h5 className="text-lg text-center ">CIP-AMAZONAS</h5>
              </SwiperSlide>
              <SwiperSlide>
                <img src={convenio2.src} alt="" />
                <h5 className="text-lg text-center ">
                  CONSTRUCTORA JHIRE P Y B
                </h5>
              </SwiperSlide>
              <SwiperSlide>
                <img src={convenio3.src} alt="" />
                <h5 className="text-lg text-center ">
                  DICOEP INGENIEROS ESTRUCTURALES
                </h5>
              </SwiperSlide>
              <SwiperSlide>
                <img src={convenio4.src} alt="" />
                <h5 className="text-lg text-center ">
                  LABORATORIO DE SUELOS DIAZ{" "}
                </h5>
              </SwiperSlide>
              <SwiperSlide>
                <img src={convenio1.src} alt="" />
                <h5 className="text-lg text-center ">CIP-AMAZONAS</h5>
              </SwiperSlide>
              <SwiperSlide>
                <img src={convenio2.src} alt="" />
                <h5 className="text-lg text-center ">
                  CONSTRUCTORA JHIRE P Y B
                </h5>
              </SwiperSlide>
              <SwiperSlide>
                <img src={convenio3.src} alt="" />
                <h5 className="text-lg text-center ">
                  DICOEP INGENIEROS ESTRUCTURALES
                </h5>
              </SwiperSlide>
              <SwiperSlide>
                <img src={convenio4.src} alt="" />
                <h5 className="text-lg text-center ">
                  LABORATORIO DE SUELOS DIAZ{" "}
                </h5>
              </SwiperSlide>
              <SwiperSlide>
                <img src={convenio1.src} alt="" />
                <h5 className="text-lg text-center ">CIP-AMAZONAS</h5>
              </SwiperSlide>
              <SwiperSlide>
                <img src={convenio2.src} alt="" />
                <h5 className="text-lg text-center ">
                  CONSTRUCTORA JHIRE P Y B
                </h5>
              </SwiperSlide>
            </Swiper>
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
              <h4 className="text-secondary-main text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-8">
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
            className="block mt-8 lg:mt-16 mb-4 lg:mb-8 bg-main-color text-center w-fit text-white px-6 py-3 rounded-md text-lg"
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
              <h4 className="text-secondary-main text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-8">
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
            className="block mt-8 lg:mt-16 mb-4 lg:mb-8 bg-main-color text-center w-fit text-white px-6 py-3 rounded-md text-lg"
          >
            Tu Enlace
          </a> */}
            </div>
            <div className="min-h-[300px] lg:min-h-[550px] w-full lg:w-[47%] bg-fixed bg-cover p-8 lg:p-[8rem_18rem] bg-center flex flex-col justify-center items-center">
              <Certificados2 />
            </div>
          </div>
        </section>

        <section className="px-8  lg:px-20">
          <ContentMain className="py-20">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <LoadScript googleMapsApiKey="AIzaSyCnURlOXZMHX5yPBdb8_Rn-m_Y8McBHEjw">
                  <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={16}
                    center={{ lat: -12.0420486, lng: -77.0436353 }}
                  >
                    <Marker
                      position={{ lat: -12.0420486, lng: -77.0436353 }}
                      icon={""}
                    />
                  </GoogleMap>
                </LoadScript>
              </div>
              <div className="w-full lg:w-1/2 lg:pl-20 mt-8 lg:mt-0">
                <h5 className="text-3xl lg:text-4xl uppercase font-semibold text-primary-main text-center mb-10">
                  Formulario de contacto
                </h5>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col lg:flex-row gap-4 mb-4">
                    <div className="w-full">
                      <input
                        placeholder="Nombres"
                        className="w-full p-3 border rounded-md"
                        name="nombres"
                        type="text"
                        value={values.nombres}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <Errors
                        errors={errors.nombres}
                        touched={touched.nombres}
                      />
                    </div>
                    <div className="w-full">
                      <input
                        placeholder="Asunto"
                        className="w-full p-3 border rounded-md"
                        name="asunto"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-4 mb-4">
                    <div className="w-full">
                      <input
                        placeholder="Email"
                        className="w-full p-3 border rounded-md"
                        name="email"
                        type="text"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <Errors errors={errors.email} touched={touched.email} />
                    </div>
                    <div className="w-full">
                      <input
                        placeholder="Celular"
                        className="w-full p-3 border rounded-md"
                        name="celular"
                        type="text"
                        value={values.celular}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <Errors
                        errors={errors.celular}
                        touched={touched.celular}
                      />
                    </div>
                  </div>
                  <textarea
                    name="mensaje"
                    className="w-full p-3 border rounded-md mb-4"
                    placeholder="Mensaje"
                    rows={5}
                    value={values.mensaje}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  ></textarea>
                  <Errors errors={errors.mensaje} touched={touched.mensaje} />
                  <div className="mb-4">
                    <ReCAPTCHA
                      sitekey="6LfYvjUqAAAAACjMMq91FI2TkrTbRALRjoqusd-w"
                      ref={recaptchaRef}
                    />
                  </div>
                  {loadingCorreo ? (
                    <input
                      type="button"
                      value="Enviando..."
                      className="w-full p-3 bg-primary-main text-white-main rounded-md cursor-wait"
                    />
                  ) : (
                    <input
                      type="submit"
                      value="Enviar"
                      className="w-full p-3 bg-primary-main text-white-main rounded-md cursor-pointer"
                    />
                  )}
                </form>
              </div>
            </div>
          </ContentMain>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
