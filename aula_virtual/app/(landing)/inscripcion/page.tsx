/* eslint-disable @next/next/no-img-element */
"use client";
import { s2 } from "../../../components/shared/images";
import Banner from "../../../components/public/Banner";
import lg1 from "../../../assets/varios/lg_bcp.jpg";
import lg2 from "../../../assets/varios/lg_paypal.png";
import qr from "../../../assets/varios/qr.png";
import {
  FaMoneyCheckAlt,
  FaFileInvoiceDollar,
  FaEnvelope,
  FaUserLock,
} from "react-icons/fa";
import { JSX, useEffect } from "react";
const Inscripcion = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Banner titulo="Inscripción" imagen={`${s2.src}`} />

      <section className="px-8 sm:px-12 md:px-24 lg:px-36 py-20">
        <h2 className="text-center text-4xl font-semibold text-[#1231c9] mb-20">
          PROCESO DE INSCRIPCIÓN
        </h2>

        <p className="text-xl text-center mb-20">
          En CENCAPP le brindamos todas las facilidades en su proceso de
          inscripción. Además, le ofrecemos diversos medios seguros y accesibles
          para realizar el pago de su matrícula: Depósitos en bancos, agentes,
          transferencias por aplicativo y pagos en línea.
        </p>
        {/* <ol className="list-decimal text-3xl w-fit mx-auto">
          <li className='mb-4'>
            Realizar el depósito o transferencia a la cuenta bancaria de su preferencia.
          </li>
          <li className='mb-4'>
            Enviar el comprobante de pago al correo, FB Messenger o WhatsApp.
            <ul className='pl-7 mt-4'>
              <li><strong>Facebook:</strong> facebook.com/IBMStructure/ </li>
              <li><strong>WhatsApp:</strong> +51 973 044 253 </li>
              <li><strong>Correo:</strong> info@cencapperu.com </li>
            </ul>
          </li>
          <li className='mb-4'>Recibirá un correo confirmando su inscripción. </li>
          <li className='mb-4'>Se le entregará el usuario y clave de acceso al Aula Virtual.</li>
        </ol> */}
        <section className="grid place-items-center px-5 lg:px-[18rem] pt-8 pb-[5rem] grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-5 row-gap-[150px]">
          <div className="relative flex flex-col items-center gap-3">
            <div className="absolute bottom-full  left-0 right-0 mx-auto w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg bg-orange-500">
              1
            </div>
            <div className="text-orange-500 text-xl"></div>
            <div className="text-center">
              <h3 className="text-base lg:text-lg mb-1 text-gray-800 font-bold flex items-center justify-center gap-2">
                <FaMoneyCheckAlt className="text-xl text-orange-500" />
                Realizar el depósito o transferencia
              </h3>
              <p className="text-sm text-gray-600">
                Realice el pago a la cuenta bancaria de su preferencia.
              </p>
            </div>
          </div>

          <div className="relative flex flex-col items-center gap-3">
            <div className="bottom-full  left-0 right-0 mx-auto w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg bg-blue-600">
              2
            </div>
            <div className="text-blue-600 text-xl"></div>
            <div className="text-center">
              <h3 className="text-base lg:text-lg mb-1 text-gray-800 font-bold flex items-center justify-center gap-2">
                <FaFileInvoiceDollar className="text-xl text-blue-600" />
                Enviar comprobante de pago
              </h3>
              <p className="text-sm text-gray-600">
                Envíe el comprobante de pago a través de correo electrónico,
                Facebook Messenger o WhatsApp.
              </p>
            </div>
          </div>

          <div className="relative flex flex-col items-center gap-3">
            <div className="bottom-full  left-0 right-0 mx-auto w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg bg-green-600">
              3
            </div>
            <div className="text-green-600 text-xl"></div>
            <div className="text-center">
              <h3 className="text-base lg:text-lg mb-1 text-gray-800 font-bold flex items-center justify-center gap-2">
                <FaEnvelope className="text-xl text-green-600" />
                Confirmación de inscripción
              </h3>
              <p className="text-sm text-gray-600">
                Recibirá un correo electrónico confirmando su inscripción.
              </p>
            </div>
          </div>

          <div className="relative flex flex-col items-center gap-3">
            <div className="bottom-full  left-0 right-0 mx-auto w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg bg-purple-600">
              4
            </div>
            <div className="text-purple-600 text-xl"></div>
            <div className="text-center">
              <h3 className="text-base lg:text-lg mb-1 text-gray-800 font-bold flex items-center justify-center gap-2">
                <FaUserLock className="text-xl text-purple-600" />
                Acceso al Aula Virtual
              </h3>
              <p className="text-sm text-gray-600">
                Se le entregará el usuario y la clave de acceso al Aula Virtual.
              </p>
            </div>
          </div>
        </section>
      </section>

      <section className="bg-white py-16 px-5 lg:px-[18rem] md:px-[12rem] sm:px-[6rem] xs:px-[3rem] xxs:px-5 rounded-lg shadow-md">
        <h2 className="text-3xl lg:text-4xl text-center text-[#1231c9] font-bold mb-16">
          Formas de pago
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <img
              src={lg1.src}
              alt="BCP Logo"
              className="max-w-[120px] h-[120px] object-contain mb-4"
            />
            <p className="text-center font-semibold">
              N° CUENTA: 290-71040983-0-39 CCI:00229017104098303958
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={lg2.src}
              alt="Interbank Logo"
              className="max-w-[120px] h-[120px] object-contain mb-4"
            />
            <p className="text-center font-semibold">
              TITULAR DE CUENTA: DEIVIS SILVA MELENDEZ
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={qr.src}
              alt="Yape QR"
              className="max-w-[120px] h-[120px] object-contain mb-4"
            />
            <p className="text-center font-semibold">QR - YAPE</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Inscripcion;
