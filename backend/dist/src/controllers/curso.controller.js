"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerCursosPorMatriculado = exports.getAllCoursesDelProfesor = exports.obtenerCursoMateriales = exports.obtenerCursosPorAlumno = exports.registrarOActualizarPorcentajeCurso = exports.cursoPorSlug = exports.buscarPorNombre = exports.deleteCurso = exports.obtenerCursoPorId = exports.actualizarCurso = exports.showAllCursos = exports.createCurso = exports.uploadImageCurso = void 0;
exports.getAlumnoMatriculado = getAlumnoMatriculado;
const client_1 = require("@prisma/client");
const promises_1 = __importDefault(require("fs/promises"));
const multer_1 = __importDefault(require("multer"));
const node_path_1 = __importDefault(require("node:path"));
const generadorSlug_1 = require("../utils/generadorSlug");
const prisma = new client_1.PrismaClient();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        let folder = "public/";
        if (file.fieldname === "url_imagen") {
            folder = "public/cursos/";
        }
        else if (file.fieldname === "url_banner") {
            folder = "public/banners/";
        }
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = node_path_1.default.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // Límite de tamaño de archivo: 5MB
        files: 2, // Límite de número de archivos subidos por campo (por ejemplo, máximo 2 imágenes 'imagen')
        fields: 10, // Límite de campos no-archivo (campos de texto)
        fieldSize: 1024 * 100, // Tamaño máximo de un campo no-archivo (100KB)
        parts: 15, // Límite total de partes (archivos + campos) en la petición
        headerPairs: 200, // Límite de pares clave-valor de cabecera
    },
    fileFilter: function (req, file, cb) {
        // Filtro para aceptar solo ciertos tipos de archivos (imágenes en este ejemplo)
        const filetypes = /jpeg|jpg|png|webp|avif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(node_path_1.default.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(null, false);
    },
});
exports.uploadImageCurso = upload.fields([
    { name: "url_imagen", maxCount: 1 },
    { name: "url_banner", maxCount: 1 },
]);
const createCurso = async (req, res) => {
    const { nombre, precio, horas, categoriaId, descripcion, dirigido, metodologia, objetivo, certificacion, } = req.body;
    if (!nombre &&
        !precio &&
        !categoriaId &&
        !horas &&
        !objetivo &&
        !metodologia &&
        !dirigido &&
        !descripcion &&
        !certificacion) {
        res.status(400).json({ message: "Faltan datos para crear el curso." });
        return;
    }
    const files = req.files;
    if (!req.files) {
        res.status(400).json({
            message: "Por favor, sube archivos de imagen e icono para la categoría.",
        });
        return;
    }
    if (req.files) {
        // const imagenBuffer = req.file.buffer;
        let urlImagenPath = null;
        let urlBannerPath = null;
        if (files["url_imagen"] && files["url_imagen"][0]) {
            urlImagenPath = files["url_imagen"][0].path;
            urlImagenPath = "/" + files["url_imagen"][0].path.replace(/\\/g, "/");
        }
        if (files["url_banner"] && files["url_banner"][0]) {
            urlBannerPath = files["url_banner"][0].path;
            urlBannerPath = "/" + files["url_banner"][0].path.replace(/\\/g, "/");
        }
        try {
            const nuevoCurso = await prisma.curso.create({
                data: {
                    categoriaId: Number(categoriaId),
                    nombre: nombre,
                    slug: (0, generadorSlug_1.generarSlug)(nombre),
                    imagen: urlImagenPath ?? "",
                    banner: urlBannerPath ?? "",
                    precio: parseFloat(precio).toFixed(2),
                    horas: Number(horas),
                },
                include: {
                    detalles: true,
                },
            });
            await prisma.cursoDetalles.create({
                data: {
                    cursoId: nuevoCurso.id,
                    presentacion: descripcion ?? "",
                    objetivo: objetivo ?? "",
                    dirigido: dirigido ?? "",
                    metodologia: metodologia ?? "",
                    certificacion: certificacion ?? "",
                },
            });
            res.status(201).json({
                message: "Categoría creada con éxito (usando memoryStorage)",
                curso: nuevoCurso,
            });
            return;
        }
        catch (error) {
            console.error("Error al crear categoría:", error);
            if (error.code === "P2002") {
                res.status(409).json({ message: "Ya existe un curso con ese nombre." });
                return;
            }
            res.status(500).json({
                message: "Error interno del servidor al crear la categoría",
                error: error.message,
            });
            return;
        }
        finally {
            prisma.$disconnect();
        }
    }
    else {
        res.status(400).json({
            message: "Por favor, sube un archivo de imagen para la categoría.",
        });
        return;
    }
};
exports.createCurso = createCurso;
const showAllCursos = async (req, res) => {
    try {
        // Utiliza prisma.curso.findMany() para obtener todas las categorías de la base de datos
        const cursos = await prisma.curso.findMany({
            include: {
                categoria: true,
                detalles: true,
                PorcentajeCurso: {
                    select: {
                        porcentaje: true,
                    },
                },
            },
        });
        res.status(200).json({ cursos });
    }
    catch (error) {
        console.error("Error al obtener los cursos:", error);
        res.status(500).json({
            message: "Error al obtener la lista de cursos",
            error: error,
        });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.showAllCursos = showAllCursos;
const actualizarCurso = async (req, res) => {
    const cursoId = String(req.params.id);
    const { nombre, precio, horas, categoriaId, descripcion, dirigido, metodologia, certificacion, objetivo, detalleId, } = req.body;
    if (!nombre &&
        !precio &&
        !categoriaId &&
        !horas &&
        !objetivo &&
        !metodologia &&
        !dirigido &&
        !descripcion &&
        !certificacion) {
        res.status(400).json({
            message: "Faltan datos para actualizar el curso.",
        });
        return;
    }
    const files = req.files;
    let urlImagenPath = null;
    let urlBannerPath = null;
    try {
        // Buscar curso existente
        const cursoExistente = await prisma.curso.findUnique({
            where: { id: cursoId },
        });
        if (!cursoExistente) {
            res
                .status(404)
                .json({ message: "Categoría no encontrada para actualizar." });
            return;
        }
        if (files["url_imagen"] && files["url_imagen"][0]) {
            urlImagenPath = "/" + files["url_imagen"][0].path.replace(/\\/g, "/");
        }
        if (files["url_banner"] && files["url_banner"][0]) {
            urlBannerPath = "/" + files["url_banner"][0].path.replace(/\\/g, "/");
        }
        const cursoActualizado = await prisma.curso.update({
            where: { id: cursoId },
            data: {
                nombre: nombre,
                precio,
                categoriaId: Number(categoriaId),
                horas: Number(horas),
                imagen: urlImagenPath !== null ? urlImagenPath : cursoExistente.imagen,
                banner: urlBannerPath !== null ? urlBannerPath : cursoExistente.banner,
            },
            include: {
                detalles: true,
            },
        });
        await prisma.cursoDetalles.update({
            where: { id: detalleId },
            data: {
                cursoId: cursoActualizado.id,
                presentacion: descripcion,
                objetivo: objetivo,
                dirigido: dirigido,
                metodologia: metodologia,
                certificacion: certificacion,
            },
        });
        // Eliminar imagen anterior si hay nueva imagen
        if (files &&
            files["url_imagen"] &&
            files["url_imagen"][0] &&
            cursoExistente?.imagen) {
            const filePathToDelete = node_path_1.default.join(process.cwd(), cursoExistente.imagen);
            try {
                await promises_1.default.unlink(filePathToDelete);
                console.log(`Archivo viejo de imagen borrado: ${filePathToDelete}`);
            }
            catch (unlinkError) {
                if (unlinkError.code !== "ENOENT") {
                    console.error("Error al borrar archivo viejo de imagen:", unlinkError);
                }
            }
        }
        // Eliminar banner anterior si hay nuevo banner
        if (files &&
            files["url_banner"] &&
            files["url_banner"][0] &&
            cursoExistente?.banner) {
            const filePathToDelete = node_path_1.default.join(process.cwd(), cursoExistente.banner);
            try {
                await promises_1.default.unlink(filePathToDelete);
                console.log(`Archivo viejo de banner borrado: ${filePathToDelete}`);
            }
            catch (unlinkError) {
                if (unlinkError.code !== "ENOENT") {
                    console.error("Error al borrar archivo viejo de banner:", unlinkError);
                }
            }
        }
        res.status(200).json({
            message: "Curso actualizado con éxito.",
            categoria: cursoActualizado,
        });
    }
    catch (error) {
        console.error("Error al actualizar el curso:", error);
        res.status(500).json({
            message: "Error al actualizar el curso",
            error: error.message,
        });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.actualizarCurso = actualizarCurso;
const obtenerCursoPorId = async (req, res) => {
    const cursoId = String(req.params.id);
    console.log(cursoId);
    /*
    if (cursoId) {
      res.status(400).json({ message: "ID de curso no válido." });
      return;
    }
    */
    try {
        // Buscar una categoría por ID en la base de datos
        const curso = await prisma.curso.findUnique({
            where: { id: cursoId },
            include: { detalles: true },
        });
        if (curso) {
            // Si se encuentra la categoría, enviarla en la respuesta
            res.status(200).json({ curso });
        }
        else {
            // Si no se encuentra la categoría, enviar un error 404
            res.status(404).json({ message: "Curso no encontrada." });
        }
    }
    catch (error) {
        console.error("Error al obtener el curso por ID:", error);
        res
            .status(500)
            .json({ message: "Error al obtener el curso", error: error.message });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.obtenerCursoPorId = obtenerCursoPorId;
const deleteCurso = async (req, res) => {
    const cursoId = req.params.id;
    /*
    if (cursoId) {
      res.status(400).json({ message: "ID de curso no válido." });
      return;
    }
    */
    try {
        const cursoExistente = await prisma.curso.findUnique({
            where: { id: cursoId },
            include: { categoria: true },
        });
        if (!cursoExistente) {
            res.status(404).json({ message: "Curso no encontrado para eliminar." });
            return;
        }
        await prisma.test.deleteMany({
            where: { clase: { seccion: { curso: { id: cursoId } } } },
        });
        await prisma.clases.deleteMany({
            where: { seccion: { curso: { id: cursoId } } },
        });
        await prisma.seccion.deleteMany({
            where: { cursoId: cursoId },
        });
        await prisma.cursoUsuario.deleteMany({
            where: { cursoId: cursoId },
        });
        await prisma.cursoDetalles.deleteMany({
            where: { cursoId: cursoId },
        });
        await prisma.beneficio.deleteMany({
            where: { cursoId: cursoId },
        });
        await prisma.seccionesCursos.deleteMany({
            where: { cursoId: cursoId },
        });
        await prisma.ventasDetalles.deleteMany({
            where: { productoId: cursoId },
        });
        await prisma.test.deleteMany({
            where: { cursoId: cursoId },
        });
        // 2. Eliminar el curso
        await prisma.curso.delete({
            where: { id: cursoId },
            select: { imagen: true, banner: true },
        });
        if (cursoExistente.imagen) {
            const rutaImagen = node_path_1.default.join(process.cwd(), cursoExistente.imagen);
            try {
                await promises_1.default.unlink(rutaImagen);
                console.log(`Imagen eliminada: ${rutaImagen}`);
            }
            catch (unlinkError) {
                console.error(`Error al eliminar imagen: ${rutaImagen}`, unlinkError);
            }
        }
        if (cursoExistente.banner) {
            const rutaIcono = node_path_1.default.join(process.cwd(), cursoExistente.banner);
            try {
                await promises_1.default.unlink(rutaIcono);
            }
            catch (unlinkError) {
                console.error(`Error al eliminar banner: ${rutaIcono}`, unlinkError);
            }
        }
        if (cursoExistente.categoria) {
            const cursosRestantes = await prisma.curso.count({
                where: { categoriaId: cursoExistente.categoriaId },
            });
            if (cursosRestantes === 0) {
                await prisma.categorias.delete({
                    where: { id: cursoExistente.categoriaId },
                    select: { url_icono: true, url_imagen: true },
                });
                // Eliminar archivos de imagen e icono de la categoría
                if (cursoExistente.categoria.url_icono) {
                    const rutaIconoCategoria = node_path_1.default.join(process.cwd(), cursoExistente.categoria.url_icono);
                    try {
                        await promises_1.default.unlink(rutaIconoCategoria);
                        console.log(`Icono de categoría eliminado: ${rutaIconoCategoria}`);
                    }
                    catch (unlinkError) {
                        console.error(`Error al eliminar icono de categoría: ${rutaIconoCategoria}`, unlinkError);
                    }
                }
                if (cursoExistente.categoria.url_imagen) {
                    const rutaImagenCategoria = node_path_1.default.join(process.cwd(), cursoExistente.categoria.url_imagen);
                    try {
                        await promises_1.default.unlink(rutaImagenCategoria);
                        console.log(`Imagen de categoría eliminada: ${rutaImagenCategoria}`);
                    }
                    catch (unlinkError) {
                        console.error(`Error al eliminar imagen de categoría: ${rutaImagenCategoria}`, unlinkError);
                    }
                }
            }
        }
        res.status(200).json({ message: "Curso eliminada con éxito." });
    }
    catch (error) {
        console.error("Error al eliminar el curso:", error);
        res
            .status(500)
            .json({ message: "Error al eliminar el curso", error: error.message });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.deleteCurso = deleteCurso;
const buscarPorNombre = async (req, res) => {
    const { nombre } = req.params;
    try {
        const curso = await prisma.curso.findFirst({
            where: {
                nombre: {
                    contains: nombre,
                },
            },
            include: {
                detalles: true,
                Seccion: {
                    include: {
                        clases: true,
                    },
                },
            },
        });
        res.status(200).json(curso);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error al buscar el curso por nombre" });
    }
};
exports.buscarPorNombre = buscarPorNombre;
const cursoPorSlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const curso = await prisma.curso.findFirst({
            where: {
                slug: {
                    contains: slug,
                },
            },
            include: {
                detalles: true,
                PorcentajeCurso: true,
                Seccion: {
                    include: {
                        clases: true,
                    },
                },
            },
        });
        res.status(200).json(curso);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error al buscar el curso por slug" });
    }
};
exports.cursoPorSlug = cursoPorSlug;
const registrarOActualizarPorcentajeCurso = async (req, res) => {
    const { userId, cursoId, porcentaje, ultimaClase } = req.body;
    if (!userId || !cursoId) {
        return res.status(400).json({ error: "userId y cursoId son requeridos." });
    }
    try {
        const resultado = await prisma.porcentajeCurso.upsert({
            where: {
                userId_cursoId: {
                    userId,
                    cursoId,
                },
            },
            update: {
                porcentaje: porcentaje ?? 0,
                ultimaClase: ultimaClase ?? 0,
            },
            create: {
                userId,
                cursoId,
                porcentaje: porcentaje ?? 0,
                ultimaClase: ultimaClase ?? 0,
            },
        });
        return res
            .status(200)
            .json({ message: "Porcentaje de curso actualizado", data: resultado });
    }
    catch (error) {
        console.error("Error al registrar o actualizar porcentaje de curso:", error);
        return res.status(500).json({ error: "Error interno del servidor." });
    }
};
exports.registrarOActualizarPorcentajeCurso = registrarOActualizarPorcentajeCurso;
const obtenerCursosPorAlumno = async (req, res) => {
    const { id } = req.params;
    try {
        const alumnos = await prisma.cursoUsuario.findMany({
            where: {
                cursoId: id,
                tipo: "MATRICULADO",
            },
            include: {
                curso: true,
                usuario: true,
            },
        });
        res.status(200).json({ alumnos });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Ocurrió un error en el servidor" });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.obtenerCursosPorAlumno = obtenerCursosPorAlumno;
const obtenerCursoMateriales = async (req, res) => {
    const userId = req.user?.id;
    try {
        const cursos = await prisma.cursoUsuario.findMany({
            where: {
                userId: userId,
                tipo: "MATRICULADO",
            },
            include: {
                curso: {
                    omit: {
                        horas: true,
                        slug: true,
                        imagen: true,
                        banner: true,
                        precio: true,
                        categoriaId: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                    include: {
                        cursosUsuarios: {
                            where: {
                                tipo: "CARGO",
                            },
                            include: {
                                usuario: true,
                            },
                            omit: {
                                id: true,
                                cursoId: true,
                                tipo: true,
                                avance: true,
                            },
                        },
                        Seccion: {
                            omit: {
                                id: true,
                                nombre: true,
                                slug: true,
                                cursoId: true,
                                posicion: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                            orderBy: {
                                posicion: "asc",
                            },
                            include: {
                                clases: {
                                    omit: {
                                        id: true,
                                        slug: true,
                                        createdAt: true,
                                        updatedAt: true,
                                        duracion: true,
                                        posicion: true,
                                        seccionId: true,
                                        url_video: true,
                                    },
                                    include: { materiales: true },
                                    orderBy: {
                                        posicion: "asc",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        res.status(200).json({ cursos });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Ocurrió un error en el servidor" });
        return;
    }
};
exports.obtenerCursoMateriales = obtenerCursoMateriales;
const getAllCoursesDelProfesor = async (req, res) => {
    try {
        const profesorId = req.params.id;
        const user = req.user;
        if (user.id !== profesorId) {
            res.status(401).json({
                message: 'No tienes permiso para acceder a esta información'
            });
            return;
        }
        const cursos = await prisma.cursoUsuario.findMany({
            where: {
                userId: profesorId,
            },
            include: {
                curso: true
            }
        });
        res.status(200).json({ cursos: cursos });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Ocurrió un error en el servidor" });
        return;
    }
};
exports.getAllCoursesDelProfesor = getAllCoursesDelProfesor;
const obtenerCursosPorMatriculado = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    try {
        const alumnos = await prisma.cursoUsuario.findMany({
            where: {
                userId: user.id,
                tipo: "CARGO",
            },
            include: {
                curso: {
                    include: {
                        cursosUsuarios: {
                            where: {
                                cursoId: id,
                                tipo: "MATRICULADO",
                            },
                            include: {
                                usuario: true,
                            }
                        }
                    }
                }
            }
        });
        res.status(200).json({
            alumnos: alumnos
        });
        return;
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Ocurrió un error en el servidor" });
        return;
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.obtenerCursosPorMatriculado = obtenerCursosPorMatriculado;
async function getAlumnoMatriculado(req, res) {
    const user = req.user;
    const { id } = req.params;
    try {
        const alumnos = await prisma.cursoUsuario.findMany({
            where: {
                userId: user.id,
                cursoId: id,
            },
            include: {
                curso: {
                    include: {
                        cursosUsuarios: {
                            where: {
                                tipo: "MATRICULADO"
                            },
                            include: {
                                curso: true,
                                usuario: true
                            }
                        }
                    }
                },
            },
        });
        res.status(200).json({
            alumnos: alumnos,
        });
        return;
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Ocurrió un error en el servidor" });
        return;
    }
    finally {
        await prisma.$disconnect();
    }
}
//# sourceMappingURL=curso.controller.js.map