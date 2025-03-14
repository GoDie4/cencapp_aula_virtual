import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Global } from '../../../../helper/Global'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { Errors } from '../../../shared/Errors'
import { Loading } from '../../../shared/Loading'
import { extraerIdYouTube } from '../../../../logic/extraerID'
import { ClaseValues } from '../../../shared/Interfaces'

export default function EditarClase(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loadingComponents, setLoadingComponents] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [url_video, setUrlVideo] = useState<string>("");
  const [nuevoVideoId, setNuevoVideoId] = useState<string | null>(null);

  const handleVideoId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUrlVideo(e.target.value);
    setNuevoVideoId(extraerIdYouTube(e.target.value));
  };

  const editarClase = async (values: ClaseValues): Promise<void> => {
    setLoadingComponents(true);
    const datos = {
      nombre: values.nombre,
      posicion: values.posicion,
      duracion: values.duracion,
      url_video: nuevoVideoId != "" ? nuevoVideoId : videoId,
      seccionId: values.seccionId,
    };
    /*
    const formData = new FormData()
    formData.append('nombre', values.nombre)
    formData.append('posicion', values.posicion)
    formData.append('cursoId', values.cursoId)
    */
    try {
      const { status, data } = await axios.post(
        `${Global.url}/clases/${id ?? ""}`,
        datos,
        {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== "" ? token : ""
            }`,
          },
        }
      );
      if (status !== 200) {
        toast.warning(data.message);
      } else if (status === 200) {
        toast.success("Creado correctamente");
        navigate("/admin/clases");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
    setLoadingComponents(false);
  };

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
    setValues,
  } = useFormik({
    initialValues: {
      nombre: "",
      duracion: "",
      seccionId: "",
      posicion: "",
    },
    // validationSchema: SchemaCategorias,
    onSubmit: editarClase,
  });
  const getCurso = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${Global.url}/clases/${id ?? ""}`, {
        headers: {
          Authorization: `Bearer ${
            token !== null && token !== "" ? token : ""
          }`,
        },
      });
      setValues({
        duracion: data.clase.duracion,
        nombre: data.clase.nombre,
        posicion: data.clase.posicion,
        seccionId: data.clase.seccionId,
      });
      setVideoId(data.clase.url_video);
      setLoadingComponents(false);
    } catch (error) {
      toast.error("Error al traer los datos de las clase");
      console.log(error);
    }
  };
  useEffect(() => {
    getCurso();
  }, []);
  return (
    <>
      {loadingComponents ? (
        <Loading />
      ) : (
        <form
          className="p-8 mt-4 bg-secondary-100 rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full gap-5 lg:flex-row">
            <div className="w-full mb-5 lg:w-1/3">
              <TitleBriefs titulo="Título de la clase" />
              <InputsBriefs
                name="nombre"
                type="text"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.nombre} touched={touched.nombre} />
            </div>
            <div className="w-full mb-5 lg:w-1/3">
              <TitleBriefs titulo="Duración de la clase" />
              <InputsBriefs
                name="duracion"
                type="text"
                value={values.duracion}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.duracion} touched={touched.duracion} />
            </div>
            <div className="w-full mb-5 lg:w-1/3">
              <TitleBriefs titulo="Posición de la clase" />
              <InputsBriefs
                name="posicion"
                type="text"
                value={values.posicion}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.posicion} touched={touched.posicion} />
            </div>
          </div>
          <div className="w-full mb-5">
            <TitleBriefs titulo="Url del video" />
            <InputsBriefs
              onBlur={handleBlur}
              name="videoId"
              type="text"
              onChange={handleVideoId}
              value={url_video}
            />
          </div>
          {nuevoVideoId == null && (
            <div className="w-full mb-5">
              <lite-youtube videoid={videoId}></lite-youtube>
            </div>
          )}
          {nuevoVideoId != null && (
            <div className="w-full mb-5">
              <lite-youtube videoid={nuevoVideoId}></lite-youtube>
            </div>
          )}

          <div className="flex justify-end w-full gap-2">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/clases"
              className="px-4 py-2 text-white bg-red-500 rounded-md"
            >
              Cancelar
            </Link>
            <input
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-black transition-colors bg-green-500 rounded-lg cursor-pointer hover:bg-green-600"
              value="Registrar"
            />
          </div>
        </form>
      )}
    </>
  );
}
