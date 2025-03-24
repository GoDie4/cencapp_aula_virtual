import { Router } from "express";
import { verifyAdminOrProfesor } from "../middlewares/JWTMiddleware";
import { validateSchema } from "../middlewares/validatorSchemas.middleware";
import { registrarRespuestaSchema } from "../schemas/respuesta.schema";
import {
  agregarRespuesta,
  eliminarRespuesta,
} from "../controllers/respuestas.controller";

const router = Router();

router.post(
  "/save",
  verifyAdminOrProfesor,
  validateSchema(registrarRespuestaSchema),
  agregarRespuesta
);

router.delete("/borrarRespuesta/:id", verifyAdminOrProfesor, eliminarRespuesta);

export default router;
