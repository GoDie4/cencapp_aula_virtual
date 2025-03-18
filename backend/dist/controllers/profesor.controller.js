"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.darleCargoCurso = exports.obtenerProfesorPorId = exports.deleteProfesor = exports.actualizarProfesor = exports.showAllProfesores = exports.crearProfesor = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const crearProfesor = async (req, res) => {
    const { nombres, apellidos, celular, email, password } = req.body;
    console.log("REQ: ", req.body);
    try {
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const profesor = await prisma.usuario.create({
            data: {
                nombres: nombres,
                apellidos: apellidos,
                celular: celular,
                email: email,
                password: hashPassword,
                rolId: 3,
                activo: false,
            },
        });
        res.status(201).json({
            message: "Profesor creado con éxito",
            profesor: profesor,
        });
    }
    catch (error) {
        console.error("Error al crear profesor:", error);
        res
            .status(500)
            .json({ message: "Error al crear profesor", error: error.message });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.crearProfesor = crearProfesor;
const showAllProfesores = async (req, res) => {
    try {
        const profesores = await prisma.usuario.findMany({
            where: { rolId: 3 },
            include: { rol: true },
        });
        res.status(200).json({ profesores });
    }
    catch (error) {
        console.error("Error al obtener profesores:", error);
        res
            .status(500)
            .json({ message: "Error al obtener profesores", error: error });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.showAllProfesores = showAllProfesores;
const actualizarProfesor = async (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, celular, email, password } = req.body;
    try {
        const profesorBuscado = await prisma.usuario.findUnique({
            where: { id: id },
        });
        const profesor = await prisma.usuario.update({
            where: { id: id },
            data: {
                nombres: nombres,
                apellidos: apellidos,
                celular: celular,
                email: email,
                password: password ?? profesorBuscado?.password,
            },
        });
        res.status(200).json({
            message: "Profesor actualizado con éxito",
            profesor: profesor,
        });
    }
    catch (error) {
        console.error("Error al actualizar profesor:", error);
        res
            .status(500)
            .json({ message: "Error al actualizar profesor", error: error.message });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.actualizarProfesor = actualizarProfesor;
const deleteProfesor = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    try {
        const profesor = await prisma.usuario.delete({
            where: { id: id },
        });
        res.status(200).json({
            message: "Profesor eliminado con éxito",
            profesor: profesor,
        });
    }
    catch (error) {
        console.error("Error al eliminar profesor:", error);
        res
            .status(500)
            .json({ message: "Error al eliminar profesor", error: error.message });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.deleteProfesor = deleteProfesor;
const obtenerProfesorPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const profesor = await prisma.usuario.findUnique({
            where: { id: id },
            include: { rol: true },
        });
        res.status(200).json({
            message: "Profesor obtenido con éxito",
            profesor: profesor,
        });
    }
    catch (error) {
        console.error("Error al obtener profesor por ID:", error);
        res
            .status(500)
            .json({ message: "Error al obtener profesor", error: error.message });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.obtenerProfesorPorId = obtenerProfesorPorId;
const darleCargoCurso = async (req, res) => {
    const { cursoId, usuarioId } = req.body;
    if (!cursoId && !usuarioId) {
        res.status(404).json({
            message: 'Faltan datos'
        });
        return;
    }
    try {
        await prisma.cursoUsuario.create({
            data: {
                cursoId: cursoId,
                userId: usuarioId,
                tipo: 'CARGO',
            }
        });
        res.status(200).json({
            message: 'El procedimiento se ha completado exitosamente'
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            message: 'Ha ocurrido un error en el servidor'
        });
    }
    finally {
        prisma.$disconnect;
    }
};
exports.darleCargoCurso = darleCargoCurso;
//# sourceMappingURL=profesor.controller.js.map