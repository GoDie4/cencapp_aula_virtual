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

      <section className="px-8 py-20 sm:px-12 md:px-24 lg:px-36">
        <h2 className="text-center text-4xl font-semibold text-[#1231c9] mb-20">
          PROCESO DE INSCRIPCIÓN
        </h2>

        <p className="mb-20 text-xl text-center">
          En CENCAPP le brindamos todas las facilidades en su proceso de
          inscripción. Además, le ofrecemos diversos medios seguros y accesibles
          para realizar el pago de su matrícula: Depósitos en bancos, agentes,
          transferencias por aplicativo y pagos en línea.
        </p>
        {/* <ol className="mx-auto text-3xl list-decimal w-fit">
          <li className='mb-4'>
            Realizar el depósito o transferencia a la cuenta bancaria de su preferencia.
          </li>
          <li className='mb-4'>
            Enviar el comprobante de pago al correo, FB Messenger o WhatsApp.
            <ul className='mt-4 pl-7'>
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
            <div className="absolute left-0 right-0 flex items-center justify-center w-10 h-10 mx-auto text-lg font-bold text-white bg-orange-500 rounded-full bottom-full">
              1
            </div>
            <div className="text-xl text-orange-500"></div>
            <div className="text-center">
              <h3 className="flex items-center justify-center gap-2 mb-1 text-base font-bold text-gray-800 lg:text-lg">
                <FaMoneyCheckAlt className="text-xl text-orange-500" />
                Realizar el depósito o transferencia
              </h3>
              <p className="text-sm text-gray-600">
                Realice el pago a la cuenta bancaria de su preferencia.
              </p>
            </div>
          </div>

          <div className="relative flex flex-col items-center gap-3">
            <div className="left-0 right-0 flex items-center justify-center w-10 h-10 mx-auto text-lg font-bold text-white bg-blue-600 rounded-full bottom-full">
              2
            </div>
            <div className="text-xl text-blue-600"></div>
            <div className="text-center">
              <h3 className="flex items-center justify-center gap-2 mb-1 text-base font-bold text-gray-800 lg:text-lg">
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
            <div className="left-0 right-0 flex items-center justify-center w-10 h-10 mx-auto text-lg font-bold text-white bg-green-600 rounded-full bottom-full">
              3
            </div>
            <div className="text-xl text-green-600"></div>
            <div className="text-center">
              <h3 className="flex items-center justify-center gap-2 mb-1 text-base font-bold text-gray-800 lg:text-lg">
                <FaEnvelope className="text-xl text-green-600" />
                Confirmación de inscripción
              </h3>
              <p className="text-sm text-gray-600">
                Recibirá un correo electrónico confirmando su inscripción.
              </p>
            </div>
          </div>

          <div className="relative flex flex-col items-center gap-3">
            <div className="left-0 right-0 flex items-center justify-center w-10 h-10 mx-auto text-lg font-bold text-white bg-purple-600 rounded-full bottom-full">
              4
            </div>
            <div className="text-xl text-purple-600"></div>
            <div className="text-center">
              <h3 className="flex items-center justify-center gap-2 mb-1 text-base font-bold text-gray-800 lg:text-lg">
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
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="flex flex-col items-center">
            <img
              src={lg1.src}
              alt="BCP Logo"
              className="max-w-[120px] h-[120px] object-contain mb-4"
            />
            <p className="font-semibold text-center">
              N° CUENTA: 290-71040983-0-39 CCI:00229017104098303958
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={lg2.src}
              alt="Interbank Logo"
              className="max-w-[120px] h-[120px] object-contain mb-4"
            />
            <p className="font-semibold text-center">
              TITULAR DE CUENTA: DEIVIS SILVA MELENDEZ
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={qr.src}
              alt="Yape QR"
              className="max-w-[120px] h-[120px] object-contain mb-4"
            />
            <p className="font-semibold text-center">QR - YAPE</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Inscripcion;
