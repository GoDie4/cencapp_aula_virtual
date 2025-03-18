"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateToken_1 = require("../middlewares/validateToken");
const user_controller_1 = require("../controllers/user.controller");
const express_1 = require("express");
const JWTMiddleware_1 = require("../middlewares/JWTMiddleware");
const validatorSchemas_middleware_1 = require("../middlewares/validatorSchemas.middleware");
const user_schema_1 = require("../schemas/user.schema");
const router = (0, express_1.Router)();
router.get("/perfil/:userId", validateToken_1.authRequired, user_controller_1.profile);
router.get("/yo", JWTMiddleware_1.verifyAlumno, user_controller_1.yo);
router.put("/editarPerfil", JWTMiddleware_1.verifyAlumno, user_controller_1.editarPerfil);
router.put("/editarContrasenaPerfil", JWTMiddleware_1.verifyAlumno, (0, validatorSchemas_middleware_1.validateSchema)(user_schema_1.cambiarContrasenaPerfilSchema), user_controller_1.cambiarContrasenaPerfil);
exports.default = router;
//# sourceMappingURL=user.routes.js.map