import { z } from "zod";

export const createCursoSchema = z.object({
  nombre: z.string({
    required_error: "El nombre es obligatorio.",
  }).max(255, "El nombre debe tener como máximo 255 caracteres."),
  precio: z
    .number({
      required_error: "El precio es obligatorio.",
    })
    .refine(
      (value) => String(value).includes("."),
      "El precio debe ser un número decimal."
    ),
  categoriaId: z.number({
    required_error: "El ID de categoría es obligatorio.",
  }).int("El ID de categoría debe ser un número entero."),
});

export const actualizarCursoSchema = z.object({
  nombre: z.string({
    required_error: "El nombre es obligatorio.",
  }).max(255, "El nombre debe tener como máximo 255 caracteres."),
  precio: z
    .number({
      required_error: "El precio es obligatorio.",
    })
    .refine(
      (value) => String(value).includes("."),
      "El precio debe ser un número decimal."
    ),
  categoriaId: z.number({
    required_error: "El ID de categoría es obligatorio.",
  }).int("El ID de categoría debe ser un número entero."),
});