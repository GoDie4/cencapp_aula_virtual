"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cambiarContrasenaPerfil = exports.getDecodedUser = exports.editarPerfil = exports.yo = exports.profile = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const profile = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await prisma.usuario.findUnique({
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
    catch (error) {
        res
            .status(500)
            .json({ message: "Error interno del servidor.", error: error.message });
    }
};
exports.profile = profile;
const yo = async (req, res) => {
    const userId = req.user?.id;
    try {
        const userEncontrado = await prisma.usuario.findUnique({
            where: { id: userId },
        });
        if (!userEncontrado)
            return res.status(400).json({ message: "El usuario no existe" });
        return res.status(201).json({
            message: "Solicitud exitosa",
            usuario: {
                id: userEncontrado.id,
                nombres: userEncontrado.nombres,
                apellidos: userEncontrado.apellidos,
                email: userEncontrado.email,
                celular: userEncontrado.celular,
            },
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error interno del servidor.", error: error.message });
    }
};
exports.yo = yo;
const editarPerfil = async (req, res) => {
    const userId = req.user?.id;
    const { nombres, apellidos, celular } = req.body;
    try {
        if (!nombres || !apellidos || !celular) {
            return res
                .status(400)
                .json({ error: "Falta nombres, apellidos o celular son obligatorios" });
        }
        const usuarioActualizado = await prisma.usuario.update({
            where: { id: userId },
            data: {
                nombres,
                apellidos,
                celular,
            },
        });
        res.json({
            message: "Perfil actualizado correctamente",
            usuario: usuarioActualizado,
        });
    }
    catch (error) {
        console.error("Error al actualizar perfil:", error.message);
        res.status(500).json({ error: error.message });
    }
};
exports.editarPerfil = editarPerfil;
const getDecodedUser = (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            res
                .status(404)
                .json({ message: "Usuario no encontrado en la solicitud." });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error("Error al obtener usuario decodificado:", error);
        res
            .status(500)
            .json({ message: "Error interno del servidor.", error: error.message });
    }
    finally {
        prisma.$disconnect();
    }
};
exports.getDecodedUser = getDecodedUser;
const cambiarContrasenaPerfil = async (req, res) => {
    const { newPassword } = req.body;
    const userId = req.user?.id;
    try {
        const hashed = await bcrypt_1.default.hash(newPassword, 10);
        await prisma.usuario.update({
            where: { id: userId },
            data: { password: hashed },
        });
        res.json({ message: "Contraseña actualizada con éxito" });
    }
    catch (error) {
        console.error("Error al actualizar perfil:", error.message);
        res.status(500).json({ error: error.message });
    }
};
exports.cambiarContrasenaPerfil = cambiarContrasenaPerfil;
//# sourceMappingURL=user.controller.js.map