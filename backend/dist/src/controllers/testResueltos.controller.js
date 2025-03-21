"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerExamenesResueltos = obtenerExamenesResueltos;
exports.obtenerExamenResueltoDocumento = obtenerExamenResueltoDocumento;
exports.colocarPuntaje = colocarPuntaje;
exports.obtenerEjerciciosResueltos = obtenerEjerciciosResueltos;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function obtenerExamenesResueltos(req, res) {
    const user = req.user;
    try {
        const testResueltos = await prisma.testResuelto.findMany({
            where: {
                userId: user.id,
                tipo_prueba: "EXAMEN"
            },
            include: {
                examen: {
                    include: {
                        curso: true
                    }
                }
            }
        });
        res.status(200).json({
            testResueltos
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Ha ocurrido un error en el servidor'
        });
    }
}
async function obtenerExamenResueltoDocumento(req, res) {
    const { testId, userId } = req.body;
    if (!testId) {
        res.status(404).json({
            message: 'No se colocó el ID del examen a revisar'
        });
        return;
    }
    try {
        const testResuelto = await prisma.testResuelto.findUnique({
            where: { id: testId, userId: userId }
        });
        if (!testResuelto) {
            res.status(404).json({
                message: 'No se ha encontrado el documento'
            });
            return;
        }
        res.status(200).sendFile(process.cwd() + testResuelto.url_archivo_resultado, {
            headers: {
                "Content-Type": testResuelto.mime_type,
                "nombre": testResuelto.id
            }
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Ocurrió un error en el servidor'
        });
        return;
    }
}
async function colocarPuntaje(req, res) {
    const { puntaje, testId } = req.body;
    try {
        await prisma.testResuelto.update({
            where: {
                id: testId
            },
            data: {
                puntaje_final: String(puntaje),
                estado: "Finalizado"
            }
        });
        res.status(200).json({
            message: 'Nota Agregada Exitosamente!'
        });
        return;
    }
    catch (e) {
        res.status(500).json({
            message: 'Ha ocurrido un error'
        });
        return;
    }
}
async function obtenerEjerciciosResueltos(req, res) {
    const user = req.user;
    try {
        const testResueltos = await prisma.testResuelto.findMany({
            where: {
                userId: user.id,
                tipo_prueba: "EJERCICIOS"
            },
            include: {
                examen: {
                    include: {
                        clase: true
                    }
                }
            }
        });
        res.status(200).json({
            testResueltos
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Ha ocurrido un error en el servidor'
        });
    }
}
//# sourceMappingURL=testResueltos.controller.js.map