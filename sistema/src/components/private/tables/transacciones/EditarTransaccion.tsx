/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import Swal from 'sweetalert2'
import { Loading } from '../../../shared/Loading'
import { useFormik } from 'formik'
import { TitleBriefs } from '../../../shared/TitleBriefs'
// import { InputsBriefs } from '../../../shared/InputsBriefs'
import { Errors } from '../../../shared/Errors'
import { SchemaTransacciones } from '../../../shared/Schemas'
import { type valuesTransaccion } from '../../../shared/Interfaces'

export const EditarTransaccion = (): JSX.Element => {
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { setTitle } = useAuth()
  const [loadingComponents, setLoadingComponents] = useState(true)
  const [estadoTransaccion, setEstadoTransaccion] = useState(null)
  useEffect(() => {
    setTitle('Transsación')
  }, [])

  const updateTransaccion = async (
    values: valuesTransaccion
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.post(
        `${Global.url}/checkout/updateEstadoTransaccion/${id ?? ''}`,
        { estado: String(values.estado) },
        {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== '' ? token : ''
            }`
          }
        }
      )
      if (data.message) {
        Swal.fire('Actualizado correctamente', '', 'success')
        navigate('/admin/transacciones')
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error', '', 'error')
    } finally {
      setLoadingComponents(false)
    }
  }

  const getTransacciones = async (): Promise<void> => {
    setLoadingComponents(true)
    try {
      const { data } = await axios.get(
        `${Global.url}/checkout/find/${id ?? ''}`,
        {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== '' ? `${token}` : ''
            }`
          }
        }
      )
      console.log(JSON.parse(data.message.cart))
      setEstadoTransaccion(data.message.estado)
      setValues({
        ...values,
        paymentId: data.message.paymentId,
        paymentDate: data.message.paymentDate,
        status: data.message.status,
        estado: data.message.estado,
        nombres: data.message.nombres,
        direccion: data.message.direccion,
        tipo_documento: data.message.tipo_documento,
        dni: data.message.dni,
        ruc: data.message.ruc,
        tipoEntrega: data.message.tipoEntrega,
        empresaCarga: data.message.empresaCarga,
        otraEmpresa: data.message.otraEmpresa,
        imagen1: data.message.imagen1,
        apellidos: data.message.apellidos,
        additionalInfo: data.message.additionalInfo,
        celular: data.message.celular,
        email: data.message.email,
        transactionAmount: data.message.transactionAmount,
        productos: data.message.cart,

        // Datos del cupón
        cupon: {
          codigo: data.message.codigo,
          tipoDescuento: data.message.tipoDescuento,
          porcentajeDescuento: data.message.porcentajeDescuento,
          montoDescuento: data.message.montoDescuento,
          validoDesde: data.message.validoDesde,
          validoHasta: data.message.validoHasta,
          maximoUsos: data.message.maximoUsos,
          valorMinimoPedido: data.message.valorMinimoPedido,
          cantUsos: data.message.cantUsos
        }
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingComponents(false)
    }
  }

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
    setValues
  } = useFormik({
    initialValues: {
      id: 0,
      paymentId: '0',
      paymentDate: '',
      nombres: '',
      apellidos: '',
      email: '',
      celular: '',
      dni: '',
      ruc: '',
      tipo_documento: '',
      status: '',
      imagen1: '',
      estado: 0,
      additionalInfo: '',
      transactionAmount: '',
      productos: '',
      direccion: '',
      empresaCarga: '',
      otraEmpresa: '',
      tipoEntrega: '',
      cupon: {
        codigo: '',
        tipoDescuento: '',
        cantUsos: 0,
        maximoUsos: 0,
        montoDescuento: 0,
        porcentajeDescuento: 0,
        validoDesde: '',
        validoHasta: '',
        valorMinimoPedido: 0
      }
    },
    validationSchema: SchemaTransacciones,
    onSubmit: updateTransaccion
  })

  useEffect(() => {
    getTransacciones()
  }, [id])
  const calcularTotalConDescuento = (
    transactionAmount: number,
    cupon: any
  ): number => {
    if (cupon.tipoDescuento === 'montoFijo') {
      // Descuento de monto fijo
      return Number(
        Math.max(transactionAmount - Number(cupon.montoDescuento), 0).toFixed(2)
      )
    } else if (cupon.tipoDescuento === 'porcentaje') {
      // Descuento en porcentaje
      const descuento = (transactionAmount * cupon.porcentajeDescuento) / 100
      return Number(Math.max(transactionAmount - descuento, 0).toFixed(2))
    }
    return transactionAmount
  }
  return (
    <>
      {loadingComponents ? (
        <Loading />
      ) : (
        <form className="" onSubmit={handleSubmit}>
          <div className="bg-secondary-100 p-8 rounded-xl mt-4">
            <h2 className="text-white text-lg lg:text-2xl font-bold mb-10 text-left w-full">
              DATOS DEL FORMULARIO
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
              <div className="w-full lg:w-2/3">
                <TitleBriefs titulo="ESTADO" />
                <select
                  className={`border border-black  placeholder-gray-400 outline-none focus:outline-none
                focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                rounded-md transition-all ${
                  values.estado == 2
                    ? 'text-green-400'
                    : values.estado == 1
                    ? 'text-main'
                    : values.estado == 0
                    ? 'text-yellow-400'
                    : ''
                }`}
                  name="estado"
                  value={values.estado}
                  disabled={estadoTransaccion == 2 || estadoTransaccion == 1}
                  autoComplete="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="0" className="text-yellow-400">
                    Por revisar
                  </option>
                  <option value="1" className="text-main">
                    Rechazado
                  </option>
                  <option value="2" className="text-green-400">
                    Aprobado
                  </option>
                </select>
                <Errors errors={errors.estado} touched={touched.estado} />
              </div>
            </div>
            <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-2">
              <div className="w-full lg:w-3/4">
                <TitleBriefs titulo="Dirección" />
                <input
                  disabled
                  className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                  name="direccion"
                  type="text"
                  value={values.direccion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="w-full lg:w-1/4">
                <TitleBriefs titulo="Tipo de entrega" />
                <input
                  disabled
                  className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                  name="tipoEntrega"
                  type="text"
                  value={values.tipoEntrega}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row gap-2">
              <div className="w-full lg:w-1/4">
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
              {values.tipo_documento === 'RUC' && (
                <div className="w-full lg:w-1/4">
                  <TitleBriefs titulo="RUC" />
                  <input
                    disabled
                    className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                    name="ruc"
                    type="text"
                    value={values.ruc}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              )}
              {values.tipo_documento === 'dni' && (
                <div className="w-full lg:w-1/4">
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
              )}
              <div className="w-full lg:w-1/4">
                <TitleBriefs titulo="Empresa de Carga" />
                <input
                  disabled
                  className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                  name="empresaCarga"
                  type="text"
                  value={values.empresaCarga}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {values.empresaCarga === 'Otro' && (
                <div className="w-full lg:w-1/4">
                  <TitleBriefs titulo="Otra empresa" />
                  <input
                    disabled
                    className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                    name="otraEmpresa"
                    type="text"
                    value={values.otraEmpresa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              )}
            </div>

            <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-2">
              <div className="w-full">
                <TitleBriefs titulo="Comentario" />
                <input
                  disabled
                  className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                  name="comentario"
                  type="text"
                  value={values.additionalInfo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          </div>

          <div className="bg-secondary-100 p-8 rounded-xl mt-10">
            <h2 className="text-white text-lg lg:text-2xl font-bold w-full text-left">
              DATOS DE LA TRANSACCIÓN
            </h2>

            <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-2 mt-4">
              <div className="w-full lg:w-1/3">
                <TitleBriefs titulo="Id transaccion" />
                <input
                  disabled
                  className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                  name="paymentId"
                  type="text"
                  value={values.paymentId}
                />
              </div>
              <div className="w-full lg:w-1/3">
                <TitleBriefs titulo="Fecha transaccion" />
                <input
                  disabled
                  className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                  name="paymentDate"
                  type="text"
                  value={values.paymentDate}
                />
              </div>

              <div className="w-full lg:w-1/3">
                <TitleBriefs titulo="Total pago" />
                <input
                  disabled
                  className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                  name="transactionAmount"
                  type="text"
                  value={values.transactionAmount}
                />
              </div>
            </div>

            <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-2 mt-4">
              <div className="w-full lg:w-1/3">
                <TitleBriefs titulo="Cupón aplicado" />
                <input
                  disabled
                  className="border border-black placeholder-gray-400 outline-none focus:outline-none
        focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
        rounded-md transition-all"
                  name="cuponAplicado"
                  type="text"
                  value={values.cupon?.codigo || 'N/A'}
                />
              </div>

              {/* Mostrar detalles del cupón solo si hay uno aplicado */}
              {values.cupon.codigo && (
                <>
                  <div className="w-full lg:w-1/3 flex flex-col lg:flex-row  gap-2">
                    <div className="w-full">
                      <TitleBriefs titulo="Tipo de Cupón:" />
                      <input
                        disabled
                        className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                        name="comentario"
                        type="text"
                        value={
                          values.cupon.tipoDescuento === 'montoFijo'
                            ? 'Descuento Fijo'
                            : 'Descuento en %'
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <p className="text-base text-white"></p>
                    </div>
                    <div className="w-full">
                      <TitleBriefs titulo="Valor de Cupón:" />
                      <input
                        disabled
                        className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                        name="comentario"
                        type="text"
                        value={
                          values.cupon.tipoDescuento === 'montoFijo'
                            ? `${values.cupon.montoDescuento}`
                            : `${values.cupon.porcentajeDescuento}%`
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>

                  <div className="w-full lg:w-1/3">
                    <TitleBriefs titulo="Total después del descuento:" />
                    <input
                      disabled
                      className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                      name="comentario"
                      type="text"
                      value={calcularTotalConDescuento(
                        Number(values.transactionAmount),
                        values.cupon
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="w-1/2">
              <p className="text-xl font-bold mb-5">Captura subida</p>
              <img
                src={`${Global.urlImages}/recursos/uploads/${values.imagen1}`}
                alt=""
                className="w-[300px] block object-contain"
              />
            </div>
          </div>

          <div className="bg-secondary-100 p-8 rounded-xl mt-10">
            <h2 className="text-white text-2xl font-bold text-left w-full">
              LISTADO DE COMPRAS{' '}
              <p className="text-sm">
                ({JSON.parse(values.productos).length} productos,{' '}
                {JSON.parse(values.productos).reduce(
                  (acc: any, producto: any) =>
                    Number(acc) + Number(producto.cantidad),
                  0
                )}{' '}
                cantidades en total)
              </p>
            </h2>
            <div className="hidden md:grid grid-cols-1 md:grid-cols-6 gap-4 mb-2 p-4">
              <h5 className="md:text-center">Código de producto</h5>
              <h5 className="md:text-center">Imagen</h5>
              <h5 className="md:text-center">Nombre</h5>
              <h5 className="md:text-center">Cantidad</h5>
              <h5 className="md:text-center">Precio U</h5>
              <h5 className="md:text-center">Subtotal</h5>
            </div>
            {values.productos &&
              JSON.parse(values.productos).map((pro: any) => (
                <div
                  className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
                  key={pro.id}
                >
                  <div className="md:text-center">
                    <h5 className="md:hidden text-white font-bold mb-2">
                      Código de producto
                    </h5>
                    <span>{pro.codigo}</span>
                  </div>
                  <div className="md:text-center">
                    <h5 className="md:hidden text-white font-bold mb-2">
                      Imagen
                    </h5>

                    <img
                      src={`${Global.urlImages}/productos/uploads/${pro.imagen1}`}
                      alt=""
                      className="block w-[100px] h-[100px] object-contain"
                    />
                  </div>
                  <div className="md:text-center">
                    <h5 className="md:hidden text-white font-bold mb-2">
                      Nombre
                    </h5>
                    <span>{pro.nombre}</span>
                  </div>
                  <div className="md:text-center">
                    <h5 className="md:hidden text-white font-bold mb-2">
                      Cantidad
                    </h5>
                    <span>{pro.cantidad}</span>
                  </div>
                  <div className="md:text-center">
                    <h5 className="md:hidden text-white font-bold mb-2">
                      Precio
                    </h5>
                    <span>S./ {pro.precio}</span>
                  </div>
                  <div className="md:text-center">
                    <h5 className="md:hidden text-white font-bold mb-2">
                      Subtotal
                    </h5>
                    <span>
                      S./ {(parseFloat(pro.precio) * pro.cantidad).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            <div className="w-full lg:relative mb-5 flex flex-col  justify-between gap-2 lg:gap-4">
              <div className="flex flex-col w-full lg:w-1/2">
                <div className="flex w-96">
                  <strong className="w-full lg:w-1/2">Pago final :</strong>
                  <p className="w-full lg:w-1/2">
                    S./{' '}
                    {calcularTotalConDescuento(
                      Number(values.transactionAmount),
                      values.cupon
                    )}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex items-center justify-left text-red-500 text-sm">
                <strong>
                  Verificar la imagen subida con sus cuentas bancarias o yape,
                  una vez realizado puede cambiar el estado de la transacción
                  para notificar al cliente.
                </strong>
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

            {estadoTransaccion == 0 && (
              <input
                type="submit"
                className="bg-green-500 text-black hover:bg-green-600 flex items-center gap-2 py-2 px-4 rounded-lg transition-colors cursor-pointer"
                value="Aceptar"
              />
            )}
          </div>
        </form>
      )}
    </>
  )
}
