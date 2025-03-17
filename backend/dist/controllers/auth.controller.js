"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.cambiarContrasena = exports.recuperarContrasena = exports.login = exports.register = exports.crearAdmin = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const mail_controller_1 = require("./mail.controller");
const prisma = new client_1.PrismaClient();
const crearAdmin = async (req, res) => {
    const { nombres, apellidos, celular, email, password } = req.body;
    try {
        const usuarioExiste = await prisma.usuario.findUnique({
            where: { email },
        });
        if (usuarioExiste) {
            res.status(400).json({ message: "El usuario ya existe" });
        }
        const defaultRole = await prisma.rol.findFirst({
            where: { nombre: "administrador" },
        });
        if (!defaultRole) {
            res
                .status(500)
                .json({ message: "El rol por defecto no está configurado" });
            return;
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const nuevoUsuario = await prisma.usuario.create({
            data: {
                activo: false,
                apellidos,
                email,
                nombres,
                celular,
                password: hashPassword,
                rolId: defaultRole.id,
            },
        });
        const token = await (0, jwt_1.default)({ id: nuevoUsuario.id });
        res.cookie("token", token, {
            sameSite: "none",
            secure: true,
            httpOnly: true,
        });
        res.status(201).json({
            message: "Registrado correctamente",
            usuario: {
                id: nuevoUsuario.id,
                nombres: nuevoUsuario.nombres,
                apellidos: nuevoUsuario.apellidos,
                email: nuevoUsuario.email,
                celular: nuevoUsuario.celular,
            },
            token: token,
        });
        return;
    }
    catch (error) {
        console.error("Error al registrar usuario", error);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
    }
    finally {
        prisma.$disconnect;
    }
};
exports.crearAdmin = crearAdmin;
const register = async (req, res) => {
    const { nombres, apellidos, celular, email, password } = req.body;
    try {
        const usuarioExiste = await prisma.usuario.findUnique({
            where: { email },
        });
        if (usuarioExiste) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }
        const defaultRole = await prisma.rol.findFirst({
            where: { nombre: "estudiante" },
        });
        if (!defaultRole) {
            return res
                .status(500)
                .json({ message: "El rol por defecto no está configurado" });
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const nuevoUsuario = await prisma.usuario.create({
            data: {
                activo: false,
                apellidos,
                email,
                nombres,
                celular,
                password: hashPassword,
                rolId: defaultRole.id,
            },
        });
        const token = await (0, jwt_1.default)({ id: nuevoUsuario.id });
        res.cookie("token", token, {
            sameSite: "none",
            secure: true,
            httpOnly: true,
        });
        return res.status(201).json({
            message: "Registrado correctamente",
            usuario: {
                id: nuevoUsuario.id,
                nombres: nuevoUsuario.nombres,
                apellidos: nuevoUsuario.apellidos,
                email: nuevoUsuario.email,
                celular: nuevoUsuario.celular,
            },
            token: token,
        });
    }
    catch (error) {
        console.error("Error al registrar usuario", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password, mantenerConexion } = req.body;
    try {
        const usuarioExiste = await prisma.usuario.findFirst({
            where: { email },
        });
        if (!usuarioExiste)
            return res.status(400).json({ message: "El usuario no existe" });
        const isMatch = await bcrypt_1.default.compare(password, usuarioExiste.password);
        if (!isMatch)
            return res.status(400).json({ message: "Contraseña incorrecta" });
        const token = await (0, jwt_1.default)({ id: usuarioExiste.id });
        res.cookie("token", token, {
            sameSite: "none",
            secure: true,
            httpOnly: true,
            maxAge: mantenerConexion ? 30 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000,
        });
        const primerNombre = usuarioExiste.nombres.split(" ");
        res.json({
            message: `Bienvenido ${primerNombre[0]}`,
            usuario: {
                id: usuarioExiste.id,
                nombres: usuarioExiste.nombres,
                apellidos: usuarioExiste.apellidos,
                celular: usuarioExiste.celular,
                email: usuarioExiste.email,
                rolId: usuarioExiste.rolId
            },
            status: 200,
            token: token,
        });
    }
    catch (error) {
        console.error("Error al iniciar sesión", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.login = login;
const recuperarContrasena = async (req, res) => {
    const { email } = req.body;
    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user)
        return res.status(404).json({ message: "Correo no registrado" });
    const token = crypto_1.default.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 30);
    await prisma.passwordResetToken.create({
        data: {
            token,
            expiresAt: expires,
            userId: user.id,
        },
    });
    const resetLink = `http://localhost:3000/restablecer?token=${token}`;
    await (0, mail_controller_1.sendEmail)(email, "Recuperar contraseña", `RecuperarContrasena.html`, {
        enlace: resetLink,
        nombre: user.nombres.split(" ")[0],
    });
    res.json({
        message: "Te hemos enviado un enlace para restablecer tu contraseña.",
    });
};
exports.recuperarContrasena = recuperarContrasena;
const cambiarContrasena = async (req, res) => {
    const { token, newPassword } = req.body;
    const registro = await prisma.passwordResetToken.findUnique({
        where: { token },
    });
    if (!registro || registro.expiresAt < new Date()) {
        return res.status(400).json({ message: "Token inválido o expirado" });
    }
    const hashed = await bcrypt_1.default.hash(newPassword, 10);
    await prisma.usuario.update({
        where: { id: registro.userId },
        data: { password: hashed },
    });
    await prisma.passwordResetToken.delete({ where: { token } });
    res.json({ message: "Contraseña actualizada con éxito" });
};
exports.cambiarContrasena = cambiarContrasena;
const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });
    return res.sendStatus(200);
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map