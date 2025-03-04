"use client";
import { FaLightbulb, FaBalanceScale, FaMedal, FaStar } from "react-icons/fa";
import Banner from "../../../components/public/Banner";
import { slide1 } from "../../../components/shared/images";
import { JSX, useEffect } from "react";

const Nosotros = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Banner imagen={`${slide1.src}`} titulo="Nosotros" />
      <section className="">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/5 relative px-8 lg:px-16 lg:pr-64 pt-20 pb-10">
            <div className="absolute inset-0 bg-[url('../assets/nosotros/nosotros.webp')] bg-cover bg-left bg-no-repeat opacity-20"></div>
            <div className="hidden lg:block absolute left-12 top-20 lg:top-32 h-[calc(100%-20rem)] lg:h-[calc(100%-24rem)] w-1 bg-primary-main opacity-70"></div>
            <h2 className="text-3xl lg:text-4xl text-primary-main font-bold uppercase tracking-wider relative z-10 mb-4">
              Misión
            </h2>
            <p className="text-base lg:text-lg text-justify mb-8 lg:mb-10 relative z-10">
              En Cencapp, nos visualizamos como el líder indiscutible en la
              capacitación de ingenieros a nivel global, ofreciendo programas
              innovadores que impulsan la excelencia técnica y el crecimiento
              profesional en un mundo en constante evolución.
            </p>
            <h2 className="text-3xl lg:text-4xl text-primary-main font-bold uppercase tracking-wider relative z-10 mb-4">
              Visión
            </h2>
            <p className="text-base lg:text-lg text-justify relative z-10">
              Nuestra visión es convertirnos en el principal motor de
              transformación para ingenieros en todo el mundo, ofreciendo
              capacitaciones de vanguardia que no solo potencien sus habilidades
              técnicas, sino que también inspiren la innovación y el liderazgo
              en la ingeniería del futuro.
            </p>
          </div>
          <div className="w-full lg:w-2/5 px-4 lg:px-2 flex  flex-col lg:flex-row items-center justify-center relative">
            <h5 className="text-2xl lg:text-3xl py-10 sm:py-0 text-primary-main uppercase tracking-[4px] font-bold relative text-center">
              Capacitación y Asesoramiento Profesional
              <span className="hidden lg:block absolute bottom-full left-1/2 -translate-x-1/2 text-3xl text-gray-200  -webkit-text-stroke-[1px] stroke-gray-300 whitespace-nowrap">
                Capacitación y Asesoramiento Profesional
              </span>
            </h5>
            <div className="relative lg:absolute top-full bg-[url('../assets/nosotros/nosotros.webp')] lg:top-[93%] left-0 lg:left-[-20rem] w-full lg:w-[calc(100%+20rem)] h-full lg:h-[70%] bg-cover bg-center z-50 flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-black-main opacity-50 z-[-1]"></div>
              <h2 className="text-3xl lg:text-4xl text-white-main text-center">
                <em>
                  {'"'}Desatamos el poder del conocimiento para impulsar la
                  ingeniería hacia nuevos horizontes.{'"'}
                </em>
              </h2>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 pb-[82px] w-full lg:w-[calc(60%-20rem)]  mt-0  px-5">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          <div className="flex flex-col items-center hover:cursor-pointer hover:scale-105 transition-transform duration-300">
            <span className="flex items-center justify-center mb-6 w-24 h-24 rounded-full bg-[#035688] shadow-inner-[29px_-29px_28px_#023c5f,_inset_29px_29px_28px_#0470b1] transition-shadow duration-300 hover:shadow-inner-[-29px_29px_28px_#0470b1,_inset_29px_-29px_28px_#023c5f]">
              <FaLightbulb className="text-5xl text-white-main" />
            </span>
            <p className="text-lg font-medium transition-letter-spacing duration-300">
              Innovación
            </p>
          </div>
          <div className="flex flex-col items-center hover:cursor-pointer hover:scale-105 transition-transform duration-300">
            <span className="flex items-center justify-center mb-6 w-24 h-24 rounded-full bg-[#035688] shadow-inner-[29px_-29px_28px_#023c5f,_inset_29px_29px_28px_#0470b1] transition-shadow duration-300 hover:shadow-inner-[-29px_29px_28px_#0470b1,_inset_29px_-29px_28px_#023c5f]">
              <FaBalanceScale className="text-5xl text-white-main" />
            </span>
            <p className="text-lg font-medium transition-letter-spacing duration-300">
              Honestidad
            </p>
          </div>
          <div className="flex flex-col items-center hover:cursor-pointer hover:scale-105 transition-transform duration-300">
            <span className="flex items-center justify-center mb-6 w-24 h-24 rounded-full bg-[#035688] shadow-inner-[29px_-29px_28px_#023c5f,_inset_29px_29px_28px_#0470b1] transition-shadow duration-300 hover:shadow-inner-[-29px_29px_28px_#0470b1,_inset_29px_-29px_28px_#023c5f]">
              <FaMedal className="text-5xl text-white-main" />
            </span>
            <p className="text-lg font-medium transition-letter-spacing duration-300">
              Calidad
            </p>
          </div>
          <div className="flex flex-col items-center hover:cursor-pointer hover:scale-105 transition-transform duration-300">
            <span className="flex items-center justify-center mb-6 w-24 h-24 rounded-full bg-[#035688] shadow-inner-[29px_-29px_28px_#023c5f,_inset_29px_29px_28px_#0470b1] transition-shadow duration-300 hover:shadow-inner-[-29px_29px_28px_#0470b1,_inset_29px_-29px_28px_#023c5f]">
              <FaStar className="text-5xl text-white-main" />
            </span>
            <p className="text-lg font-medium transition-letter-spacing duration-300">
              Excelencia
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Nosotros;
