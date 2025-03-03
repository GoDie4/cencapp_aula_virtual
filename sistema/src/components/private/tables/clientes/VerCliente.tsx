/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import axios from 'axios';
import { Global } from '../../../../helper/Global';
import { Loading } from '../../../shared/Loading';
import { useFormik } from 'formik';
import { TitleBriefs } from '../../../shared/TitleBriefs';
// import { InputsBriefs } from '../../../shared/InputsBriefs'
import { SchemaTransacciones } from '../../../shared/Schemas';

export const VerCliente = (): JSX.Element => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const { setTitle } = useAuth();
  const [loadingComponents, setLoadingComponents] = useState(true);

  const getTransacciones = async (): Promise<void> => {
    try {
      const { data } = await axios.get(
        `${Global.url}/clientes/findById/${id ?? ''}`,
        {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== '' ? `${token}` : ''
            }`,
          },
        },
      );
      setValues({
        ...values,
        nombres: data.message.nombres,
        apellidos: data.message.apellidos,
        celular: data.message.celular,
        email: data.message.email,
        dni: data.message.dni,
        ruc: data.message.ruc,
        id: data.message.id,
        tipo_documento: data.message.tipo_documento,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingComponents(false);
    }
  };

  const { handleSubmit, handleChange, values, handleBlur, setValues } =
    useFormik({
      initialValues: {
        id: 0,
        nombres: '',
        apellidos: '',
        email: '',
        celular: '',
        tipo_documento: '',
        dni: '',
        ruc: '',
      },
      validationSchema: SchemaTransacciones,
      onSubmit: () => {},
    });

  useEffect(() => {
    setTitle('Cliente');
    getTransacciones();
  }, []);

  return (
    <>
      {loadingComponents ? (
        <Loading />
      ) : (
        <form className="" onSubmit={handleSubmit}>
          <div className="bg-secondary-100 p-8 rounded-xl mt-4">
            <h2 className="text-white text-lg lg:text-2xl font-bold mb-10 text-left w-full">
              DATOS DEL CLIENTE
            </h2>
            <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-2">
              <div className="w-full lg:w-1/3">
                <TitleBriefs titulo="Nombres" />
                <input
                  disabled
                  className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                  name="nombres"
                  type="text"
                  value={values.nombres}
                />
              </div>
              <div className="w-full lg:w-1/3">
                <TitleBriefs titulo="Apellidos" />
                <input
                  disabled
                  className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                  name="apellidos"
                  type="text"
                  value={values.apellidos}
                />
              </div>
              <div className="w-full lg:w-1/3">
                <TitleBriefs titulo="Email" />
                <input
                  disabled
                  className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                  name="email"
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-2">
              <div className="w-full lg:w-1/3">
                <TitleBriefs titulo="Celular" />
                <input
                  disabled
                  className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                  name="celular"
                  type="text"
                  value={values.celular}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="w-full lg:w-1/3">
                <TitleBriefs titulo="Tipo de documento" />
                <input
                  disabled
                  className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                  name="tipo_documento"
                  type="text"
                  value={values.tipo_documento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="w-full lg:w-1/3">
                <TitleBriefs titulo="DNI" />
                <input
                  disabled
                  className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                  name="dni"
                  type="text"
                  value={values.dni}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 w-full justify-end mt-4">
            <Link
              to="/admin/transacciones"
              className="bg-red-500 px-4 py-2 rounded-md text-white"
            >
              Cancelar
            </Link>
          </div>
        </form>
      )}
    </>
  );
};
