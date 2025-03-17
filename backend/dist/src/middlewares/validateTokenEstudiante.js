"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireEstudiante = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const requireEstudiante = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Autenticación requerida" });
    }
    try {
        const usuarioExiste = await prisma.usuario.findUnique({
            where: { id: req.user.id },
            include: { rol: true },
        });
        if (!usuarioExiste)
            return res.status(401).json({ message: "Usuario no encontrado" });
        req.user = usuarioExiste;
        if (usuarioExiste.rol.nombre === "estudiante" ||
            usuarioExiste.rol.nombre === "administrador") {
            next();
        }
        return res.status(403).json({ message: "Acceso denegado" });
    }
    catch (error) {
        console.error("Error en requireEstudiante");
        return res.status(500).json({ message: error.message });
    }
};
exports.requireEstudiante = requireEstudiante;
//# sourceMappingURL=validateTokenEstudiante.js.map