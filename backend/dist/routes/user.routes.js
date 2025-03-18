"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const express_1 = require("express");
const validateToken_1 = require("../middlewares/validateToken");
const router = (0, express_1.Router)();
router.get("/perfil/:userId", validateToken_1.authRequired, user_controller_1.profile);
exports.default = router;
//# sourceMappingURL=user.routes.js.map