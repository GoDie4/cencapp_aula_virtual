"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarCertificadoAutomatico = exports.generarCertificado = exports.descargarCertificadoPorId = exports.uploadArchivoCertificado = void 0;
exports.traerCertificados = traerCertificados;
exports.traerCertificadosByUser = traerCertificadosByUser;
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
const pdf_lib_1 = require("pdf-lib");
const QRCode = __importStar(require("qrcode"));
const registerError_1 = require("../utils/registerError");
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
async function traerCertificadosByUser(req, res) {
    const { id } = req.params;
    console.log(id);
    try {
        const certificados = await prisma.certificados.findMany({
            where: {
                usuarioId: id,
            },
            include: {
                curso: true,
                usuario: true,
            },
        });
        console.log(certificados);
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
const generarCertificado = async (userId, cursoId) => {
    try {
        const user = await prisma.usuario.findUnique({ where: { id: userId } });
        const curso = await prisma.curso.findUnique({ where: { id: cursoId } });
        if (!user || !curso)
            throw new Error("Usuario o curso no encontrado");
        const pdfDoc = await pdf_lib_1.PDFDocument.create();
        const page = pdfDoc.addPage([842, 595]);
        // Cargar imagen de fondo usando la raíz del proyecto
        const imagePath = node_path_1.default.resolve(process.cwd(), "public/certificados/plantilla.png");
        console.log(`Ruta de la plantilla: ${imagePath}`);
        if (!fs_1.default.existsSync(imagePath)) {
            throw new Error(`La plantilla de certificado no existe en: ${imagePath}`);
        }
        const bgImage = fs_1.default.readFileSync(imagePath);
        const pngImage = await pdfDoc.embedPng(bgImage);
        page.drawImage(pngImage, { x: 0, y: 0, width: 842, height: 595 });
        // Fuente y texto centrado
        const font = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.HelveticaBold);
        const fontSize = 24;
        const text = `${user.nombres.toUpperCase()} ${user.apellidos.toUpperCase()}`;
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        const x = (page.getWidth() - textWidth) / 2;
        page.drawText(text, {
            x,
            y: 400,
            size: fontSize,
            font,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        // Nombre del curso
        const fontSizeCurso = 18;
        const textWidthCurso = font.widthOfTextAtSize(curso.nombre, fontSizeCurso);
        const xCurso = (page.getWidth() - textWidthCurso) / 2;
        page.drawText(curso.nombre, {
            x: xCurso,
            y: 313,
            size: fontSizeCurso,
            font,
        });
        // Horas del curso
        const horas = curso.horas;
        const fontSizeHoras = 14;
        const textWidthHoras = 10;
        console.log("Ancho horas: ", textWidthHoras);
        const xHoras = (page.getWidth() - textWidthHoras) / 2;
        page.drawText(horas.toString(), {
            x: xHoras,
            y: 260,
            size: fontSizeHoras,
            font,
        });
        // QR con enlace de verificación
        const qrDataUrl = await QRCode.toDataURL(`https://aula.cencapperu.com/certificados/${userId}`);
        const qrImageBytes = Buffer.from(qrDataUrl.split(",")[1], "base64");
        const qrImage = await pdfDoc.embedPng(qrImageBytes);
        const xQr = (page.getWidth() - 105) / 2;
        page.drawImage(qrImage, { x: xQr, y: 95, width: 105, height: 105 });
        // Guardar PDF en la raíz del proyecto
        const pdfBytes = await pdfDoc.save();
        const outputDir = node_path_1.default.resolve(process.cwd(), "private/curso/certificados");
        console.log(`Ruta de guardado: ${outputDir}`);
        if (!fs_1.default.existsSync(outputDir)) {
            console.log("La carpeta no existe. Creándola...");
            fs_1.default.mkdirSync(outputDir, { recursive: true });
        }
        const fileName = `certificado-${userId}-${cursoId}.pdf`;
        const outputPath = node_path_1.default.join(outputDir, fileName);
        console.log(`Guardando el certificado en: ${outputPath}`);
        try {
            fs_1.default.writeFileSync(outputPath, pdfBytes);
            console.log(`Certificado guardado exitosamente en: ${outputPath}`);
        }
        catch (err) {
            console.error("Error al guardar el archivo PDF:", err);
            throw new Error(`Error al guardar el certificado en: ${outputPath}`);
        }
    }
    catch (err) {
        (0, registerError_1.registrarError)(`Error al guardar certificado generado: ${err}`);
        console.error("Error generando el certificado:", err);
        throw err;
    }
};
exports.generarCertificado = generarCertificado;
const registrarCertificadoAutomatico = async ({ userId, cursoId, nombre, emitidoEn, }) => {
    try {
        const fs = await Promise.resolve().then(() => __importStar(require("fs")));
        // Generar nombre de archivo y rutas
        const fileName = `certificado-${userId}-${cursoId}.pdf`;
        // Ruta relativa desde el raíz del proyecto
        const relativePath = `/private/curso/certificados/${fileName}`;
        // Usar process.cwd() para obtener la raíz del proyecto
        const rootPath = process.cwd();
        const absolutePath = node_path_1.default.join(rootPath, relativePath);
        console.log(`Ruta absoluta del certificado: ${absolutePath}`);
        // Verificar si el archivo existe
        if (!fs.existsSync(absolutePath)) {
            throw new Error(`El archivo ${absolutePath} no existe.`);
        }
        // Obtener tamaño y tipo MIME desde el archivo guardado
        const stats = fs.statSync(absolutePath);
        const size = stats.size;
        const mimeType = "application/pdf";
        const nuevoCertificado = await prisma.certificados.create({
            data: {
                url_archivo: relativePath,
                nombre: nombre,
                cursoId,
                emitido_en: (emitidoEn ?? new Date()).toISOString(),
                mime_type: mimeType,
                size: size,
                usuarioId: userId,
            },
        });
        console.log("Certificado registrado en BD");
        return nuevoCertificado;
    }
    catch (error) {
        console.error("Error al registrar certificado:", error);
        (0, registerError_1.registrarError)(`Error al registrar certificado: ${error}`);
        throw new Error("Error al guardar en la base de datos");
    }
};
exports.registrarCertificadoAutomatico = registrarCertificadoAutomatico;
//# sourceMappingURL=certificados.controller.js.map