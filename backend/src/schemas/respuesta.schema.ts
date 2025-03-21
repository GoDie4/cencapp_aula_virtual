import { z } from "zod";

export const registrarRespuestaSchema = z.object({
  comentarioId: z.string(),
  respuesta: z
    .string()
    .min(1, { message: "La respuesta no puede estar vacía" })
    .max(1000, { message: "La respuesta es demasiado larga" }),
});
