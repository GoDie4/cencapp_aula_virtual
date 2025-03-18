"use client";
import { useCarrito } from "@/store/useCarrito";
import React from "react";
import CardCurso from "../../../../components/public/curso/CardCurso";

export const GridCarrito = () => {
  const { carrito } = useCarrito();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {carrito.map((c, idx) => (
        <CardCurso
          key={idx}
          id={String(c.id)}
          img={c.imagen}
          titulo={c.nombre}
          precio={c.precio.toString()}
          horas={`${c.horas} horas`}
          pedido1={c.pedido}
        />
      ))}
    </div>
  );
};
