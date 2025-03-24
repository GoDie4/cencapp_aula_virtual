import {
  verificarCompraCurso,
  verifyAdminOrProfesor,
  verifyAlumno,
} from "../middlewares/JWTMiddleware";
import { Router } from "express";
import {
  eliminarComentario,
  registrarComentario,
  traerAllComentarios,
  traerComentarioDeAlumno,
} from "../controllers/comentarios.controller";
import { validateSchema } from "../middlewares/validatorSchemas.middleware";
import { comentarioSchema } from "../schemas/comentario.schema";

const router = Router();

router.get("/", verifyAlumno, traerComentarioDeAlumno);

router.get("/allComentarios", verifyAdminOrProfesor, traerAllComentarios);

router.post(
  "/save",
  verifyAlumno,
  verificarCompraCurso,
  validateSchema(comentarioSchema),
  registrarComentario
);
router.delete(
  "/delete/:id",
  verifyAlumno,
  verificarCompraCurso,
  eliminarComentario
);

export default router;
