"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traerComentarioDeAlumno = exports.eliminarComentario = exports.registrarComentario = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const registrarComentario = async (req, res) => {
    try {
        const { claseId, userId, comentario } = req.body;
        const nuevoComentario = await prisma.comentarios.create({
            data: {
                comentario: comentario,
                claseId: claseId,
                userId: userId,
            },
        });
        res.status(201).json(nuevoComentario);
    }
    catch (error) {
        console.error("Error al registrar el comentario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.registrarComentario = registrarComentario;
const eliminarComentario = async (req, res) => {
    const comentarioId = req.params.id;
    const userId = req.user.id;
    if (!userId) {
        return res.status(401).json({ error: "No autenticado" });
    }
    try {
        const comentario = await prisma.comentarios.findUnique({
            where: { id: comentarioId },
        });
        if (!comentario) {
            return res.status(404).json({ error: "Comentario no encontrado" });
        }
        if (comentario.userId !== userId) {
            return res
                .status(403)
                .json({ error: "No tienes permiso para eliminar este comentario" });
        }
        await prisma.comentarios.delete({
            where: { id: comentarioId },
        });
        res.status(200).json({ message: "Comentario eliminado correctamente" });
    }
    catch (error) {
        console.error("Error al eliminar comentario:", error);
        res.status(500).json({ error: "Error del servidor" });
    }
};
exports.eliminarComentario = eliminarComentario;
const traerComentarioDeAlumno = async (req, res) => {
    const userId = req.user?.id;
    try {
        const comentarios = await prisma.comentarios.findMany({
            where: {
                userId: userId,
            },
            include: {
                clase: {
                    select: {
                        nombre: true,
                        slug: true,
                        seccion: {
                            select: {
                                curso: {
                                    select: {
                                        nombre: true,
                                        slug: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        res.json({ comentarios: comentarios });
    }
    catch (error) {
        console.error("Error al obtener los comentarios del usuario:", error);
        res.status(500).json({ error: "Error del servidor" });
    }
};
exports.traerComentarioDeAlumno = traerComentarioDeAlumno;
//# sourceMappingURL=comentarios.controller.js.map