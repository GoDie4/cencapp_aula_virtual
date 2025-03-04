/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import FormLogin from "./@components/FormLogin";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
const Page: NextPage = () => {
  return (
    <section className="p-4 bg-gradient-to-br from-primary-950 to-primary-main  h-dvh flex flex-col lg:flex-row items-center justify-center">
      <div className="w-full hidden lg:block lg:w-1/2 relative">
        <div className="w-full h-full flex flex-col justify-between absolute top-0 left-0 p-5">
          <div className="w-full flex justify-between ">
            <div className="w-fit">
              <img
                src="/assets/images/logo/logo-white.png"
                alt=""
                className="w-24"
              />
            </div>
            <div className="w-fit">
              <Link
                href={"/"}
                className="flex items-center gap-3 bg-white-200/50 rounded-full px-4 text-white-main py-1 transition-all duration-200 hover:bg-white-main hover:text-primary-main"
              >
                <FaLongArrowAltLeft />
                Regresar a la web
              </Link>
            </div>
          </div>
          <p className="text-2xl text-center text-white-main px-10 mb-10">
            Preparando a los Ingenieros para los Retos del Mañana
          </p>
        </div>
        <img
          src="/assets/images/login/fondo.webp"
          alt=""
          className="h-[calc(100dvh-32px)] rounded-main object-cover"
        />
      </div>
      <div className="w-full lg:w-1/2 sm:px-6 md:px-12 lg:px-20">
        <div className="w-full mx-auto flex flex-col items-center justify-center">
          <img
            src="/assets/images/logo/logo-white.png"
            alt=""
            className="block w-32 mx-auto mb-12"
          />
          <p className="text-3xl md:text-4xl font-bold text-center w-full text-white-main mb-10">
            Iniciar <span className="text-secondary-main">sesión</span>
          </p>
          <FormLogin />
          <Link
            href={"/registrarse"}
            className="underline text-sm text-white-main mt-9"
          >
            Regístrate
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Page;
