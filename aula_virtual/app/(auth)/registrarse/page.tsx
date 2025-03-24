/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import FormRegister from "./@components/FormRegister";
import { RegisterMetadata } from "@/seo/auth/RegisterMetaData";
export function generateMetadata() {
  const metadata = RegisterMetadata();
  return metadata;
}
const Page: NextPage = ({}) => {
  return (
    <section className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-primary-950 to-primary-main h-dvh lg:flex-row">
      <div className="w-full lg:w-1/2 sm:px-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-center w-full mx-auto">
          <img
            src="/assets/images/logo/logo-white.png"
            alt=""
            className="block w-24 mx-auto mb-12"
          />
          <p className="w-full mb-8 text-3xl font-bold text-center md:text-4xl text-white-main">
            Regís<span className="text-secondary-main">trate</span>
          </p>
          <FormRegister />
          <Link
            href={"/login"}
            className="mt-5 text-sm underline text-white-main"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
      <div className="relative hidden w-full lg:block lg:w-1/2">
        <div className="absolute top-0 left-0 flex flex-col justify-between w-full h-full p-5">
          <div className="flex justify-between w-full ">
            <div className="w-fit">
              <Link
                href={"/"}
                className="flex items-center gap-3 px-4 py-1 transition-all duration-200 rounded-full bg-white-200/50 text-white-main hover:bg-white-main hover:text-primary-main"
              >
                <FaLongArrowAltLeft />
                Regresar a la web
              </Link>
            </div>
            <div className="w-fit">
              <img
                src="/assets/images/logo/ico-white.png"
                alt=""
                className="w-24"
              />
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
    </section>
  );
};

export default Page;
