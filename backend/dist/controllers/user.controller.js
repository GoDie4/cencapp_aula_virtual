"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecodedUser = exports.profile = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const profile = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await prisma.usuario.findFirst({
            where: { id: userId },
        });
        if (!user)
            return res.status(400).json({ message: "El usuario no existe" });
        return res.status(201).json({
            message: "Solicitud exitosa",
            usuario: {
                id: user.id,
                nombres: user.nombres,
                apellidos: user.apellidos,
                email: user.email,
                celular: user.celular,
            },
        });
    }
    catch (error) { }
};
exports.profile = profile;
const getDecodedUser = (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado en la solicitud." });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error("Error al obtener usuario decodificado:", error);
        res.status(500).json({ message: "Error interno del servidor.", error: error.message });
    }
    finally {
        prisma.$disconnect();
    }
};
exports.getDecodedUser = getDecodedUser;
//# sourceMappingURL=user.controller.js.map