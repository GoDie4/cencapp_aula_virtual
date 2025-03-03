"use client";
import { useCarrito } from "@/store/useCarrito";
import Image from "next/image";
import Link from "next/link";
import { JSX, useEffect, useState } from "react";
import { toast } from "sonner";
//import Swal from "sweetalert2"

const CardCurso = ({
  id,
  img,
  horas,
  titulo,
  precio,
}: {
  id: string;
  img: string;
  horas: string;
  titulo: string;
  precio: string;
}): JSX.Element => {
  const [pedido, setPedido] = useState(false);
  const { carrito, agregarCarrito, removerCarrito } = useCarrito();
  useEffect(() => {
    setPedido(carrito.some((c) => c.id === id));
  }, [carrito.length]);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    if (pedido) {
      removerCarrito({
        id: id,
        nombre: titulo,
        precio: parseFloat(precio),
        horas: parseInt(horas),
        imagen: img,
        categoriaId: 1,
      });
      toast.success("Curso eliminado del carrito");
    } else {
      agregarCarrito({
        id: id,
        nombre: titulo,
        precio: parseFloat(precio),
        horas: parseInt(horas),
        imagen: img,
        categoriaId: 1,
      });
      toast.success("Curso agregado al carrito");
    }
  };

  function eliminarTildes(texto: string): string {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  function formatearURL(nombre: string): string {
    // Eliminar espacios al principio y al final del nombre
    let url = nombre.trim();

    // Convertir todo el string a minúsculas
    url = url.toLowerCase();

    // Reemplazar los espacios por guiones
    url = url.replace(/ /g, "");

    // Eliminar tildes
    url = eliminarTildes(url);

    // Reemplazar caracteres especiales por sus equivalentes URL seguros
    url = url.replace(/[^a-zA-Z0-9-]/g, "");

    // Retornar la URL formateada
    return url;
  }
  return (
    <div className="rounded-lg group  overflow-hidden relative transition-all duration-300 shadow-md hover:before:h-full hover:after:h-full hover:before:bg-green-500 hover:after:bg-green-500 hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:w-[1px] hover:before:z-20 hover:after:absolute hover:after:top-0 hover:after:right-0 hover:after:w-[1px] hover:after:z-20 hover:img:scale-110 hover:div.vermas:clip-path-[polygon(0_0,100%_0,100%_100%,0_100%)] hover:div.vermas:animate-show">
      <Link
        href={`/curso/${formatearURL(titulo)}`}
        className="relative overflow-hidden "
      >
        <Image
          src={img}
          alt=""
          width={700}
          height={400}
          className="rounded-t-lg transition-all duration-300"
        />
        <span className="absolute top-4 left-4  px-4 py-2 text-white-main bg-primary-main  rounded-md block w-fit">
          {horas}
        </span>
        <span className="absolute top-4 right-4  px-4 py-2 text-white-main bg-secondary-main rounded-md block w-fit">
          S/{precio}.00
        </span>
      </Link>
      <div className="flex w-full justify-center items-center gap-2.5 p-4 relative">
        <h5 className="text-black-900 text-sm font-bold text-center uppercase my-2 line-clamp-2">
          {titulo}
        </h5>
        <div className="absolute w-full h-full  -bottom-full group-hover:bottom-0 left-0 bg-secondary-main flex items-center justify-evenly flex-wrap gap-3  transition-all duration-300">
          <button
            onClick={handleClick}
            type="button"
            title="añadir"
            className="px-6 py-3 text-sm bg-primary-main text-white-main rounded-lg w-fit"
          >
            {pedido ? "Quitar de Carrito" : "Añadir al Carrito"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCurso;
