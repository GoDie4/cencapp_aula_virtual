"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerDocumentoPorId = exports.obtenerMaterialPorId = exports.deleteMaterial = exports.actualizarMaterial = exports.showAllMateriales = exports.createMaterial = exports.uploadArchivo = void 0;
const client_1 = require("@prisma/client");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const prisma = new client_1.PrismaClient();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        let folder = "private/";
        if (file.fieldname === "archivo") {
            folder = folder + "curso/materiales";
            if (!fs_1.default.existsSync(folder)) {
                fs_1.default.mkdirSync(folder, { recursive: true });
            }
            cb(null, folder);
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path_1.default.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        files: 1,
    },
    fileFilter: function (req, file, cb) {
        // Filtro para aceptar solo ciertos tipos de archivos (imágenes en este ejemplo)
        const filetypes = /doc|docx|pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(null, false);
    },
});
exports.uploadArchivo = upload.single("archivo");
const createMaterial = async (req, res) => {
    const { nombre, descripcion, claseId } = req.body;
    if (!nombre || !descripcion || !claseId) {
        res.status(400).json({ message: "Faltan datos para crear el material." });
        return;
    }
    if (!req.file) {
        res
            .status(400)
            .json({ message: "Falta el archivo para crear el material." });
        return;
    }
    try {
        const rutaArchivo = "/" + req.file.path.replace(/\\/g, "/");
        const nuevoMaterial = await prisma.materiales.create({
            data: {
                nombre: nombre,
                descripcion: descripcion,
                claseId: claseId,
                path_archivo: rutaArchivo,
                mime_type: req.file.mimetype,
                size: req.file.size
            },
        });
        res.status(201).json({
            message: "Material creado con éxito",
            material: nuevoMaterial,
        });
    }
    catch (error) {
        console.error("Error al crear el material:", error);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
    }
};
exports.createMaterial = createMaterial;
const showAllMateriales = async (req, res) => {
    try {
        const materiales = await prisma.materiales.findMany({
            include: {
                clase: true,
            },
        });
        res.status(200).json({ materiales });
    }
    catch (error) {
        console.error("Error al obtener los materiales:", error);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
    }
};
exports.showAllMateriales = showAllMateriales;
const actualizarMaterial = async (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion, claseId, path_archivo, mime_type, size } = req.body;
    let rutaArchivo = "";
    let archivoExiste = false;
    if (!nombre || !descripcion || !path_archivo) {
        res
            .status(400)
            .json({ message: "Faltan datos para actualizar el material." });
        return;
    }
    if (req.file) {
        archivoExiste = true;
    }
    if (!req.file) {
        console.log("No hay archivo");
        archivoExiste = false;
    }
    if (archivoExiste) {
        rutaArchivo = "/" + req.file?.path.replace(/\\/g, "/");
    }
    try {
        const materialActualizado = await prisma.materiales.update({
            where: { id: parseInt(id) },
            data: {
                nombre: nombre,
                descripcion: descripcion,
                claseId: claseId,
                path_archivo: archivoExiste ? rutaArchivo : path_archivo,
                mime_type: archivoExiste ? req.file?.mimetype : mime_type,
                size: archivoExiste ? req.file?.size : size
            },
        });
        if (archivoExiste) {
            fs_1.default.unlink(path_1.default.join(process.cwd(), path_archivo), (err) => {
                console.log("Error al eliminar el archivo: ", err);
            });
        }
        res.status(200).json({
            message: "Material actualizado con éxito",
            material: materialActualizado,
        });
        return;
    }
    catch (error) {
        console.error("Error al actualizar el material:", error);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
    }
};
exports.actualizarMaterial = actualizarMaterial;
const deleteMaterial = async (req, res) => {
    const id = req.params.id;
    try {
        const material = await prisma.materiales.delete({
            where: { id: parseInt(id) },
            select: {
                path_archivo: true,
            },
        });
        if (material.path_archivo) {
            const rutaArchivo = path_1.default.join(process.cwd(), material.path_archivo);
            try {
                fs_1.default.unlink(rutaArchivo, (err) => {
                    console.log("Error al eliminar el archivo: ", err);
                });
                console.log(`Archivo eliminado: ${rutaArchivo}`);
                res.status(200).json({ message: "Material eliminado con éxito" });
                return;
            }
            catch (unlinkError) {
                console.error(`Error al eliminar archivo: ${rutaArchivo}`, unlinkError);
                res.status(404).json({ message: "Error al eliminar el archivo" });
                return;
            }
        }
        else {
            res.status(200).json({ message: "Material eliminado con éxito" });
            return;
        }
    }
    catch (error) {
        console.error("Error al eliminar el material:", error);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
    }
};
exports.deleteMaterial = deleteMaterial;
const obtenerMaterialPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const material = await prisma.materiales.findUnique({
            where: { id: parseInt(id) },
        });
        if (material) {
            // Si se encuentra la material, enviarla en la respuesta
            res.status(200).json({ material });
        }
        else {
            // Si no se encuentra la material, enviar un error 404
            res.status(404).json({ message: "Material no encontrado." });
        }
    }
    catch (error) {
        console.error("Error al obtener la material por ID:", error);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.obtenerMaterialPorId = obtenerMaterialPorId;
const obtenerDocumentoPorId = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({ message: "Falta el ID del material" });
        return;
    }
    try {
        const material = await prisma.materiales.findUnique({
            where: { id: parseInt(id) },
        });
        if (!material) {
            res.status(404).json({ message: "Material no encontrado" });
            return;
        }
        res.status(200).sendFile(process.cwd() + material.path_archivo, {
            headers: {
                "Content-Type": material.mime_type,
                "nombre": material.nombre,
            }
        });
    }
    catch (error) {
        console.error("Error al obtener el documento:", error);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
    }
};
exports.obtenerDocumentoPorId = obtenerDocumentoPorId;
//# sourceMappingURL=materiales.controller.js.map