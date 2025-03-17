"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarBeneficio = exports.editarBeneficio = exports.agregarBeneficio = exports.getBeneficioById = exports.allBeneficios = exports.upload = void 0;
const client_1 = require("@prisma/client");
const multer_1 = __importDefault(require("multer"));
const node_path_1 = __importDefault(require("node:path"));
const promises_1 = __importDefault(require("fs/promises"));
const prisma = new client_1.PrismaClient();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        let folder = "public/";
        if (file.fieldname === "icono") {
            folder = "public/beneficios/iconos/";
        }
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = node_path_1.default.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
const allBeneficios = async (_req, res) => {
    const beneficios = await prisma.beneficio.findMany({
        include: { curso: true },
    });
    res.json(beneficios);
};
exports.allBeneficios = allBeneficios;
const getBeneficioById = async (req, res) => {
    const { id } = req.params;
    const beneficio = await prisma.beneficio.findUnique({
        where: { id: Number(id) },
        include: { curso: true },
    });
    if (!beneficio)
        return res.status(404).json({ error: "Beneficio no encontrado" });
    res.json(beneficio);
};
exports.getBeneficioById = getBeneficioById;
const agregarBeneficio = async (req, res) => {
    const { texto, cursoId } = req.body;
    console.log(req.files);
    const files = req.files;
    if (!req.files) {
        res.status(400).json({
            message: "Falta el icono para el beneficio.",
        });
        return;
    }
    let urlImagenPath = null;
    if (files["icono"] && files["icono"][0]) {
        urlImagenPath = files["icono"][0].path;
        urlImagenPath = "/" + files["icono"][0].path.replace(/\\/g, "/");
    }
    const nuevoBeneficio = await prisma.beneficio.create({
        data: {
            icono: urlImagenPath ?? "",
            texto,
            cursoId,
        },
    });
    res.status(201).json(nuevoBeneficio);
};
exports.agregarBeneficio = agregarBeneficio;
const editarBeneficio = async (req, res) => {
    const { id } = req.params;
    const { texto, cursoId } = req.body;
    const files = req.files;
    let urlImagenPath = null;
    const beneficioExiste = await prisma.beneficio.findUnique({
        where: { id: Number(id) },
    });
    if (files && files["icono"] && files["icono"][0]) {
        urlImagenPath = "/" + files["icono"][0].path.replace(/\\/g, "/");
    }
    const beneficioActualizado = await prisma.beneficio.update({
        where: { id: Number(id) },
        data: {
            icono: urlImagenPath !== null ? urlImagenPath : beneficioExiste?.icono,
            texto,
            cursoId,
        },
    });
    if (files && files["icono"] && beneficioExiste?.icono) {
        const filePathToDelete = node_path_1.default.join(process.cwd(), beneficioExiste.icono);
        try {
            await promises_1.default.unlink(filePathToDelete);
            console.log(`Archivo viejo de imagen borrado: ${filePathToDelete}`);
        }
        catch (unlinkError) {
            if (unlinkError.code !== "ENOENT") {
                console.error("Error al borrar archivo viejo de imagen:", unlinkError);
            }
            return;
        }
    }
    res.json(beneficioActualizado);
};
exports.editarBeneficio = editarBeneficio;
const eliminarBeneficio = async (req, res) => {
    const { id } = req.params;
    const beneficioExiste = await prisma.beneficio.findUnique({
        where: { id: Number(id) },
    });
    try {
        if (beneficioExiste?.icono) {
            const rutaImagen = node_path_1.default.join(process.cwd(), beneficioExiste.icono);
            try {
                await promises_1.default.unlink(rutaImagen);
                console.log(`Imagen eliminada: ${rutaImagen}`);
            }
            catch (unlinkError) {
                console.error(`Error al eliminar imagen: ${rutaImagen}`, unlinkError);
            }
        }
        await prisma.beneficio.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({ message: "Se elimino el beneficio" });
    }
    catch (error) {
        console.error("Error al eliminar beneficio:", error);
        res.status(500).json({
            message: "Error al eliminar el beneficio",
            error: error.message,
        });
    }
};
exports.eliminarBeneficio = eliminarBeneficio;
//# sourceMappingURL=beneficios.controller.js.map