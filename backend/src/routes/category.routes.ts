
import { createCategoriaMemory, showAllCategorias, uploadImageCategoriaMemory } from "../controllers/categoria.controller";
import { Router } from "express";

const router = Router()

router.post('/crear', uploadImageCategoriaMemory ,createCategoriaMemory)
router.get('/obtener', showAllCategorias)

export default router;