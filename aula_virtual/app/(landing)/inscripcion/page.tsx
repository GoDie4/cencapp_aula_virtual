'use client'
import { s2 } from '../../../components/shared/images'
import Banner from '../../../components/public/Banner'
import lg1 from '../../../assets/varios/lg_bcp.jpg'
import lg2 from '../../../assets/varios/lg_paypal.png'
import qr from '../../../assets/varios/qr.png'
import { FaMoneyCheckAlt, FaFileInvoiceDollar, FaEnvelope, FaUserLock } from 'react-icons/fa'
import { JSX, useEffect } from 'react'
const Inscripcion = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Banner titulo="Inscripción" imagen={`${s2.src}`} />

      <section className="px-8 sm:px-12 md:px-24 lg:px-36 py-20">

        <h2 className="text-center text-5xl font-semibold text-[#1231c9] mb-20">
          PROCESO DE INSCRIPCIÓN
        </h2>

        <p className="text-3xl text-center mb-20">
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
         <section className="registration-section">
      <div className="registration-step">
        <div className="step-number step-orange">1</div>
        <div className="step-icon">

        </div>
        <div className="step-details">
          <h3><FaMoneyCheckAlt />Realizar el depósito o transferencia</h3>
          <p>Realice el pago a la cuenta bancaria de su preferencia.</p>
        </div>
      </div>

      <div className="registration-step">
        <div className="step-number step-blue">2</div>
        <div className="step-icon">

        </div>
        <div className="step-details">
          <h3><FaFileInvoiceDollar />Enviar comprobante de pago</h3>
          <p>Envíe el comprobante de pago a través de correo electrónico, Facebook Messenger o WhatsApp.</p>

        </div>
      </div>

      <div className="registration-step">
        <div className="step-number step-green">3</div>
        <div className="step-icon">

        </div>
        <div className="step-details">
          <h3><FaEnvelope />Confirmación de inscripción</h3>
          <p>Recibirá un correo electrónico confirmando su inscripción.</p>
        </div>
      </div>

      <div className="registration-step">
        <div className="step-number step-purple">4</div>
        <div className="step-icon">

        </div>
        <div className="step-details">
          <h3><FaUserLock />Acceso al Aula Virtual</h3>
          <p>Se le entregará el usuario y la clave de acceso al Aula Virtual.</p>
        </div>
      </div>
    </section>
      </section>

      <section className="formas-pago section">
        <h2>Formas de pago</h2>
        <div className="gridPagos">
          <div className="gridPagos__item">
            <img src={lg1.src} alt="" />
            <p>N° CUENTA: 290-71040983-0-39 CCI:00229017104098303958</p>
          </div>
          <div className="gridPagos__item">
            <img src={lg2.src} alt="" />
            <p>TITULAR DE CUENTA: DEIVIS SILVA MELENDEZ</p>
          </div>

          <div className="gridPagos__item">
            <img src={qr.src} alt="" />
            <p>QR - YAPE</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Inscripcion
