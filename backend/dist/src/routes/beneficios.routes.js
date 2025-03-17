"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const beneficios_controller_1 = require("../controllers/beneficios.controller");
const JWTMiddleware_1 = require("../middlewares/JWTMiddleware");
const router = (0, express_1.Router)();
router.get("/", beneficios_controller_1.allBeneficios);
router.get("/:id", beneficios_controller_1.getBeneficioById);
router.post("/", beneficios_controller_1.upload.fields([{ name: "icono", maxCount: 1 }]), beneficios_controller_1.agregarBeneficio);
router.put("/:id", JWTMiddleware_1.verifyAdmin, beneficios_controller_1.upload.fields([{ name: "icono", maxCount: 1 }]), beneficios_controller_1.editarBeneficio);
router.post("/borrarBeneficio/:id", beneficios_controller_1.eliminarBeneficio);
exports.default = router;
//# sourceMappingURL=beneficios.routes.js.map