import { Swiper, SwiperSlide } from "swiper/react";

import { EffectFade, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";

import { useState } from "react";

import { BiSolidChevronRight } from "react-icons/bi";
import { BiSolidChevronLeft } from "react-icons/bi";
import { slide1, slide2 } from "../images";
import { ContentMain } from "../../public/estructura/ContentMain";
import Link from "next/link";
import { slidesValues } from "@/interfaces/SlidesInterface";
export const Slide = () => {
  //   const [slides, setSlides] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0);
  //   const slideVariants = {
  //     hidden: { opacity: 0 },
  //     visible: { opacity: 1 },
  //   };

  const slides: slidesValues[] = [
    {
      imagen1: slide1.src,
      titulo1:
        "Bievenidos a Cencapp Ofrecemos capacitaciones en ingeniería y afines.",
      descripcion: "Ofrecemos capacitaciones en ingeniería y afines.",
      id: "SLD-001",
    },
    {
      imagen1: slide2.src,
      titulo1:
        "Bievenidos a Cencapp Ofrecemos capacitaciones en ingeniería y afines.",
      descripcion: "Ofrecemos capacitaciones en ingeniería y afines.",
      id: "SLD-001",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSlideChange = (swiper: any): void => {
    setCurrentSlide(swiper.activeIndex);
  };

  return (
    <Swiper
      modules={[Autoplay, EffectFade, Navigation]}
      className={`relative h-screen`}
      allowTouchMove={false}
      id="inicio"
      navigation={{
        nextEl: ".parriba",
        prevEl: ".pabajo",
      }}
      autoplay={{
        delay: 7500,
        disableOnInteraction: false,
      }}
      onSlideChange={handleSlideChange}
    >
      <>
        {slides.map((slide: slidesValues, index: number) => (
          <SwiperSlide key={index}>
            <div
              style={{
                backgroundImage: `url(${slide.imagen1})`,
              }}
              className="relative z-10 flex w-full h-full bg-center bg-cover slide-gradient before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-black-main before:opacity-50 before:-z-10"
            >
              <ContentMain className="flex flex-col items-center justify-center w-full gap-16 py-20 md:py-0 sm:gap-0 lg:flex-row md:justify-start">
                <motion.div
                  className="w-full lg:w-3/5"
                  initial="hidden"
                  animate={currentSlide === index ? "visible" : "hidden"}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 1 },
                    },
                  }}
                  transition={{ duration: 1 }}
                >
                  <h1 className="leading-[64px] text-3xl font-[500] text-center md:text-left lg:text-[48px] uppercase text-white-main">
                    {slide.titulo1}{" "}
                  </h1>
                  {/* <motion.div
                    initial="hidden"
                    animate={currentSlide === index ? "visible" : "hidden"}
                    variants={slideVariants}
                    dangerouslySetInnerHTML={{
                      __html: slide.descripcion,
                    }}
                    className="w-full mt-5 text-sm text-justify text-white-main font-body md:text-left md:text-base lg:w-3/4"
                  ></motion.div> */}
                  <div className="flex flex-col items-center gap-4 mt-5 md:flex-row">
                    <Link
                      href={"#servicios"}
                      className="bg-secondary-main text-white-main group  flex items-center gap-1 w-fit rounded-main px-8 font-semibold text-xs md:text-sm py-2 border border-secondary-main transition-all hover:bg-secondary-800 hover:border-secondary-800 hover:text-white-main hover:scale-[1.02]"
                    >
                      Comencemos{" "}
                    </Link>
                  </div>
                </motion.div>
              </ContentMain>
            </div>
          </SwiperSlide>
        ))}
      </>

      <div className="absolute  mx-auto md:mx-0 right-52 flex gap-0 -bottom-12 my-auto h-[200px] z-[999]">
        <div className="p-1 mb-4 rounded-full cursor-pointer  w-fit h-fit md:p-3 parriba">
          <BiSolidChevronLeft className="text-6xl text-primary-main " />
        </div>
        <div className="p-1 mb-4 -ml-6 rounded-full cursor-pointer  w-fit h-fit md:p-3 pabajo">
          <BiSolidChevronRight className="text-6xl text-primary-main" />
        </div>
      </div>
    </Swiper>
  );
};
