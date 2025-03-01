import { z } from "zod";

export const CategoriaSchema = z.object({
  nombre: z.string({
    required_error: "El nombre es obligatorio.",
  }).max(255, "El nombre debe tener como máximo 255 caracteres."),
});