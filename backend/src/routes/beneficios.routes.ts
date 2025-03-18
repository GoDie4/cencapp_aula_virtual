import { Router } from "express";
import {
  allBeneficios,
  getBeneficioById,
  agregarBeneficio,
  editarBeneficio,
  eliminarBeneficio,
  upload,
} from "../controllers/beneficios.controller";
import { verifyAdmin } from "../middlewares/JWTMiddleware";

const router = Router();

router.get("/", allBeneficios);
router.get("/:id", getBeneficioById);
router.post(
  "/",
  upload.fields([{ name: "icono", maxCount: 1 }]),
  agregarBeneficio
);
router.put(
  "/:id",
  verifyAdmin,
  upload.fields([{ name: "icono", maxCount: 1 }]),
  editarBeneficio
);
router.post("/borrarBeneficio/:id", eliminarBeneficio);

export default router;
