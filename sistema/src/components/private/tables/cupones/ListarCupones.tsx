/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import axios from 'axios';
import { Global } from '../../../../helper/Global';
import { Loading } from '../../../shared/Loading';
import { Paginacion } from '../../../shared/Paginacion';

export const ListaCupones = (): JSX.Element => {
  const token = localStorage.getItem('token');
  const [cupones, setCupones] = useState([]);
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth();
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [paginaActual, setpaginaActual] = useState(1);
  const [cantidadRegistros] = useState(4);
  const navigate = useNavigate();

  const getCupones = async (): Promise<void> => {
    try {
      setLoadingComponents(true);
      const { data } = await axios.get(`${Global.url}/cupones/findAll`, {
        headers: {
          Authorization: `Bearer ${
            token !== null && token !== '' ? token : ''
          }`,
        },
      });
      console.log(data);
      setCupones(data.message);
      setTotalRegistros(data.message.length);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingComponents(false);
    }
  };

  const indexOfLastPost = paginaActual * cantidadRegistros;
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros;
  const totalPosts = cupones.length;

  const filterDate = (): never[] => {
    return cupones.slice(indexOfFirstPost, indexOfLastPost);
  };

  useEffect(() => {
    setTitle('Listado de cupones');
    getCupones();
  }, []);

  const formatDate = (isoDate: any) => {
    const date = new Date(isoDate);

    return date.toLocaleDateString('es-ES');
  };

  const updateCuponEstado = async (id: string, nuevoEstado: number): Promise<void> => {
    try {
      setLoadingComponents(true);
      const { data } = await axios.post(
        `${Global.url}/cupones/updateEstado/${id}`,
        { estado: nuevoEstado },
        {
          headers: {
            Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`,
          },
        }
      );
      console.log(data);
    getCupones();
      
    } catch (error) {
      console.error("Error al actualizar el estado del cupón:", error);
    } finally {
      setLoadingComponents(false);
    }
  };

  return (
    <>
      {loadingComponents ? (
        <Loading />
      ) : (
        <div className="bg-secondary-100 p-8 rounded-xl mt-4">
          <div className="w-full flex justify-end">
            <button
              className="bg-main text-white hover:bg-main_dark w-fit flex items-center gap-2 py-2 px-4 rounded-lg transition-colors"
              onClick={() => {
                navigate('/admin/cupones/agregar');
              }}
            >
              Agregar cupon
            </button>
          </div>
          <div className="hidden md:grid grid-cols-1 md:grid-cols-9 gap-4 mb-10 p-4">
            <h5 className="md:text-center">Código</h5>
            <h5 className="md:text-center">Tipo de Descuento</h5>
            <h5 className="md:text-center">Descuento</h5>
            <h5 className="md:text-center">Válido desde el</h5>
            <h5 className="md:text-center">Vencimiento</h5>
            <h5 className="md:text-center">Usos máximos</h5>
            <h5 className="md:text-center">Valor mínimo del pedido</h5>
            <h5 className="md:text-center">Veces usadas</h5>
            <h5 className="md:text-center">Estado</h5>

          </div>
          {filterDate().map((pro: any) => (
            <div
              className="grid grid-cols-1 md:grid-cols-9 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
              key={pro.id}
            >
              <div className="md:text-center">
                <h5 className="md:hidden text-white font-bold mb-2">Código</h5>
                <span>{pro.codigo}</span>
              </div>
              <div className="md:text-center">
                <h5 className="md:hidden text-white font-bold mb-2">
                  Tipo de Descuento
                </h5>
                <span>
                  {pro.tipoDescuento === 'montoFijo' && 'Monto Fijo'}{' '}
                  {pro.tipoDescuento === 'porcentaje' && 'Porcentaje'}
                </span>
              </div>

              <div className="md:text-center">
                <h5 className="md:hidden text-white font-bold mb-2">
                  Descuento
                </h5>
                <span>
                  {pro.tipoDescuento === 'montoFijo' &&
                    `S/ ${Number(pro.montoDescuento).toFixed(0)}`}

                  {pro.tipoDescuento === 'porcentaje' &&
                    ` ${Number(pro.porcentajeDescuento).toFixed(0)}  %`}
                </span>
              </div>

              <div className="md:text-center">
                <h5 className="md:hidden text-white font-bold mb-2">
                  Válido desde el
                </h5>
                <span>{formatDate(pro.validoDesde)}</span>
              </div>

              <div className="md:text-center">
                <h5 className="md:hidden text-white font-bold mb-2">
                  Vencimiento
                </h5>
                <span>{formatDate(pro.validoHasta)}</span>
              </div>

              <div className="md:text-center">
                <h5 className="md:hidden text-white font-bold mb-2">
                  Máximos de usos
                </h5>
                <span>{pro.maximoUsos}</span>
              </div>

              <div className="md:text-center">
                <h5 className="md:hidden text-white font-bold mb-2">
                  Valor mínimo de pedido
                </h5>
                <span>{pro.valorMinimoPedido}</span>
              </div>

              <div className="md:text-center">
                <h5 className="md:hidden text-white font-bold mb-2">
                  Veces usadas
                </h5>
                <span>{pro.cantUsos}</span>
              </div>
              <div className="md:text-center">
                <h5 className="md:hidden text-white font-bold mb-2">Estado</h5>
                {pro.estado === 1 ? (
                    <button
                    type="button"
                    className="px-5 py-1 rounded-md bg-green-500 text-main_2-900"
                    onClick={() => updateCuponEstado(pro.id, 0)}
                    >
                    Activo
                    </button>
                ) : (
                    <button
                    type="button"
                    className="px-5 py-1 rounded-md bg-red-500 text-main_2-900"
                    onClick={() => updateCuponEstado(pro.id, 1)}
                    >
                    Inactivo
                    </button>
                )}
                </div>
            </div>
          ))}

          <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between content_buttons ">
            <p className="text-md ml-1"> {totalRegistros} Registros </p>
            <Paginacion
              totalPosts={totalPosts}
              cantidadRegistros={cantidadRegistros}
              paginaActual={paginaActual}
              setpaginaActual={setpaginaActual}
            />
          </div>
        </div>
      )}
    </>
  );
};
