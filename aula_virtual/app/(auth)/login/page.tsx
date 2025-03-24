/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import FormLogin from "./@components/FormLogin";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { LoginMetadata } from "@/seo/auth/LoginMetaData";

export function generateMetadata() {
  const metadata = LoginMetadata();
  return metadata;
}
const Page: NextPage = () => {
  return (
    <section className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-primary-950 to-primary-main h-dvh lg:flex-row">
      <div className="relative hidden w-full lg:block lg:w-1/2">
        <div className="absolute top-0 left-0 flex flex-col justify-between w-full h-full p-5">
          <div className="flex justify-between w-full ">
            <Link href={"/"} className="w-fit">
              <img
                src="/assets/images/logo/logo-white.png"
                alt=""
                className="w-24"
              />
            </Link>
            <div className="w-fit">
              <Link
                href={"/"}
                className="flex items-center gap-3 px-4 py-1 transition-all duration-200 rounded-full bg-white-200/50 text-white-main hover:bg-white-main hover:text-primary-main"
              >
                <FaLongArrowAltLeft />
                Regresar a la web
              </Link>
            </div>
          </div>
          <p className="px-10 mb-10 text-2xl text-center text-white-main">
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
        <div className="flex flex-col items-center justify-center w-full mx-auto">
          <Link href={"/"}>
            <img
              src="/assets/images/logo/logo-white.png"
              alt=""
              className="block w-32 mx-auto mb-12"
            />
          </Link>
          <p className="w-full mb-10 text-3xl font-bold text-center md:text-4xl text-white-main">
            Iniciar <span className="text-secondary-main">sesión</span>
          </p>
          <FormLogin />
          <Link
            href={"/registrarse"}
            className="text-sm underline text-white-main mt-9"
          >
            Regístrate
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Page;
