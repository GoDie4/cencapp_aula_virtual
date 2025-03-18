"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredAdmin = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const requiredAdmin = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Autenticación requerida" });
    }
    try {
        const usuarioExiste = await prisma.usuario.findUnique({
            where: { email: req.user.email },
            include: { rol: true },
        });
        if (!usuarioExiste)
            return res.status(401).json({ message: "Usuario no encontrado" });
        req.user = usuarioExiste;
        if (usuarioExiste.rol.nombre !== "administrador") {
            return res
                .status(403)
                .json({ message: "Acceso solo para administradores" });
        }
        next();
    }
    catch (error) {
        console.error("Error en requiredAdmin");
        return res.status(500).json({ message: error.message });
    }
};
exports.requiredAdmin = requiredAdmin;
//# sourceMappingURL=validateTokenAdmin.js.map