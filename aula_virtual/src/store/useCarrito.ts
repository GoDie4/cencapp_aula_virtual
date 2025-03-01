import { Curso } from "@/interfaces/CursoInterface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CarritoState {
  carrito: Curso[];
  agregarCarrito: (curso: Curso) => void;
  removerCarrito: (curso: Curso) => void;
}

export const useCarrito = create(
  persist<CarritoState>(
    (set) => ({
      carrito: [],
      agregarCarrito: (curso: Curso) => {
        set((state) => ({
          carrito: [...state.carrito, curso],
        }));
      },
      removerCarrito: (curso: Curso) => {
        set((state) => ({
          carrito: state.carrito.filter((c) => c.id !== curso.id),
        }));
      },
    }),
    {
      name: "carrito",
    }
  )
);
