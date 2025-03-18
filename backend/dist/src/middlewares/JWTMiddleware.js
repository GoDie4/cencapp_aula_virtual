"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAlumnoNoCookie = exports.verificarCompraCurso = exports.verifyUser = exports.verifyAdminOrProfesor = exports.verifyAlumnoOrProfesor = exports.verifyProfesor = exports.verifyAlumno = exports.verifyAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const config_1 = require("../config/config");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const verifyAdmin = async (req, res, next) => {
    console.log(req.headers.authorization);
    if (!req.headers.authorization) {
        res.status(401).json({ message: "Token no proporcionado." });
        return;
    }
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token no proporcionado." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token ?? "", config_1.ENV.TOKEN_SECRET);
        console.log(decoded);
        const user = await prisma.usuario.findUnique({
            where: { id: decoded.id },
            include: { rol: true },
        });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado." });
        }
        if (user?.rolId !== 1) {
            res.status(403).json({ message: "No tienes permisos de administrador." });
        }
        req.user = user; // Agrega el usuario decodificado a la solicitud
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Token inválido." });
    }
};
exports.verifyAdmin = verifyAdmin;
const verifyAlumno = async (req, res, next) => {
    const tokenFromCookie = req.cookies?.token;
    const token = tokenFromCookie;
    if (!token) {
        res.status(401).json({ message: "Token no proporcionado." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token ?? "", config_1.ENV.TOKEN_SECRET);
        console.log(decoded);
        const user = await prisma.usuario.findUnique({
            where: { id: decoded.id },
            include: { rol: true },
        });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado." });
            return;
        }
        if (user?.rolId !== 2) {
            res.status(403).json({ message: "No tienes permisos de alumno." });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Token inválido." });
        return;
    }
};
exports.verifyAlumno = verifyAlumno;
const verifyProfesor = async (req, res, next) => {
    console.log(req.headers.authorization);
    if (!req.headers.authorization) {
        res.status(401).json({ message: "Token no proporcionado." });
        return;
    }
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token no proporcionado." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token ?? "", config_1.ENV.TOKEN_SECRET);
        console.log(decoded);
        const user = await prisma.usuario.findUnique({
            where: { id: decoded.id },
            include: { rol: true },
        });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado." });
        }
        if (user?.rolId !== 3) {
            res.status(403).json({ message: "No tienes permisos de profesor." });
        }
        req.user = user; // Agrega el usuario decodificado a la solicitud
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Token inválido." });
    }
};
exports.verifyProfesor = verifyProfesor;
const verifyAlumnoOrProfesor = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ message: "Token no proporcionado." });
        return;
    }
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token no proporcionado." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token ?? "", config_1.ENV.TOKEN_SECRET);
        const user = await prisma.usuario.findUnique({
            where: { id: decoded.id },
            include: { rol: true },
        });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado." });
            return;
        }
        if (user?.rolId !== 2 && user?.rolId !== 3) {
            res
                .status(403)
                .json({ message: "No tienes permisos de alumno o profesor." });
            return;
        }
        req.user = user; // Agrega el usuario decodificado a la solicitud
        next();
    }
    catch (error) {
        console.error("Error al verificar el rol de usuario:", error);
        res.status(500).json({ message: "Error al verificar el rol de usuario" });
        return;
    }
};
exports.verifyAlumnoOrProfesor = verifyAlumnoOrProfesor;
const verifyAdminOrProfesor = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ message: "Token no proporcionado." });
        return;
    }
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token no proporcionado." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token ?? "", config_1.ENV.TOKEN_SECRET);
        const user = await prisma.usuario.findUnique({
            where: { id: decoded.id },
            include: { rol: true },
        });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado." });
            return;
        }
        if (user?.rolId !== 1 && user?.rolId !== 3) {
            res
                .status(403)
                .json({ message: "No tienes permisos de administrador o profesor." });
            return;
        }
        req.user = user; // Agrega el usuario decodificado a la solicitud
        next();
    }
    catch (error) {
        console.error("Error al verificar el rol de usuario:", error);
        res.status(500).json({ message: "Error al verificar el rol de usuario" });
        return;
    }
};
exports.verifyAdminOrProfesor = verifyAdminOrProfesor;
const verifyUser = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ message: "Token no proporcionado." });
        return;
    }
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token no proporcionado." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token ?? "", config_1.ENV.TOKEN_SECRET);
        const user = await prisma.usuario.findUnique({
            where: { id: decoded.id },
            select: { id: true, email: true, rol: true },
        });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        req.user = user; // Agrega el usuario decodificado a la solicitud
        next();
    }
    catch (error) {
        console.error("Error al verificar el rol de usuario:", error);
        res.status(500).json({ message: "Error al verificar el rol de usuario" });
        return;
    }
};
exports.verifyUser = verifyUser;
const verificarCompraCurso = async (req, res, next) => {
    console.log("params: ", req.params);
    console.log("first:: ", req.body.claseId || req.params.claseId);
    const userId = req.user?.id;
    const cursoId = req.params.cursoId || req.body.cursoId;
    const claseId = req.params.claseId || req.body.claseId;
    const slug = req.params.slug;
    console.log({ userId, cursoId, claseId, slug });
    if (!userId || (!cursoId && !claseId && !slug)) {
        return res.status(400).json({
            message: "Faltan datos para verificar la compra del curso",
        });
    }
    try {
        let curso = null;
        if (cursoId) {
            curso = await prisma.curso.findUnique({
                where: { id: cursoId },
            });
        }
        if (!curso && slug) {
            curso = await prisma.curso.findFirst({
                where: { slug },
            });
        }
        if (!curso && claseId) {
            const clase = await prisma.clases.findUnique({
                where: { id: claseId },
                include: {
                    seccion: {
                        include: {
                            curso: true,
                        },
                    },
                },
            });
            if (clase?.seccion?.curso) {
                curso = clase.seccion.curso;
            }
        }
        if (!curso && slug) {
            const clase = await prisma.clases.findFirst({
                where: { slug },
                include: {
                    seccion: {
                        include: {
                            curso: true,
                        },
                    },
                },
            });
            if (clase?.seccion?.curso) {
                curso = clase.seccion.curso;
            }
        }
        if (!curso) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }
        const compra = await prisma.ventasDetalles.findFirst({
            where: {
                productoId: curso.id,
                venta: {
                    usuarioId: userId,
                },
            },
        });
        if (!compra) {
            return res.status(403).json({ message: "No tienes acceso a este curso" });
        }
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al verificar la compra del curso" });
    }
};
exports.verificarCompraCurso = verificarCompraCurso;
const verifyAlumnoNoCookie = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ message: "Token no proporcionado." });
        return;
    }
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token no proporcionado." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token ?? "", config_1.ENV.TOKEN_SECRET);
        const user = await prisma.usuario.findUnique({
            where: { id: decoded.id },
            include: { rol: true },
        });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        if (user?.rolId !== 2) {
            res.status(403).json({ message: "No tienes permiso de alumno" });
            return;
        }
        req.user = user; // Agrega el usuario decodificado a la solicitud
        next();
    }
    catch (error) {
        console.error("Error al verificar el rol de usuario:", error);
        res.status(500).json({ message: "Error al verificar el rol de usuario" });
        return;
    }
};
exports.verifyAlumnoNoCookie = verifyAlumnoNoCookie;
//# sourceMappingURL=JWTMiddleware.js.map