"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireProfesor = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const requireProfesor = async (req, res, next) => {
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
        if (usuarioExiste.rol.nombre === "profesor" ||
            usuarioExiste.rol.nombre === "administrador") {
            next();
        }
        return res.status(403).json({ message: "Acceso denegado" });
    }
    catch (error) {
        console.error("Error en requireProfesor");
        return res.status(500).json({ message: error.message });
    }
};
exports.requireProfesor = requireProfesor;
//# sourceMappingURL=validateTokenProfesor.js.map