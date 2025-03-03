import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Global } from '../../../../helper/Global';
import { Loading } from '../../../shared/Loading';
import { useFormik } from 'formik';
import { cuponSchema } from '../../../shared/Schemas';
import { TitleBriefs } from '../../../shared/TitleBriefs';
import { InputsBriefs } from '../../../shared/InputsBriefs';
import { Errors } from '../../../shared/Errors';
import { CuponValues } from '../../../shared/Interfaces';
import { toast } from 'sonner';

export const AgregarCupon = (): JSX.Element => {
  const navigate = useNavigate();
  const [loadingComponents, setLoadingComponents] = useState(false);
  const [codigoGenerado, setCodigoGenerado] = useState('');
  const saveCupon = async (values: CuponValues): Promise<void> => {
    setLoadingComponents(true);
    const token = localStorage.getItem('token');
    const dataToSend = {
      codigo: codigoGenerado,
      tipoDescuento: values.tipoDescuento,
      porcentajeDescuento:
        values.tipoDescuento === 'porcentaje'
          ? values.porcentajeDescuento
          : undefined,
      montoDescuento:
        values.tipoDescuento === 'montoFijo'
          ? values.montoDescuento
          : undefined,
      validoDesde: values.validoDesde,
      validoHasta: values.validoHasta,
      maximoUsos: values.maximoUsos,
      valorMinimoPedido: values.valorMinimoPedido,
    };

    try {
      const { data } = await axios.post(
        `${Global.url}/cupones/register`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== '' ? token : ''
            }`,
          },
        },
      );
      if (data.message == 'Complete los datos') {
        toast.warning('Complete todos los datos');
      } else if (data.message == 'success') {
        toast.success('Creado correctamente');
        navigate('/admin/cupones');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error al crear registro');
    }
    setLoadingComponents(false);
  };

  const {
    handleSubmit,
    setFieldValue,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      codigo: '',
      tipoDescuento: 'porcentaje',
      porcentajeDescuento: 0,
      montoDescuento: 0,
      validoDesde: '',
      validoHasta: '',
      maximoUsos: 0,
      valorMinimoPedido: 0,
      estaActivo: false,
      id: '',
      usosActuales: 0,
    },
    validationSchema: cuponSchema,
    onSubmit: saveCupon,
  });

  const generarCodigoCupon = (): string => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres[randomIndex];
    }
    return codigo;
  };

  const handleGenerarCodigo = () => {
    const nuevoCodigo = generarCodigoCupon();
    setCodigoGenerado(nuevoCodigo);
    setFieldValue('codigo', nuevoCodigo); // Asigna el código al input del formulario
  };

  return (
    <>
      {loadingComponents ? (
        <Loading />
      ) : (
        <form
          className="bg-secondary-100 p-8 rounded-xl mt-4"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex flex-col gap-5 lg:flex-row">
            <div className="w-full lg:1/2 flex gap-2 mb-5">
              <div className="flex-1">
                <TitleBriefs titulo="Código de cupón" />
                <InputsBriefs
                  name="codigo"
                  type="text"
                  value={values.codigo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors errors={errors.codigo} touched={touched.codigo} />
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className="bg-main text-white px-4 py-2 rounded"
                  onClick={handleGenerarCodigo}
                >
                  Generar
                </button>
              </div>
            </div>

            <div className="w-full lg:1/2 mb-5">
              <TitleBriefs titulo="Tipo de descuento" />
              <select
                name="tipoDescuento"
                value={values.tipoDescuento}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                rounded-md transition-all"
              >
                <option value="">Selecciona</option>
                <option value="porcentaje">Porcentaje</option>
                <option value="montoFijo">Monto Fijo</option>
              </select>
              <Errors
                errors={errors.tipoDescuento}
                touched={touched.tipoDescuento}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-5 lg:flex-row">
            {values.tipoDescuento === 'porcentaje' && (
              <div className="w-full lg:1/3 mb-5">
                <TitleBriefs titulo="Porcentaje de descuento" />
                <InputsBriefs
                  name="porcentajeDescuento"
                  type="number"
                  value={values.porcentajeDescuento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors
                  errors={errors.porcentajeDescuento}
                  touched={touched.porcentajeDescuento}
                />
              </div>
            )}

            {values.tipoDescuento === 'montoFijo' && (
              <div className="w-full lg:1/3 mb-5">
                <TitleBriefs titulo="Monto de descuento" />
                <InputsBriefs
                  name="montoDescuento"
                  type="number"
                  value={values.montoDescuento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors
                  errors={errors.montoDescuento}
                  touched={touched.montoDescuento}
                />
              </div>
            )}

            <div className="w-full lg:1/3 mb-5">
              <TitleBriefs titulo="Fecha de inicio" />
              <InputsBriefs
                name="validoDesde"
                type="date"
                value={values.validoDesde}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors
                errors={errors.validoDesde}
                touched={touched.validoDesde}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-5 lg:flex-row">
            <div className="w-full lg:1/3 mb-5">
              <TitleBriefs titulo="Fecha de expiración" />
              <InputsBriefs
                name="validoHasta"
                type="date"
                value={values.validoHasta}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors
                errors={errors.validoHasta}
                touched={touched.validoHasta}
              />
            </div>

            <div className="w-full lg:1/3 mb-5">
              <TitleBriefs titulo="Máximo de usos" />
              <InputsBriefs
                name="maximoUsos"
                type="number"
                value={values.maximoUsos}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.maximoUsos} touched={touched.maximoUsos} />
            </div>

            <div className="w-full lg:1/3 mb-5">
              <TitleBriefs titulo="Valor mínimo del pedido" />
              <InputsBriefs
                name="valorMinimoPedido"
                type="number"
                value={values.valorMinimoPedido}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors
                errors={errors.valorMinimoPedido}
                touched={touched.valorMinimoPedido}
              />
            </div>
          </div>

          <div className="flex gap-2 w-full justify-end mt-4">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/categorias"
              className="bg-red-500 px-4 py-2 rounded-md text-white"
            >
              Cancelar
            </Link>
            <input
              type="submit"
              className="bg-green-500 text-black hover:bg-green-600 flex items-center gap-2 py-2 px-4 rounded-lg transition-colors cursor-pointer"
              value="Registrar"
            />
          </div>
        </form>
      )}
    </>
  );
};
