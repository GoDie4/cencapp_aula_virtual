"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerExamenesResueltos = obtenerExamenesResueltos;
exports.obtenerExamenResueltoDocumento = obtenerExamenResueltoDocumento;
exports.colocarPuntaje = colocarPuntaje;
exports.obtenerEjerciciosResueltos = obtenerEjerciciosResueltos;
const client_1 = require("@prisma/client");
const certificados_controller_1 = require("./certificados.controller");
const mail_controller_1 = require("./mail.controller");
<<<<<<< HEAD
const registerError_1 = require("../utils/registerError");
=======
>>>>>>> ca60c47c16a9731a165cdf69796a26e570d7d3fd
const prisma = new client_1.PrismaClient();
async function obtenerExamenesResueltos(req, res) {
    const user = req.user;
    try {
        const testResueltos = await prisma.testResuelto.findMany({
            where: {
                userId: user.id,
                tipo_prueba: "EXAMEN",
            },
            include: {
                examen: {
                    include: {
                        curso: true,
                    },
                },
            },
        });
        res.status(200).json({
            testResueltos,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Ha ocurrido un error en el servidor",
        });
    }
}
async function obtenerExamenResueltoDocumento(req, res) {
    const { testId, userId } = req.body;
    if (!testId) {
        res.status(404).json({
            message: "No se colocó el ID del examen a revisar",
        });
        return;
    }
    try {
        const testResuelto = await prisma.testResuelto.findUnique({
            where: { id: testId, userId: userId },
        });
        if (!testResuelto) {
            res.status(404).json({
                message: "No se ha encontrado el documento",
            });
            return;
        }
        res
            .status(200)
            .sendFile(process.cwd() + testResuelto.url_archivo_resultado, {
            headers: {
                "Content-Type": testResuelto.mime_type,
                nombre: testResuelto.id,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Ocurrió un error en el servidor",
        });
        return;
    }
}
async function colocarPuntaje(req, res) {
    const { puntaje, testId } = req.body;
    try {
        // Actualizar el puntaje y estado
        await prisma.testResuelto.update({
            where: {
                id: testId,
            },
            data: {
                puntaje_final: String(puntaje),
                estado: "Finalizado",
            },
        });
        if (puntaje > 13) {
            const testResuelto = await prisma.testResuelto.findUnique({
                where: { id: testId },
                select: { userId: true, examen: true, usuario: true },
            });
            const user = await prisma.usuario.findUnique({
                where: {
                    id: testResuelto?.userId,
                },
            });
            if (!user) {
                res.status(404).json({
                    message: "No se encontró el usuario",
                });
                return;
            }
            if (testResuelto?.userId) {
                await (0, certificados_controller_1.generarCertificado)(testResuelto.userId, testResuelto.examen.cursoId !== null
                    ? testResuelto.examen.cursoId
                    : "");
                const curso = await prisma.curso.findUnique({
                    where: {
                        id: testResuelto.examen.cursoId !== null
                            ? testResuelto.examen.cursoId
                            : "",
                    },
                });
                await (0, certificados_controller_1.registrarCertificadoAutomatico)({
                    userId: testResuelto.userId,
                    cursoId: testResuelto.examen.cursoId !== null
                        ? testResuelto.examen.cursoId
                        : "",
                    nombre: `${testResuelto.usuario.nombres} ${testResuelto.usuario.apellidos}`, // Puedes pasarlo desde antes
                    emitidoEn: new Date(),
                });
                const aprobado = puntaje >= 13;
                const mensajeFinal = aprobado
                    ? `
    <p style="font-family:Poppins, sans-serif;line-height:21px;color:#666666;font-size:14px">
      ¡Felicidades! Has completado satisfactoriamente el curso. Tu <strong>certificado ya está disponible</strong>. Por favor ingresa a la plataforma para descargarlo
    </p>
 
  `
                    : `
    <p style="font-family:Poppins, sans-serif;line-height:21px;color:#666666;font-size:14px">
      Gracias por presentar tu examen. No alcanzaste el puntaje necesario, pero puedes volver a intentarlo pronto.
    </p>
  `;
                await (0, mail_controller_1.sendEmail)(["anthony10.reyes10@gmail.com", user?.email], "Examen calificado", `ExamenCalificado.html`, {
                    nombre_estudiante: user?.nombres + " " + user?.apellidos,
                    email: user?.email,
                    nombre_curso: curso?.nombre,
                    puntaje: puntaje,
                    mensaje_final: mensajeFinal,
                });
            }
        }
        res.status(200).json({
            message: "Nota Agregada Exitosamente!",
        });
        return;
    }
    catch (e) {
<<<<<<< HEAD
        (0, registerError_1.registrarError)(`Se genero un error ${e}`);
=======
>>>>>>> ca60c47c16a9731a165cdf69796a26e570d7d3fd
        console.error("Error al colocar puntaje:", e);
        res.status(500).json({
            message: "Ha ocurrido un error",
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
                tipo_prueba: "EJERCICIOS",
            },
            include: {
                examen: {
                    include: {
                        clase: true,
                    },
                },
            },
        });
        res.status(200).json({
            testResueltos,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Ha ocurrido un error en el servidor",
        });
    }
}
//# sourceMappingURL=testResueltos.controller.js.map