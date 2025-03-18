'use client'
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";

import "swiper/css/thumbs";
import { Autoplay } from "swiper/modules";
import "swiper/css/navigation";
export const Convenios = () => {
  return (
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
        <img src={'/assets/images/convenios/1.webp'} alt="" />
        <h5 className="text-lg text-center ">CIP-AMAZONAS</h5>
      </SwiperSlide>
      <SwiperSlide>
        <img src={'/assets/images/convenios/2.jpeg'} alt="" />
        <h5 className="text-lg text-center ">CONSTRUCTORA JHIRE P Y B</h5>
      </SwiperSlide>
      <SwiperSlide>
        <img src={'/assets/images/convenios/3.jpeg'} alt="" />
        <h5 className="text-lg text-center ">
          DICOEP INGENIEROS ESTRUCTURALES
        </h5>
      </SwiperSlide>
      <SwiperSlide>
        <img src={'/assets/images/convenios/4.jpeg'} alt="" />
        <h5 className="text-lg text-center ">LABORATORIO DE SUELOS DIAZ </h5>
      </SwiperSlide>
      <SwiperSlide>
        <img src={'/assets/images/convenios/1.webp'} alt="" />
        <h5 className="text-lg text-center ">CIP-AMAZONAS</h5>
      </SwiperSlide>
      <SwiperSlide>
        <img src={'/assets/images/convenios/2.jpeg'} alt="" />
        <h5 className="text-lg text-center ">CONSTRUCTORA JHIRE P Y B</h5>
      </SwiperSlide>
      <SwiperSlide>
        <img src={'/assets/images/convenios/3.jpeg'} alt="" />
        <h5 className="text-lg text-center ">
          DICOEP INGENIEROS ESTRUCTURALES
        </h5>
      </SwiperSlide>
      <SwiperSlide>
        <img src={'/assets/images/convenios/4.jpeg'} alt="" />
        <h5 className="text-lg text-center ">LABORATORIO DE SUELOS DIAZ </h5>
      </SwiperSlide>
      <SwiperSlide>
        <img src={'/assets/images/convenios/1.webp'} alt="" />
        <h5 className="text-lg text-center ">CIP-AMAZONAS</h5>
      </SwiperSlide>
      <SwiperSlide>
        <img src={'/assets/images/convenios/2.jpeg'} alt="" />
        <h5 className="text-lg text-center ">CONSTRUCTORA JHIRE P Y B</h5>
      </SwiperSlide>
    </Swiper>
  );
};
