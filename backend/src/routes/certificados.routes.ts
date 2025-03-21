import {
  actualizarCertificado,
  createCertificado,
  deleteCertificado,
  descargarCertificadoPorId,
  obtenerCertificadoPorId,
  obtenerCertificadosPorUsuario,
  obtenerDataCertificadoPorId,
  traerCertificados,
  uploadArchivoCertificado,
} from "../controllers/certificados.controller";
import { Router } from "express";
import { verifyAdmin, verifyAlumno } from "../middlewares/JWTMiddleware";

const router = Router();


router.get("/", verifyAdmin, traerCertificados);
router.get("/mios", verifyAlumno, obtenerCertificadosPorUsuario);
router.post("/", verifyAdmin, uploadArchivoCertificado, createCertificado);
router.get("/documento/:id", verifyAdmin, obtenerCertificadoPorId);
router.post("/borrarCertificado/:id", verifyAdmin, deleteCertificado);
router.get("/:id", verifyAdmin, obtenerDataCertificadoPorId);
router.post(
  "/:id",
  verifyAdmin,
  uploadArchivoCertificado,
  actualizarCertificado
);
router.get(
  "/descargarCertificadoByAlumno/:id",
  verifyAlumno,
  descargarCertificadoPorId
);



  
export default router;
