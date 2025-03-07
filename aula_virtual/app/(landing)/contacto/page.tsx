/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Banner from '../../../components/public/Banner';
import { st1 } from '../../../components/shared/images';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { JSX, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { Global } from '@/helper/Global';
import { SchemaContacto } from '../../../components/shared/Schemas';
import { Errors } from '../../../components/shared/Errors';
import { ContentMain } from '../../../components/public/estructura/ContentMain';
const Contacto = (): JSX.Element => {
  const mapStyles = {
    height: '500px',
    width: '100%',
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [loadingCorreo, setLoadingCorreo] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const enviarCorreo = async (
    values: any,
    recaptchaValue: string,
  ): Promise<void> => {
    setLoadingCorreo(true);

    const data = new FormData();
    data.append('nombres', values.nombres);
    data.append('celular', values.celular);
    data.append('mensaje', values.mensaje);
    data.append('email', values.email);
    data.append('recaptcha', recaptchaValue);

    console.log('Datos enviados al backend:', {
      nombres: values.nombres,
      celular: values.celular,
      mensaje: values.mensaje,
      email: values.email,
      recaptcha: recaptchaValue,
    });
    try {
      const respuesta = await axios.post(`${Global.url}/enviarCorreo`, data);

      if (respuesta.data.status === 'success') {
        Swal.fire('Correo enviado', '', 'success');
        resetForm();
      } else {
        Swal.fire('Error al enviar el correo', '', 'error');
        resetForm();
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error al enviar el correo', '', 'error');
    }
    setLoadingCorreo(false);
  };
  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      nombres: '',
      celular: '',
      email: '',
      mensaje: '',
    },
    validationSchema: SchemaContacto,
    onSubmit: async (values) => {
      const recaptchaValue = recaptchaRef.current?.getValue();
      console.log('Token reCAPTCHA:', recaptchaValue);

      if (!recaptchaValue) {
        Swal.fire('Por favor, completa el reCAPTCHA', '', 'warning');
        setLoadingCorreo(false);
        return;
      }
      await enviarCorreo(values, recaptchaValue);
    },
  });

  useEffect(() => {
    if (errors && isSubmitting) {
      const firstErrorKey = Object.keys(errors)[0];
      const firstErrorElement = document.getElementsByName(firstErrorKey)[0];
      if (firstErrorElement) {
        firstErrorElement.focus();
      }
    }
  }, [touched, errors, isSubmitting]);
  return (
    <>
      <Banner titulo="Contacto" imagen={`${st1.src}`} />
      <section className="px-8 lg:px-20">
          <ContentMain className="py-20">
            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-col justify-center w-full lg:w-1/2">
                <LoadScript googleMapsApiKey="AIzaSyCnURlOXZMHX5yPBdb8_Rn-m_Y8McBHEjw">
                  <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={16}
                    center={{ lat: -12.0420486, lng: -77.0436353 }}
                  >
                    <Marker
                      position={{ lat: -12.0420486, lng: -77.0436353 }}
                      icon={""}
                    />
                  </GoogleMap>
                </LoadScript>
              </div>
              <div className="w-full mt-8 lg:w-1/2 lg:pl-20 lg:mt-0">
                <h5 className="mb-10 text-3xl font-semibold text-center uppercase lg:text-4xl text-primary-main">
                  Formulario de contacto
                </h5>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4 mb-4 lg:flex-row">
                    <div className="w-full">
                      <input
                        placeholder="Nombres"
                        className="w-full p-3 border rounded-md"
                        name="nombres"
                        type="text"
                        value={values.nombres}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <Errors
                        errors={errors.nombres}
                        touched={touched.nombres}
                      />
                    </div>
                    <div className="w-full">
                      <input
                        placeholder="Asunto"
                        className="w-full p-3 border rounded-md"
                        name="asunto"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 mb-4 lg:flex-row">
                    <div className="w-full">
                      <input
                        placeholder="Email"
                        className="w-full p-3 border rounded-md"
                        name="email"
                        type="text"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <Errors errors={errors.email} touched={touched.email} />
                    </div>
                    <div className="w-full">
                      <input
                        placeholder="Celular"
                        className="w-full p-3 border rounded-md"
                        name="celular"
                        type="text"
                        value={values.celular}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <Errors
                        errors={errors.celular}
                        touched={touched.celular}
                      />
                    </div>
                  </div>
                  <textarea
                    name="mensaje"
                    className="w-full p-3 mb-4 border rounded-md"
                    placeholder="Mensaje"
                    rows={5}
                    value={values.mensaje}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  ></textarea>
                  <Errors errors={errors.mensaje} touched={touched.mensaje} />
                  <div className="mb-4">
                    <ReCAPTCHA
                      sitekey="6LfYvjUqAAAAACjMMq91FI2TkrTbRALRjoqusd-w"
                      ref={recaptchaRef}
                    />
                  </div>
                  {loadingCorreo ? (
                    <input
                      type="button"
                      value="Enviando..."
                      className="w-full p-3 rounded-md cursor-wait bg-primary-main text-white-main"
                    />
                  ) : (
                    <input
                      type="submit"
                      value="Enviar"
                      className="w-full p-3 rounded-md cursor-pointer bg-primary-main text-white-main"
                    />
                  )}
                </form>
              </div>
            </div>
          </ContentMain>
        </section>
    </>
  );
};

export default Contacto;
