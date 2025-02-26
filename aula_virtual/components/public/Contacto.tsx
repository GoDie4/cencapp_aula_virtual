import Banner from './Banner';
import { st1 } from '../shared/images';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { Global } from '../../src/helper/Global';
import { SchemaContacto } from '../shared/Schemas';
import { Errors } from '../shared/Errors';
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
      <Banner titulo="Contacto" imagen={`${st1}`} />
      <section className="contacto">
        <div className="contacto__main">
          <div className="contacto__main__item">
            <LoadScript googleMapsApiKey="AIzaSyCnURlOXZMHX5yPBdb8_Rn-m_Y8McBHEjw">
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={16} // Nivel de zoom inicial
                center={{ lat: -12.0420486, lng: -77.0436353 }} // Coordenadas de la ubicación inicial del mapa
              >
                <Marker
                  position={{ lat: -12.0420486, lng: -77.0436353 }}
                  icon={''}
                />
              </GoogleMap>
            </LoadScript>
          </div>
          <div className="contacto__main__item">
            <h5>Formulario de contacto</h5>
            <form onSubmit={handleSubmit}>
              <div className="group-inputs">
                <div className="group-inputs-item">
                  <input
                    placeholder="Nombres"
                    className="inputForm"
                    name="nombres"
                    type="text"
                    value={values.nombres}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <Errors errors={errors.nombres} touched={touched.nombres} />
                </div>
                <div className="group-inputs-item">
                  <input
                    placeholder="Asunto"
                    className="inputForm"
                    name="asunto"
                    type="text"
                  />
                </div>
              </div>
              <div className="group-inputs">
                <div className="group-inputs-item">
                  <input
                    placeholder="Email"
                    className="inputForm"
                    name="email"
                    type="text"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <Errors errors={errors.email} touched={touched.email} />
                </div>
                <div className="group-inputs-item">
                  <input
                    placeholder="Celular"
                    className="inputForm"
                    name="celular"
                    type="text"
                    value={values.celular}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <Errors errors={errors.celular} touched={touched.celular} />
                </div>
              </div>

              <textarea
                name="mensaje"
                id=""
                className="inputForm"
                placeholder="Mensaje"
                rows={5}
                value={values.mensaje}
                onBlur={handleBlur}
                onChange={handleChange}
              ></textarea>
              <Errors errors={errors.mensaje} touched={touched.mensaje} />
              <div className="col-lg-12">
                <ReCAPTCHA
                  sitekey="6LfYvjUqAAAAACjMMq91FI2TkrTbRALRjoqusd-w"
                  ref={recaptchaRef}
                />
              </div>
              {loadingCorreo ? (
                <input
                  type="button"
                  value="Enviando..."
                  className="btn_submit"
                />
              ) : (
                <input type="submit" value="Enviar" className="btn_submit" />
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contacto;
