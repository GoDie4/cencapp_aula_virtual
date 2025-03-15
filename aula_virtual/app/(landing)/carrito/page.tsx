import s2 from "../../../assets/varios/c_banner.webp";
import Banner from "../../../components/public/Banner";
import { ValidarDatos } from "./@components/ValidarDatos";
import { CarritoMetadata } from "@/seo/CarritoMetaData";
import { GridCarrito } from "./@components/GridCarrito";
export function generateMetadata() {
  const metadata = CarritoMetadata();
  return metadata;
}
export default function CarritoPage() {

  return (
    <div className="w-full h-auto">
      <Banner titulo="Carrito" imagen={`${s2.src}`} />
      <main className="py-10 mx-auto w-dvw px-[120px] space-y-10">
        <h3 className="text-4xl font-bold">Pasos a seguir:</h3>
        <div className="flex items-center py-10">
          <div className="w-20 h-20 rounded-full text-lg font-bold bg-secondary-400 text-white flex justify-center items-center ring-4 ring-primary-600">
            1
          </div>
          <hr className="flex-grow border-2 border-primary-600" />
          <div className="w-20 h-20 rounded-full text-xl font-bold bg-gray-500 text-white-main text-white flex justify-center items-center ring-4 ring-primary-600">
            2
          </div>
          <hr className="flex-grow border-2 border-primary-600" />
          <div className="w-20 h-20 rounded-full text-xl font-bold bg-gray-500 text-white-main flex justify-center items-center ring-4 ring-primary-600">
            3
          </div>
        </div>
        <h3 className="text-4xl text-primary font-bold">
          Mis Cursos en Carrito
        </h3>
        <GridCarrito />
        <ValidarDatos />
      </main>
    </div>
  );
}
