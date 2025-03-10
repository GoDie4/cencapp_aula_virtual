import { verifyAlumno } from "middlewares/JWTMiddleware";
import { Router } from "express";

const router = Router();

router.get("/comentarios", verifyAlumno, );

export default router;
