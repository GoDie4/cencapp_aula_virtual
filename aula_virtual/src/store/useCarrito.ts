import { Curso } from "@/interfaces/CursoInterface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CursoPedido extends Curso {
  pedido: boolean
}

export interface CarritoMercadoPago {
  id: string,
  title: string,
  unit_price: number,
  quantity: number
}

interface CarritoState {
  carritoMercadoPago: CarritoMercadoPago[]
  carrito: CursoPedido[];
  agregarCarrito: (curso: CursoPedido) => void;
  removerCarrito: (curso: CursoPedido) => void;
}

export const useCarrito = create(
  persist<CarritoState>(
    (set) => ({
      carritoMercadoPago: [],
      carrito: [],
      agregarCarrito: (curso: CursoPedido) => {
        const newCarrito: CarritoMercadoPago = {
          id: curso.id || '',
          title: curso.nombre,
          unit_price: curso.precio,
          quantity: 1
        }
        set((state) => ({
          carrito: [...state.carrito, curso],
          carritoMercadoPago: [...state.carritoMercadoPago, newCarrito]
        }));
      },
      removerCarrito: (curso: CursoPedido) => {
        set((state) => {
          if (state.carrito.length === 1) {
            return {
              carrito: [],
              carritoMercadoPago: []
            }
          }
          console.log(curso.id)
          return {
            carrito: state.carrito.filter((c) => c.id !== curso.id),
            carritoMercadoPago: state.carritoMercadoPago.filter((c) => c.id !== curso.id)
          }
        });
      },
    }),
    {
      name: "carrito",
    }
  )
);
