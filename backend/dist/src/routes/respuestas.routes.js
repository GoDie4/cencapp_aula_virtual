"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const JWTMiddleware_1 = require("../middlewares/JWTMiddleware");
const validatorSchemas_middleware_1 = require("../middlewares/validatorSchemas.middleware");
const respuesta_schema_1 = require("../schemas/respuesta.schema");
const respuestas_controller_1 = require("../controllers/respuestas.controller");
const router = (0, express_1.Router)();
router.post("/save", JWTMiddleware_1.verifyAdminOrProfesor, (0, validatorSchemas_middleware_1.validateSchema)(respuesta_schema_1.registrarRespuestaSchema), respuestas_controller_1.agregarRespuesta);
router.delete("/borrarRespuesta/:id", JWTMiddleware_1.verifyAdminOrProfesor, respuestas_controller_1.eliminarRespuesta);
exports.default = router;
//# sourceMappingURL=respuestas.routes.js.map