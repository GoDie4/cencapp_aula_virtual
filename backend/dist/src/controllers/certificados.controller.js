"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.descargarCertificadoPorId = exports.uploadArchivoCertificado = void 0;
exports.traerCertificados = traerCertificados;
exports.obtenerCertificadosPorUsuario = obtenerCertificadosPorUsuario;
exports.createCertificado = createCertificado;
exports.actualizarCertificado = actualizarCertificado;
exports.deleteCertificado = deleteCertificado;
exports.obtenerCertificadoPorId = obtenerCertificadoPorId;
exports.obtenerDataCertificadoPorId = obtenerDataCertificadoPorId;
const client_1 = require("@prisma/client");
const multer_1 = __importDefault(require("multer"));
const node_path_1 = __importDefault(require("node:path"));
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
const prisma = new client_1.PrismaClient();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        let folder = "private/";
        if (file.fieldname === "archivo") {
            folder = folder + "curso/certificados";
            if (!fs_1.default.existsSync(folder)) {
                fs_1.default.mkdirSync(folder, { recursive: true });
            }
            cb(null, folder);
        }
        else {
            throw new Error("Error");
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = node_path_1.default.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
    },
});
const uploadArchivo = (0, multer_1.default)({
    storage: storage,
    limits: {
        files: 1,
    },
    fileFilter: function (req, file, cb) {
        // Filtro para aceptar solo ciertos tipos de archivos (imágenes en este ejemplo)
        const filetypes = /pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(node_path_1.default.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(null, false);
    },
});
exports.uploadArchivoCertificado = uploadArchivo.single("archivo");
async function traerCertificados(req, res) {
    try {
        const certificados = await prisma.certificados.findMany({
            include: {
                curso: true,
                usuario: true,
            },
        });
        res.status(200).json({ certificados });
    }
    catch (e) {
        console.error(e);
        res
            .status(500)
            .json({ message: "Error interno al obtener los certificados" });
        return;
    }
}
async function obtenerCertificadosPorUsuario(req, res) {
    const userId = req.user.id;
    try {
        const certificados = await prisma.certificados.findMany({
            where: {
                usuarioId: userId,
            },
            include: {
                curso: true,
                usuario: true,
            },
        });
        res.status(200).json({ certificados });
    }
    catch (e) {
        console.error(e);
        res
            .status(500)
            .json({ message: "Error interno al obtener los certificados" });
        return;
    }
}
async function createCertificado(req, res) {
    const { nombre, cursoId, emitido_en, userId } = req.body;
    if (!nombre || !cursoId || !emitido_en) {
        res.status(400).json({ message: "Faltan datos para crear el certificado" });
        return;
    }
    if (!req.file) {
        res
            .status(400)
            .json({ message: "Falta el archivo para crear el certificado" });
        return;
    }
    const rutaArchivo = "/" + req.file.path.replace(/\\/g, "/");
    try {
        const nuevoCertificado = await prisma.certificados.create({
            data: {
                url_archivo: rutaArchivo ?? "",
                nombre: nombre,
                cursoId: cursoId ? cursoId : null,
                emitido_en: new Date(emitido_en).toISOString(),
                mime_type: req.file.mimetype,
                size: req.file.size,
                usuarioId: userId,
            },
        });
        res.status(201).json({
            message: "Certificado subido correctamente",
            test: nuevoCertificado,
        });
        return;
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error interno al subir el certificado" });
        return;
    }
}
async function actualizarCertificado(req, res) {
    const { id } = req.params;
    const { nombre, cursoId, emitido_en, userId } = req.body;
    if (!nombre || !cursoId || !emitido_en || !userId) {
        res
            .status(400)
            .json({ message: "Faltan datos para actualizar el certificado" });
        return;
    }
    const certificadoExiste = await prisma.certificados.findUnique({
        where: { id: id },
    });
    if (!certificadoExiste) {
        res.status(404).json({ message: "Certificado no encontrado" });
        return;
    }
    if (req.file?.filename) {
        const rutaArchivo = "/" + req.file.path.replace(/\\/g, "/");
        try {
            const nuevoCertificado = await prisma.certificados.update({
                where: { id: id },
                data: {
                    url_archivo: rutaArchivo ?? "",
                    nombre: nombre,
                    emitido_en: emitido_en,
                    usuarioId: userId,
                    mime_type: req.file.mimetype
                        ? req.file.mimetype
                        : certificadoExiste.mime_type,
                    size: req.file.size ? req.file.size : certificadoExiste.size,
                },
            });
            if (certificadoExiste.url_archivo) {
                const rutaArchivoNuevo = node_path_1.default.join(process.cwd(), certificadoExiste.url_archivo);
                try {
                    await promises_1.default.unlink(rutaArchivoNuevo);
                    console.log(`Archivo eliminado: ${rutaArchivoNuevo}`);
                }
                catch (unlinkError) {
                    console.error(`Error al eliminar archivo: ${rutaArchivoNuevo}`, unlinkError);
                }
            }
            res.status(200).json({
                message: "Certificado actualizado con éxito",
                certificado: nuevoCertificado,
            });
            return;
        }
        catch (e) {
            console.error(e);
            res
                .status(500)
                .json({ message: "Error interno al actualizar el certificado" });
            return;
        }
    }
    else {
        await prisma.certificados.update({
            where: { id: id },
            data: {
                nombre: nombre,
                emitido_en: emitido_en,
                cursoId: cursoId,
                usuarioId: userId,
            },
        });
        res.status(200).json({ message: "Certificado actualizado con éxito" });
        return;
    }
}
async function deleteCertificado(req, res) {
    const { id } = req.params;
    try {
        const certificado = await prisma.certificados.delete({
            where: { id },
            select: {
                url_archivo: true,
            },
        });
        if (certificado.url_archivo) {
            const rutaArchivo = node_path_1.default.join(process.cwd(), certificado.url_archivo);
            try {
                await promises_1.default.unlink(rutaArchivo);
                console.log(`Archivo eliminado: ${rutaArchivo}`);
            }
            catch (unlinkError) {
                console.error(`Error al eliminar archivo: ${rutaArchivo}`, unlinkError);
                return res.status(500).json({
                    message: "Certificado eliminado, pero error al eliminar el archivo físico.",
                });
            }
        }
        return res.status(200).json({ message: "Certificado eliminado con éxito" });
    }
    catch (e) {
        console.error(e);
        return res
            .status(500)
            .json({ message: "Error interno al eliminar el certificado" });
    }
}
async function obtenerCertificadoPorId(req, res) {
    const { id } = req.params;
    try {
        const certificadoExiste = await prisma.certificados.findUnique({
            where: { id: id },
        });
        if (!certificadoExiste) {
            res.status(404).json({ message: "Certificado no encontrado" });
            return;
        }
        res.status(200).sendFile(process.cwd() + certificadoExiste.url_archivo, {
            headers: {
                "Content-Type": certificadoExiste.mime_type,
                nombre: certificadoExiste.nombre,
            },
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error interno al obtener el documento" });
        return;
    }
}
async function obtenerDataCertificadoPorId(req, res) {
    const { id } = req.params;
    try {
        const certificado = await prisma.certificados.findUnique({
            where: { id: id },
            include: {
                curso: true,
                usuario: true,
            },
        });
        res.status(200).json({ certificado });
    }
    catch (e) {
        console.error(e);
        res
            .status(500)
            .json({ message: "Error interno al obtener el certificado" });
        return;
    }
}
const descargarCertificadoPorId = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({ message: "Falta el ID del material" });
        return;
    }
    try {
        const certificado = await prisma.certificados.findUnique({
            where: { id: id },
        });
        if (!certificado) {
            res.status(404).json({ message: "Certificado no encontrado" });
            return;
        }
        res.status(200).sendFile(process.cwd() + certificado.url_archivo, {
            headers: {
                "Content-Type": certificado.mime_type,
                nombre: certificado.nombre,
            },
        });
    }
    catch (error) {
        console.error("Error al obtener el documento:", error);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
    }
};
exports.descargarCertificadoPorId = descargarCertificadoPorId;
//# sourceMappingURL=certificados.controller.js.map