import { z } from "zod";

export const comentarioSchema = z.object({
  claseId: z.string({
    required_error: "El ID de la clase es requerido",
  }),
  userId: z.string({
    required_error: "El ID del usuario es requerido",
  }),
  comentario: z
    .string()
    .min(1, { message: "El comentario no puede estar vacío" })
    .max(1000, {
      message: "El comentario no puede superar los 1000 caracteres",
    }),
});
