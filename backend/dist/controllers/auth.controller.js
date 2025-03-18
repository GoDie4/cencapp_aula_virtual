"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = exports.crearAdmin = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = __importDefault(require("../utils/jwt"));
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
            token: token
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
            token: token
        });
    }
    catch (error) {
        console.error("Error al registrar usuario", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
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
const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map