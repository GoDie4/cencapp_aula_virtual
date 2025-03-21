import { getServerSideProps } from "@/server/getServerSideProps";
import { TitleAula } from "../../@components/estructura/TitleAula";
import { Comentario } from "../cursos/@interfaces/InterfacesCurso";
import Link from "next/link";
import { ComentariosMetadata } from "@/seo/aula/ComentariosMetaData";
export function generateMetadata() {
  const metadata = ComentariosMetadata();
  return metadata;
}
export default async function page() {
  const data = await getServerSideProps("comentarios");

  return (
    <div>
      <TitleAula titulo="Mis Comentarios" />
      <div className="w-full mt-5 grid sm:grid-cols-2 relative md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {data?.comentarios && data.comentarios.length > 0 ? (
          data.comentarios.map((comentario: Comentario) => (
            <div key={comentario.id}>
              <Link
                href={`/aula/cursos/${comentario.clase.seccion.curso.slug}/${comentario.clase.slug}`}
              >
                <div className="p-4 rounded-lg shadow pt-8 relative bg-white-main hover:shadow-md transition-all">
                  {/* Estado */}
                  {comentario.estado === "pendiente" && (
                    <span className="block absolute top-2 right-2 text-xs rounded-full px-2 py-1 bg-yellow-100 font-medium text-yellow-500">
                      Pendiente
                    </span>
                  )}
                  {comentario.estado === "respondido" && (
                    <span className="block absolute top-2 right-2 text-xs rounded-full px-2 py-1 bg-green-100 font-medium text-green-500">
                      Respondido
                    </span>
                  )}
          
                  {/* Título y fecha */}
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">
                      {comentario.clase.nombre}
                    </span>
                    <span className="text-xs text-black-500">
                      {new Date(comentario.createdAt).toLocaleDateString()}
                    </span>
                  </div>
          
                  {/* Comentario */}
                  <p className="mt-2 text-black-800 text-sm">{comentario.comentario}</p>
          
                  {/* Respuesta (si existe) */}
                  {comentario.respuestas && comentario.respuestas.length > 0 && (
                    <div className="mt-4 p-3 rounded-md bg-blue-50 border border-blue-200">
                      <p className="text-xs text-blue-600 font-semibold mb-1">Respuesta del docente:</p>
                      <p className="text-sm text-gray-800 leading-snug">
                        {comentario.respuestas[0].respuesta}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="absolute w-full left-0 right-0  text-sm text-center text-black-800">
            Aún no has realizado ningún comentario
          </p>
        )}
      </div>
    </div>
  );
}
