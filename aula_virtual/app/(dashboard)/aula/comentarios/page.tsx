import { getServerSideProps } from "@/server/getServerSideProps";
import { TitleAula } from "../../@components/estructura/TitleAula";
import { Comentario } from "../cursos/@interfaces/InterfacesCurso";
import Link from "next/link";
import { AulaMetadata } from "@/layouts/seo/aula/AulaMetaData";
export function generateMetadata() {
  const metadata = AulaMetadata({ title: "Comentarios " });
  return metadata;
}
export default async function page() {
  const data = await getServerSideProps("comentarios");

  return (
    <div>
      <TitleAula titulo="Mis Comentarios" />
      <div className="w-full mt-5 grid sm:grid-cols-2 relative md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {data.comentarios && data.comentarios.length > 0 ? (
          data.comentarios.map((comentario: Comentario) => (
            <>
              <Link
                href={`/aula/cursos/${comentario.clase.seccion.curso.slug}/${comentario.clase.slug}`}
                className="w-full"
                key={comentario.id}
              >
                <div className="p-4 rounded-lg shadow bg-white-main">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">
                      {comentario.clase.nombre}
                    </span>
                    <span className="text-xs text-black-500">
                      {new Date(comentario.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2 text-black-800 text-sm">
                    {comentario.comentario}
                  </p>
                </div>
              </Link>
            </>
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
