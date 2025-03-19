"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerEjerciciosPorProfesor = exports.obtenerExamenesPorProfesor = exports.obtenerMaterialesPorProfesor = exports.obtenerCursosPorProfesor = exports.eliminarCargoCurso = exports.obtenerCargoCurso = exports.darleCargoCurso = exports.obtenerProfesorPorId = exports.deleteProfesor = exports.actualizarProfesor = exports.showAllProfesores = exports.crearProfesor = void 0;
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
    const { cursoId, profesorId } = req.body;
    console.log("cursoId: ", cursoId);
    console.log("profesorId: ", profesorId);
    if (!cursoId && !profesorId) {
        res.status(404).json({
            message: 'Faltan datos'
        });
        return;
    }
    try {
        await prisma.cursoUsuario.create({
            data: {
                cursoId: cursoId,
                userId: profesorId,
                tipo: 'CARGO',
                avance: '0',
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
const obtenerCargoCurso = async (req, res) => {
    const cursoId = req.params.id;
    console.log("cursoId: ", cursoId);
    if (!cursoId) {
        res.status(404).json({
            message: 'Faltan datos'
        });
        return;
    }
    try {
        const profesores = await prisma.cursoUsuario.findMany({
            where: {
                cursoId: cursoId,
                tipo: 'CARGO'
            },
            include: {
                usuario: true
            }
        });
        res.status(200).json({
            profesores: profesores
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
exports.obtenerCargoCurso = obtenerCargoCurso;
const eliminarCargoCurso = async (req, res) => {
    const cursoUsuarioId = req.params.id;
    console.log("cursoUsuarioId: ", cursoUsuarioId);
    if (!cursoUsuarioId) {
        res.status(404).json({
            message: 'Faltan datos'
        });
        return;
    }
    try {
        await prisma.cursoUsuario.deleteMany({
            where: {
                id: Number(cursoUsuarioId),
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
exports.eliminarCargoCurso = eliminarCargoCurso;
const obtenerCursosPorProfesor = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    if (user.id !== id) {
        res.status(401).json({
            message: 'No tienes permiso para acceder a esta información'
        });
        return;
    }
    try {
        const profesor = await prisma.cursoUsuario.findMany({
            where: {
                userId: id,
                tipo: 'CARGO',
            },
            include: {
                curso: true,
                usuario: true
            }
        });
        res.status(200).json({
            profesor: profesor
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
exports.obtenerCursosPorProfesor = obtenerCursosPorProfesor;
const obtenerMaterialesPorProfesor = async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    console.log(user.id);
    console.log(id);
    if (user.id !== id) {
        res.status(401).json({
            message: 'No tienes permiso para acceder a esta información'
        });
        return;
    }
    try {
        const materiales = await prisma.cursoUsuario.findMany({
            where: {
                userId: id,
                tipo: 'CARGO'
            },
            include: {
                curso: {
                    include: {
                        Seccion: {
                            orderBy: {
                                posicion: 'asc'
                            },
                            include: {
                                clases: {
                                    orderBy: {
                                        posicion: 'asc'
                                    },
                                    include: {
                                        materiales: {
                                            include: {
                                                clase: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        res.status(200).json({
            materiales: materiales
        });
    }
    catch (error) {
        console.error('Error al obtener materiales:', error);
        res.status(500).json({
            message: 'Ha ocurrido un error en el servidor'
        });
        return;
    }
    finally {
        prisma.$disconnect;
    }
};
exports.obtenerMaterialesPorProfesor = obtenerMaterialesPorProfesor;
const obtenerExamenesPorProfesor = async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    console.log(user.id);
    console.log(id);
    if (user.id !== id) {
        res.status(401).json({
            message: 'No tienes permiso para acceder a esta información'
        });
        return;
    }
    try {
        //const examenes = await prisma.
        const profesor = await prisma.cursoUsuario.findMany({
            where: {
                userId: id,
                tipo: 'CARGO'
            },
            include: {
                curso: {
                    include: {
                        test: {
                            include: {
                                curso: true
                            }
                        }
                    }
                }
            }
        });
        res.status(200).json({
            profesor: profesor
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los examenes de un profesor" });
        return;
    }
    finally {
        prisma.$disconnect;
    }
};
exports.obtenerExamenesPorProfesor = obtenerExamenesPorProfesor;
const obtenerEjerciciosPorProfesor = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    console.log(user.id);
    console.log(id);
    if (user.id !== id) {
        res.status(401).json({
            message: 'No tienes permiso para acceder a esta información'
        });
        return;
    }
    try {
        const ejercicios = await prisma.cursoUsuario.findMany({
            where: {
                userId: id,
                tipo: 'CARGO',
            },
            include: {
                curso: {
                    include: {
                        Seccion: {
                            orderBy: {
                                posicion: 'asc'
                            },
                            include: {
                                clases: {
                                    orderBy: {
                                        posicion: 'asc'
                                    },
                                    include: {
                                        test: {
                                            where: {
                                                tipo_prueba: 'EJERCICIOS'
                                            },
                                            include: {
                                                clase: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        res.status(200).json({
            profesor: ejercicios
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los ejercicios de un profesor" });
        return;
    }
    finally {
        prisma.$disconnect;
    }
};
exports.obtenerEjerciciosPorProfesor = obtenerEjerciciosPorProfesor;
//# sourceMappingURL=profesor.controller.js.map