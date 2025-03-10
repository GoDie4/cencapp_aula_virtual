/* eslint-disable @next/next/no-img-element */
"use client";
import { config } from "@/config/config";
import { formatUrl } from "@/logic/formateador";
import { useCarrito } from "@/store/useCarrito";
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
  pedido1
}: {
  id: string;
  img: string;
  horas: string;
  titulo: string;
  precio: string;
  pedido1?: boolean
}): JSX.Element => {
  const [pedido, setPedido] = useState(false);
  const { carrito, agregarCarrito, removerCarrito } = useCarrito();

  useEffect(() => {
    setPedido(carrito.some((c) => c.id === id));
    if (pedido1) {
      console.log(pedido1)
      setPedido(true)
    }
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
        pedido: false,
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
        pedido: true
      });
      toast.success("Curso agregado al carrito");
    }
  };



  return (
    <div className="rounded-lg group  overflow-hidden relative transition-all duration-300 shadow-md hover:before:h-full hover:after:h-full hover:before:bg-green-500 hover:after:bg-green-500 hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:w-[1px] hover:before:z-20 hover:after:absolute hover:after:top-0 hover:after:right-0 hover:after:w-[1px] hover:after:z-20 hover:img:scale-110 hover:div.vermas:clip-path-[polygon(0_0,100%_0,100%_100%,0_100%)] hover:div.vermas:animate-show">
      <Link
        href={`/curso/${formatUrl(titulo)}`}
        className="relative overflow-hidden "
      >
        <img
          src={img}
          alt=""
          width={700}
          height={400}
          className="rounded-t-lg transition-all duration-300"
        />
        <span className="absolute top-4 left-4  px-4 py-2 text-white-main bg-primary-main  rounded-md block w-fit">
          {horas} horas
        </span>
        <span className="absolute top-4 right-4  px-4 py-2 text-white-main bg-secondary-main rounded-md block w-fit">
          S/{precio}
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
