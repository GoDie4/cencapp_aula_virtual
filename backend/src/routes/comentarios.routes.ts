import { verifyAlumno } from "../middlewares/JWTMiddleware";
import { Router } from "express";
import { registrarComentario } from "../controllers/comentarios.controller";
import { validateSchema } from "../middlewares/validatorSchemas.middleware";
import { comentarioSchema } from "../schemas/comentario.schema";

const router = Router();

router.get("/comentarios", verifyAlumno);
router.post("/save", validateSchema(comentarioSchema), registrarComentario);
export default router;
