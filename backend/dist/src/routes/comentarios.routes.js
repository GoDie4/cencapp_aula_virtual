"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JWTMiddleware_1 = require("../middlewares/JWTMiddleware");
const express_1 = require("express");
const comentarios_controller_1 = require("../controllers/comentarios.controller");
const validatorSchemas_middleware_1 = require("../middlewares/validatorSchemas.middleware");
const comentario_schema_1 = require("../schemas/comentario.schema");
const router = (0, express_1.Router)();
router.get("/", JWTMiddleware_1.verifyAlumno, comentarios_controller_1.traerComentarioDeAlumno);
router.get("/allComentarios", JWTMiddleware_1.verifyAdminOrProfesor, comentarios_controller_1.traerAllComentarios);
router.post("/save", JWTMiddleware_1.verifyAlumno, JWTMiddleware_1.verificarCompraCurso, (0, validatorSchemas_middleware_1.validateSchema)(comentario_schema_1.comentarioSchema), comentarios_controller_1.registrarComentario);
router.delete("/delete/:id", JWTMiddleware_1.verifyAlumno, JWTMiddleware_1.verificarCompraCurso, comentarios_controller_1.eliminarComentario);
exports.default = router;
//# sourceMappingURL=comentarios.routes.js.map