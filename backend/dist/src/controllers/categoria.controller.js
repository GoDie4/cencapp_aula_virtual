"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoria = exports.obtenerCategoriaPorSlug = exports.obtenerCategoriaPorId = exports.actualizarCategoria = exports.showAllCategorias = exports.createCategoriaMemory = exports.upload = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const promises_1 = __importDefault(require("fs/promises"));
const multer_1 = __importDefault(require("multer"));
const node_path_1 = __importDefault(require("node:path"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        let folder = "public/";
        if (file.fieldname === "url_imagen") {
            folder = "public/categorias/";
        }
        else if (file.fieldname === "url_icono") {
            folder = "public/categoriasIcono/";
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
const createCategoriaMemory = async (req, res) => {
    const { nombre } = req.body;
    const files = req.files;
    if (!nombre) {
        res
            .status(400)
            .json({ message: "El nombre de la categoría es obligatorio." });
        return;
    }
    if (!req.files) {
        res.status(400).json({
            message: "Por favor, sube archivos de imagen e icono para la categoría.",
        });
        return;
    }
    let urlImagenPath = null;
    let urlIconoPath = null;
    if (files["url_imagen"] && files["url_imagen"][0]) {
        urlImagenPath = files["url_imagen"][0].path;
        urlImagenPath = "/" + files["url_imagen"][0].path.replace(/\\/g, "/");
    }
    if (files["url_icono"] && files["url_icono"][0]) {
        urlIconoPath = files["url_icono"][0].path;
        urlIconoPath = "/" + files["url_icono"][0].path.replace(/\\/g, "/");
    }
    try {
        const nuevaCategoria = await prisma.categorias.create({
            data: {
                nombre: nombre,
                url_imagen: urlImagenPath ?? "",
                url_icono: urlIconoPath ?? "",
            },
        });
        res.status(201).json({
            message: "Categoría creada con éxito.",
            categorias: nuevaCategoria,
        });
        return;
    }
    catch (error) {
        console.error("Error al crear categoría:", error);
        if (error.code === "P2002") {
            res
                .status(409)
                .json({ message: "Ya existe una categoría con ese nombre." });
        }
        res.status(500).json({
            message: "Error interno del servidor al crear la categoría",
            error: error.message,
        });
    }
};
exports.createCategoriaMemory = createCategoriaMemory;
const showAllCategorias = async (req, res) => {
    try {
        // Utiliza prisma.categorias.findMany() para obtener todas las categorías de la base de datos
        const categorias = await prisma.categorias.findMany();
        // Envía una respuesta exitosa con el código de estado 200 y las categorías en formato JSON
        res.status(200).json({ categorias });
    }
    catch (error) {
        console.error("Error al obtener categorías:", error);
        // En caso de error, envía una respuesta de error con código de estado 500 (Error interno del servidor)
        res.status(500).json({
            message: "Error al obtener la lista de categorías",
            error: error,
        });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.showAllCategorias = showAllCategorias;
const actualizarCategoria = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).send({ error: "ID de categoría inválido." });
        return;
    }
    if (!req.body.nombre) {
        res.status(400).send({
            error: "El nombre de la categoría es obligatorio para la actualización.",
        });
        return;
    }
    const files = req.files;
    let urlImagenPath = null;
    let urlIconoPath = null;
    try {
        // Obtener la categoría actual de la base de datos ANTES de actualizar
        const categoriaExistente = await prisma.categorias.findUnique({
            where: { id: id },
        });
        if (!categoriaExistente) {
            res
                .status(404)
                .send({ error: "Categoría no encontrada para actualizar." });
            return;
        }
        if (files && files["url_imagen"] && files["url_imagen"][0]) {
            urlImagenPath = "/" + files["url_imagen"][0].path.replace(/\\/g, "/");
        }
        if (files && files["url_icono"] && files["url_icono"][0]) {
            urlIconoPath = "/" + files["url_icono"][0].path.replace(/\\/g, "/");
        }
        const categoriaActualizada = await prisma.categorias.update({
            where: { id: id },
            data: {
                nombre: req.body.nombre,
                url_imagen: urlImagenPath !== null
                    ? urlImagenPath
                    : categoriaExistente.url_imagen,
                url_icono: urlIconoPath !== null ? urlIconoPath : categoriaExistente.url_icono,
            },
        });
        // Borrar archivos viejos DESPUÉS de actualizar la base de datos y SÓLO si se subieron nuevos archivos
        if (files &&
            files["url_imagen"] &&
            files["url_imagen"][0] &&
            categoriaExistente?.url_imagen) {
            const filePathToDelete = node_path_1.default.join(process.cwd(), categoriaExistente.url_imagen);
            try {
                await promises_1.default.unlink(filePathToDelete);
                console.log(`Archivo viejo de imagen borrado: ${filePathToDelete}`);
            }
            catch (unlinkError) {
                if (unlinkError.code !== "ENOENT") {
                    // Ignorar error si el archivo no existe (ENOENT)
                    console.error("Error al borrar archivo viejo de imagen:", unlinkError);
                }
                return;
            }
        }
        if (files &&
            files["url_icono"] &&
            files["url_icono"][0] &&
            categoriaExistente?.url_icono) {
            const filePathToDelete = node_path_1.default.join(process.cwd(), categoriaExistente?.url_icono);
            console.log(`[ACTUALIZAR CATEGORIA] Intentando borrar imagen vieja: ${filePathToDelete}`);
            try {
                await promises_1.default.unlink(filePathToDelete);
                console.log(`Archivo viejo de icono borrado: ${filePathToDelete}`);
            }
            catch (unlinkError) {
                if (unlinkError.code !== "ENOENT") {
                    // Ignorar error si el archivo no existe (ENOENT)
                    console.error("Error al borrar archivo viejo de icono:", unlinkError);
                }
            }
        }
        res.json(categoriaActualizada);
        return;
    }
    catch (error) {
        console.error("Error al actualizar categoría:", error);
        res.status(500).send({ error: "Error al actualizar la categoría." });
        return;
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.actualizarCategoria = actualizarCategoria;
const obtenerCategoriaPorId = async (req, res) => {
    const categoriaId = parseInt(req.params.id);
    if (isNaN(categoriaId)) {
        res.status(400).json({ message: "ID de categoría no válido." });
        return;
    }
    try {
        // Buscar una categoría por ID en la base de datos
        const categoria = await prisma.categorias.findUnique({
            where: { id: categoriaId },
            include: { cursos: true },
        });
        if (categoria) {
            // Si se encuentra la categoría, enviarla en la respuesta
            res.status(200).json({ categoria });
        }
        else {
            // Si no se encuentra la categoría, enviar un error 404
            res.status(404).json({ message: "Categoría no encontrada." });
        }
    }
    catch (error) {
        console.error("Error al obtener categoría por ID:", error);
        res
            .status(500)
            .json({ message: "Error al obtener la categoría", error: error.message });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.obtenerCategoriaPorId = obtenerCategoriaPorId;
const obtenerCategoriaPorSlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const categoria = await prisma.categorias.findFirst({
            where: {
                slug: {
                    contains: slug,
                },
            },
            select: {
                id: true,
                cursos: true,
                nombre: true,
                slug: true,
                url_icono: true,
                url_imagen: true,
            },
        });
        res.status(200).json({
            categoria: categoria,
        });
    }
    catch (e) {
        console.error(e);
        return;
    }
};
exports.obtenerCategoriaPorSlug = obtenerCategoriaPorSlug;
const deleteCategoria = async (req, res) => {
    const categoriaId = parseInt(req.params.id);
    if (isNaN(categoriaId)) {
        res.status(400).json({ message: "ID de categoría no válido." });
        return;
    }
    try {
        const categoriaExistente = await prisma.categorias.findUnique({
            where: { id: categoriaId },
            select: { url_imagen: true, url_icono: true },
        });
        if (!categoriaExistente) {
            res.status(404).json({ message: "Categoría no encontrada." });
            return;
        }
        await prisma.categorias.delete({
            where: { id: categoriaId },
        });
        if (categoriaExistente.url_imagen) {
            const rutaImagen = node_path_1.default.join(process.cwd(), categoriaExistente.url_imagen);
            try {
                await promises_1.default.unlink(rutaImagen);
                console.log(`Imagen eliminada: ${rutaImagen}`);
            }
            catch (unlinkError) {
                console.error(`Error al eliminar imagen: ${rutaImagen}`, unlinkError);
            }
        }
        if (categoriaExistente.url_icono) {
            const rutaIcono = node_path_1.default.join(process.cwd(), categoriaExistente.url_icono);
            try {
                await promises_1.default.unlink(rutaIcono);
                console.log(`Icono eliminada: ${rutaIcono}`);
            }
            catch (unlinkError) {
                console.error(`Error al eliminar icono: ${rutaIcono}`, unlinkError);
            }
        }
        res.status(200).json({ message: "Categoría eliminada con éxito." });
    }
    catch (error) {
        console.error("Error al eliminar categoría:", error);
        res.status(500).json({
            message: "Error al eliminar la categoría",
            error: error.message,
        });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.deleteCategoria = deleteCategoria;
//# sourceMappingURL=categoria.controller.js.map