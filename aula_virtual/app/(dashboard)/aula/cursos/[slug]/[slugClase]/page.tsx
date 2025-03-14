import CommentComponent from "./@components/ComentariosClase";
import { getServerSideProps } from "@/server/getServerSideProps";
import { ContenedorClase } from "./@components/ContenedorClase";
import { TabsClases } from "./@components/TabsClases";
export default async function page({
  params,
}: {
  params: Promise<{ slugClase: string }>;
}) {
  const slugClase = (await params).slugClase;
  const dataClase = await getServerSideProps(`clasePorSlug/${slugClase}`);

  return (
    <>
      <div className="w-full">
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-4/5">
            <ContenedorClase dataClase={dataClase} />
            <div className="w-full px-3 lg:px-5 py-3 flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-semibold text-primary-950">
                {dataClase?.clase?.nombre}
              </h2>
            </div>
            <TabsClases dataClase={dataClase?.clase} />
          </div>
          <div className="w-full lg:w-1/5">
            <CommentComponent
              claseId={dataClase.clase.id}
              comentarios={dataClase.clase.comentarios}
            />
          </div>
        </div>
      </div>
    </>
  );
}
