import { z } from "zod";
export const comentarioSchema = z.object({
  userId: z
    .string()
    .min(1, { message: "El userId es requerido" }),
  claseId: z
    .string()
    .min(1, { message: "El claseId es requerido" }),
  comentario: z
    .string()
    .min(1, { message: "El comentario no puede estar vacío." })
    .max(500, {
      message: "El comentario no puede exceder los 500 caracteres.",
    }),
});
