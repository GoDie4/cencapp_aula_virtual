import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import axios from 'axios';
import { Global } from '../../../../helper/Global';
import Swal from 'sweetalert2';
import { Loading } from '../../../shared/Loading';
import { useFormik } from 'formik';
import { TitleBriefs } from '../../../shared/TitleBriefs';
import { InputsBriefs } from '../../../shared/InputsBriefs';
import { Errors } from '../../../shared/Errors';
import {
    bannersValuesModificate,
  type ImagenState,
} from '../../../shared/Interfaces';
import { ImageUpdate } from '../../../shared/ImageUpdate';
import { toast } from 'sonner';
import { SchemaBanner } from '../../../shared/Schemas';

export const EditarBanner = (): JSX.Element => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { setTitle } = useAuth();
  const [imagen1, setImagen1] = useState('');
  const [boton1, setBoton1] = useState(false);
  const [url1, setUrl1] = useState('');
  const [imagenNueva1, SetImagenNueva1] = useState<ImagenState>({
    archivo: null,
    archivoName: '',
  });
  const [loadingComponents, setLoadingComponents] = useState(true);

  useEffect(() => {
    setTitle('Editar Banner');
    getBanner();
  }, []);

  const saveBanner = async (
    values: bannersValuesModificate,
  ): Promise<void> => {
    setLoadingComponents(true);
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('titulo', values.titulo);
    formData.append('descripcion', values.descripcion);
    if (imagenNueva1.archivo != null) {
      formData.append('imagen1', imagenNueva1.archivo);
    }
    try {
      const { data } = await axios.post(
        `${Global.url}/banners/update/${id ?? ''}`,
        formData,
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
        toast.success('Actualizado correctamente');
        navigate('/admin/banners');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error al  actualizar');
      Swal.fire('Error', '', 'error');
    }
    setLoadingComponents(false);
  };

  const getBanner = async (): Promise<void> => {
    try {
      const { data } = await axios.get(
        `${Global.url}/banners/find/${id ?? ''}`,
        {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== '' ? token : ''
            }`,
          },
        },
      );
      setValues({
        ...values,
        titulo: data.message.titulo,
        descripcion: data.message.descripcion,
      });
      setImagen1(data.message.imagen1);
      setLoadingComponents(false);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    setValues,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      titulo: '',
      descripcion: '',
    },
    validationSchema: SchemaBanner,
    onSubmit: saveBanner,
  });

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
            <div className="w-full lg:relative mb-5">
              <TitleBriefs titulo="Título" />
              <InputsBriefs
                name="titulo"
                type="text"
                value={values.titulo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.titulo} touched={touched.titulo} />
            </div>
            <div className="w-full lg:relative mb-5">
              <TitleBriefs titulo="Descripción" />
              <InputsBriefs
                name="descripcion"
                type="text"
                value={values.descripcion}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.descripcion} touched={touched.descripcion} />
            </div>
           
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-8">
            <div className="w-full ">
              <div className="w-full">
                <p>
                  Fondo<span className="text-red-500">*</span>
                </p>
              </div>
              <div className="flex-1 flex  items-center gap-4">
                <ImageUpdate
                  globalUrl="banners/uploads"
                  url={url1}
                  setUrl={setUrl1}
                  boton={boton1}
                  setBoton={setBoton1}
                  imagen={imagen1}
                  setImagen={SetImagenNueva1}
                  clase="1"
                />
              </div>
            </div>
           
          </div>

          <div className="flex gap-2 w-full justify-end">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/banners"
              className="bg-red-500 px-4 py-2 rounded-md text-white"
            >
              Cancelar
            </Link>
            <input
              type="submit"
              className="bg-green-500 text-black hover:bg-green-600 flex items-center gap-2 py-2 px-4 rounded-lg transition-colors cursor-pointer"
              value="Editar"
            />
          </div>
        </form>
      )}
    </>
  );
};
