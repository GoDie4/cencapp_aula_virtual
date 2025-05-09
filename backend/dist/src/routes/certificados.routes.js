"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const certificados_controller_1 = require("../controllers/certificados.controller");
const express_1 = require("express");
const JWTMiddleware_1 = require("../middlewares/JWTMiddleware");
const router = (0, express_1.Router)();
router.get("/", JWTMiddleware_1.verifyAdmin, certificados_controller_1.traerCertificados);
router.get("/certificadosByUser/:id", certificados_controller_1.traerCertificadosByUser);
router.get("/mios", JWTMiddleware_1.verifyAlumno, certificados_controller_1.obtenerCertificadosPorUsuario);
router.post("/", JWTMiddleware_1.verifyAdmin, certificados_controller_1.uploadArchivoCertificado, certificados_controller_1.createCertificado);
router.get("/documento/:id", JWTMiddleware_1.verifyAdmin, certificados_controller_1.obtenerCertificadoPorId);
router.post("/borrarCertificado/:id", JWTMiddleware_1.verifyAdmin, certificados_controller_1.deleteCertificado);
router.get("/:id", JWTMiddleware_1.verifyAdmin, certificados_controller_1.obtenerDataCertificadoPorId);
router.post("/:id", JWTMiddleware_1.verifyAdmin, certificados_controller_1.uploadArchivoCertificado, certificados_controller_1.actualizarCertificado);
router.get("/descargarCertificadoByAlumno/:id", JWTMiddleware_1.verifyAlumno, certificados_controller_1.descargarCertificadoPorId);
exports.default = router;
//# sourceMappingURL=certificados.routes.js.map