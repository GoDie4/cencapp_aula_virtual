"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerAlumnoPorId = exports.deleteAlumno = exports.actualizarAlumno = exports.showAllAlumnos = exports.crearAlumno = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const crearAlumno = async (req, res) => {
    const { nombres, apellidos, celular, email, password } = req.body;
    const hashPassword = await bcrypt_1.default.hash(password, 10);
    try {
        const alumno = await prisma.usuario.create({
            data: {
                nombres: nombres,
                apellidos: apellidos,
                celular: celular,
                email: email,
                password: hashPassword,
                rolId: 2,
            },
        });
        res.status(201).json({
            message: "Alumno creado con éxito",
            alumno: alumno,
        });
    }
    catch (error) {
        console.error("Error al crear alumno:", error);
        res.status(500).json({ message: "Error al crear alumno", error: error.message });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.crearAlumno = crearAlumno;
const showAllAlumnos = async (req, res) => {
    try {
        const alumnos = await prisma.usuario.findMany({
            where: { rolId: 2 },
            include: { rol: true },
        });
        res.status(200).json({ alumnos });
    }
    catch (error) {
        console.error("Error al obtener alumnos:", error);
        res.status(500).json({ message: "Error al obtener alumnos", error: error });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.showAllAlumnos = showAllAlumnos;
const actualizarAlumno = async (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, celular, email, password } = req.body;
    try {
        const alumno = await prisma.usuario.update({
            where: { id: id },
            data: {
                nombres: nombres,
                apellidos: apellidos,
                celular: celular,
                email: email,
                password: password,
            },
        });
        res.status(200).json({
            message: "Alumno actualizado con éxito",
            alumno: alumno,
        });
    }
    catch (error) {
        console.error("Error al actualizar alumno:", error);
        res.status(500).json({ message: "Error al actualizar alumno", error: error.message });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.actualizarAlumno = actualizarAlumno;
const deleteAlumno = async (req, res) => {
    const { id } = req.params;
    try {
        const alumno = await prisma.usuario.delete({
            where: { id: id },
        });
        res.status(200).json({
            message: "Alumno eliminado con éxito",
            alumno: alumno,
        });
    }
    catch (error) {
        console.error("Error al eliminar alumno:", error);
        res.status(500).json({ message: "Error al eliminar alumno", error: error.message });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.deleteAlumno = deleteAlumno;
const obtenerAlumnoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const alumno = await prisma.usuario.findUnique({
            where: { id: id },
            include: { rol: true },
        });
        res.status(200).json({
            message: "Alumno obtenido con éxito",
            alumno: alumno,
        });
    }
    catch (error) {
        console.error("Error al obtener alumno por ID:", error);
        res.status(500).json({ message: "Error al obtener alumno", error: error.message });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.obtenerAlumnoPorId = obtenerAlumnoPorId;
//# sourceMappingURL=alumno.controller.js.map