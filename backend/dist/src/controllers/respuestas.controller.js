"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarRespuesta = exports.agregarRespuesta = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const agregarRespuesta = async (req, res) => {
    try {
        const { comentarioId, respuesta } = req.body;
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ error: "No autenticado" });
        }
        // Verificamos si el comentario existe
        const comentario = await prisma.comentarios.findUnique({
            where: { id: comentarioId },
        });
        if (!comentario) {
            return res.status(404).json({ error: "Comentario no encontrado" });
        }
        // Creamos la respuesta
        const nuevaRespuesta = await prisma.respuestasComentarios.create({
            data: {
                comentarioId,
                userId,
                respuesta,
            },
        });
        // Actualizamos el estado del comentario a "respondido"
        await prisma.comentarios.update({
            where: { id: comentarioId },
            data: {
                estado: "respondido",
            },
        });
        res.status(201).json(nuevaRespuesta);
    }
    catch (error) {
        console.error("Error al agregar respuesta:", error);
        res.status(500).json({ error: "Error del servidor" });
    }
};
exports.agregarRespuesta = agregarRespuesta;
const eliminarRespuesta = async (req, res) => {
    const respuestaId = req.params.id;
    const userId = req.user.id;
    if (!userId) {
        return res.status(401).json({ error: "No autenticado" });
    }
    try {
        const respuesta = await prisma.respuestasComentarios.findUnique({
            where: { id: respuestaId },
        });
        if (!respuesta) {
            return res.status(404).json({ error: "Respuesta no encontrada" });
        }
        if (respuesta.userId !== userId) {
            return res
                .status(403)
                .json({ error: "No tienes permiso para eliminar esta respuesta" });
        }
        await prisma.respuestasComentarios.delete({
            where: { id: respuestaId },
        });
        // Opcionalmente, podrías actualizar el estado del comentario si ya no hay respuestas
        const respuestasRestantes = await prisma.respuestasComentarios.findMany({
            where: { comentarioId: respuesta.comentarioId },
        });
        if (respuestasRestantes.length === 0) {
            await prisma.comentarios.update({
                where: { id: respuesta.comentarioId },
                data: {
                    estado: "pendiente",
                },
            });
        }
        res.status(200).json({ message: "Respuesta eliminada correctamente" });
    }
    catch (error) {
        console.error("Error al eliminar respuesta:", error);
        res.status(500).json({ error: "Error del servidor" });
    }
};
exports.eliminarRespuesta = eliminarRespuesta;
//# sourceMappingURL=respuestas.controller.js.map