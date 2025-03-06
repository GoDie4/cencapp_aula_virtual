/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import axios from 'axios';
import { Global } from '../../../../helper/Global';
import { RiEyeLine } from 'react-icons/ri';
import { Loading } from '../../../shared/Loading';
import { Paginacion } from '../../../shared/Paginacion';

export const ListaClientes = (): JSX.Element => {
  const token = localStorage.getItem('token');
  const [productos, setProductos] = useState([]);
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth();
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [paginaActual, setpaginaActual] = useState(1);
  const [cantidadRegistros] = useState(4);

  const getTransacciones = async (): Promise<void> => {
    try {
      setLoadingComponents(true);
      const { data } = await axios.get(`${Global.url}/clientes/findAll`, {
        headers: {
          Authorization: `Bearer ${
            token !== null && token !== '' ? token : ''
          }`,
        },
      });
      console.log(data);
      setProductos(data.message);
      setTotalRegistros(data.message.length);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingComponents(false);
    }
  };

  const indexOfLastPost = paginaActual * cantidadRegistros;
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros;
  const totalPosts = productos.length;

  const filterDate = (): never[] => {
    return productos.slice(indexOfFirstPost, indexOfLastPost);
  };

  useEffect(() => {
    setTitle('Listado de clientes');
    getTransacciones();
  }, []);

  return (
    <>
      {loadingComponents ? (
        <Loading />
      ) : (
        <div className="bg-secondary-100 p-8 rounded-xl mt-4">
          <div className="hidden md:grid grid-cols-1 md:grid-cols-6 gap-4 mb-10 p-4">
            <h5 className="md:text-center">ID</h5>
            <h5 className="md:text-center">Nombres</h5>
            <h5 className="md:text-center">Apellidos</h5>
            <h5 className="md:text-center">Email</h5>
            <h5 className="md:text-center">Celular</h5>
            <h5 className="md:text-center">Ver</h5>
          </div>
          {filterDate().map((pro: any) => (
            <div
              className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
              key={pro.id}
            >
              <div className="md:text-center">
                <h5 className="md:hidden text-white font-bold mb-2">ID</h5>
                <span>#{pro.id}</span>
              </div>
              <div className="md:text-center">
                <h5 className="md:hidden text-white font-bold mb-2">Nombres</h5>
                <span>{pro.nombres}</span>
              </div>

              <div className="md:text-center">
                <h5 className="md:hidden text-white font-bold mb-2">
                  Apellidos
                </h5>
                <span>{pro.apellidos}</span>
              </div>

              <div className="md:text-center">
                <h5 className="md:hidden text-white font-bold mb-2">Email</h5>
                <span>{pro.email}</span>
              </div>

              <div className="md:text-center">
                <h5 className="md:hidden text-white font-bold mb-2">Celular</h5>
                <span>{pro.celular}</span>
              </div>

              <div className="md:text-center md:flex md:justify-center">
                <h5 className="md:hidden text-white font-bold mb-2">VER</h5>
                <Link to={`viewCliente/${pro.id}`}>
                  <RiEyeLine className="text-2xl text-whtie" />
                </Link>
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
