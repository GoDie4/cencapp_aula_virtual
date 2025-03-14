import { authRequired } from "../middlewares/validateToken";
import {
  cambiarContrasenaPerfil,
  editarPerfil,
  profile,
  yo,
} from "../controllers/user.controller";
import { Router } from "express";
import { verifyAlumno } from "../middlewares/JWTMiddleware";
import { validateSchema } from "../middlewares/validatorSchemas.middleware";
import { cambiarContrasenaPerfilSchema } from "../schemas/user.schema";

const router = Router();

router.get("/perfil/:userId", authRequired, profile);
router.get("/yo", verifyAlumno, yo);
router.put("/editarPerfil", verifyAlumno, editarPerfil);
router.put(
  "/editarContrasenaPerfil",
  verifyAlumno,
  validateSchema(cambiarContrasenaPerfilSchema),
  cambiarContrasenaPerfil
);

export default router;
