/* eslint-disable @next/next/no-img-element */
"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
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
import Image from "next/image";
import { Header } from "../components/public/estructura/Header";
import { Footer } from "../components/public/estructura/Footer";
import Carrito from "../components/public/utils/Carrito";
import { Slide } from "../components/shared/slide/Slide";
import { ContentMain } from "../components/public/estructura/ContentMain";
import { useCategorias } from "@/hooks/useCategorias";
import { formatUrl } from "@/logic/formateador";
import { config } from "@/config/config";
import { useCursos } from "@/hooks/useCursos";


const Home = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { categorias } = useCategorias();
  const { cursos } = useCursos();


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
        <section className="">
          <ContentMain className="py-20">
            <div className="w-full mb-10">
              <h2 className="text-3xl font-bold text-center md:text-4xl lg:text-5xl text-primary-main">
                Cursos
              </h2>
            </div>
            <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cursos.map((cur) => {
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
              {/* <div className="w-full">
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
              </div> */}
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
            <div className="mb-20 text-center">
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
            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-col justify-center w-full lg:w-1/2">
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
              <div className="w-full mt-8 lg:w-1/2 lg:pl-20 lg:mt-0">
                <h5 className="mb-10 text-3xl font-semibold text-center uppercase lg:text-4xl text-primary-main">
                  Formulario de contacto
                </h5>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4 mb-4 lg:flex-row">
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
                  <div className="flex flex-col gap-4 mb-4 lg:flex-row">
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
                    className="w-full p-3 mb-4 border rounded-md"
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
                      className="w-full p-3 rounded-md cursor-wait bg-primary-main text-white-main"
                    />
                  ) : (
                    <input
                      type="submit"
                      value="Enviar"
                      className="w-full p-3 rounded-md cursor-pointer bg-primary-main text-white-main"
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
