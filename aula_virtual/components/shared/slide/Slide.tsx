import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/react'
import  { Navigation, Autoplay }  from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css'
import { slide1, slide2 } from '../images'
import Link from 'next/link'
interface SlideProps {
  index: number
}

const Slide: React.FC<SlideProps> = ({ index }) => {
  const slideRef = useRef(null)
  const parallaxRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const slideElement = slideRef.current
    const parallaxElement = parallaxRef.current
    const textElement = textRef.current

    if (slideElement && parallaxElement && textElement) {
      gsap.from(slideElement, {
        opacity: 0,
        x: -100,
        duration: 1,
        ease: 'power3.out'
      })

      gsap.to(parallaxElement, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: slideElement,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      })

      // Animación en 3D del texto
      gsap.from(textElement, {
        duration: 1,
        rotationY: 360, // Rotación horizontal
        rotationX: 45, // Rotación vertical
        scale: 0.8, // Escala
        opacity: 0,
        ease: 'power3.out',
        stagger: 0.2, // Retardo para la animación
        onComplete: () => {
          // Lógica adicional después de la animación (si es necesario)
        }
      })
    }
  }, [index])

  return (
    <>
      <Swiper className="slide" navigation={true} modules={[Navigation, Autoplay]} loop
        autoplay={{
          delay: 3500,
          disableOnInteraction: false
        }}
      >
        <SwiperSlide style={{ backgroundImage: `url(${slide1.src})` }}>
          <div className="contentSlide">
            <h1 ref={textRef} className="slideContent">
              Bienvenido a CENCAPP
              <br />
              <span>
                Ofrecemos capacitaciones <br />
                en Ingeniería y afines{' '}
              </span>
            </h1>

            <Link href="/contacto">Contactar</Link>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ backgroundImage: `url(${slide2.src})` }}>
          <div className="contentSlide">
            <h1 ref={textRef} className="slideContent">
              Bienvenido a CENCAPP
              <br />
              <span>
                Ofrecemos capacitaciones <br />
                en Ingeniería y afines{' '}
              </span>
            </h1>

            <Link href="/contacto">Contactar</Link>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* <div ref={slideRef} className="slide" style={{ backgroundImage }}>
      <div ref={parallaxRef} className="parallax-content">

      </div>
    </div> */}
    </>
  )
}

export default Slide
