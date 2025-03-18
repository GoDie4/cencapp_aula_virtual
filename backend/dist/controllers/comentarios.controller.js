"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agregarComentario = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const agregarComentario = async (req, res) => {
    const { userId, claseId, comentario } = req.body;
    try {
        const comentarioObject = await prisma.comentarios.create({
            data: {
                comentario: comentario,
                claseId: claseId,
                userId: userId,
            },
        });
        res.status(201).json({
            message: "Comentario enviado",
            comentario: comentarioObject,
        });
    }
    catch (error) {
        console.error("Error al crear el comentario: ", error);
        res.status(500).json({
            message: "Error al crear el comentario",
            error,
        });
    }
};
exports.agregarComentario = agregarComentario;
//# sourceMappingURL=comentarios.controller.js.map