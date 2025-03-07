import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import fs from "fs/promises";
import multer from "multer";
import path from "node:path";

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "public/";
    if (file.fieldname === "url_imagen") {
      folder = "public/cursos/";
    } else if (file.fieldname === "url_banner") {
      folder = "public/banners/";
    }
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({
  storage: storage, // Usamos memoryStorage en lugar de diskStorage
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
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(null, false);
  },
});

export const uploadImageCurso = upload.fields([
  { name: "url_imagen", maxCount: 1 },
  { name: "url_banner", maxCount: 1 },
]);

export const createCurso = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    nombre,
    precio,
    horas,
    categoriaId,
    descripcion,
    dirigido,
    metodologia,
    objetivo,
    certificacion,
  } = req.body;

  if (!nombre && !precio && !categoriaId && !horas && !objetivo && !metodologia && !dirigido && !descripcion && !certificacion) {
    res.status(400).json({ message: "Faltan datos para crear el curso." });
    return;
  }
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

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
          imagen: urlImagenPath ?? "",
          banner: urlBannerPath ?? "",
          precio: parseFloat(precio).toFixed(2),
          horas: Number(horas),
        },
        include: {
          detalles: true
        }
      });
      await prisma.cursoDetalles.create({
        data: {
          cursoId: nuevoCurso.id,
          presentacion: descripcion ?? "",
          objetivo: objetivo ?? "",
          dirigido: dirigido ?? "",
          metodologia: metodologia ?? "",
          certificacion: certificacion ?? "",
        }
      })

      res.status(201).json({
        message: "Categoría creada con éxito (usando memoryStorage)",
        curso: nuevoCurso,
      });
      return;
    } catch (error: any) {
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
    } finally {
      prisma.$disconnect();
    }
  } else {
    res.status(400).json({
      message: "Por favor, sube un archivo de imagen para la categoría.",
    });
    return;
  }
};

export const showAllCursos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Utiliza prisma.curso.findMany() para obtener todas las categorías de la base de datos
    const cursos = await prisma.curso.findMany({
      include: { categoria: true, detalles: true },
    });

    // Envía una respuesta exitosa con el código de estado 200 y las categorías en formato JSON
    res.status(200).json({ cursos });
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    // En caso de error, envía una respuesta de error con código de estado 500 (Error interno del servidor)
    res.status(500).json({
      message: "Error al obtener la lista de cursos",
      error: error,
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const actualizarCurso = async (
  req: Request,
  res: Response
): Promise<void> => {
  const cursoId = String(req.params.id);
  const {
    nombre,
    precio,
    horas,
    categoriaId,
    descripcion,
    dirigido,
    metodologia,
    certificacion,
    objetivo
  } = req.body; // Nuevo nombre de categoría desde req.body

  if (!nombre && !precio && !categoriaId && !horas && !objetivo && !metodologia && !dirigido && !descripcion && !certificacion) {
    res.status(400).json({
      message: "Faltan datos para actualizar el curso.",
    });
    return;
  }
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  let urlImagenPath = null;
  let urlBannerPath = null;

  try {
    // 1. Buscar la categoría existente en la base de datos, incluyendo la imagen actual
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
      urlImagenPath = files["url_imagen"][0].path;
      urlImagenPath = "/" + files["url_imagen"][0].path.replace(/\\/g, "/");
    }

    if (files["url_banner"] && files["url_banner"][0]) {
      urlBannerPath = files["url_banner"][0].path;
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
        detalles: true
      }
    });
    await prisma.cursoDetalles.create({
      data: {
        cursoId: cursoActualizado.id,
        presentacion: descripcion,
        objetivo: objetivo,
        dirigido: dirigido,
        metodologia: metodologia,
        certificacion: certificacion,
      }
    })

    if (
      files &&
      files["url_imagen"] &&
      files["url_imagen"][0] &&
      cursoExistente?.imagen
    ) {
      const filePathToDelete = path.join(
        process.cwd(),
        cursoExistente.imagen
      );
      try {
        await fs.unlink(filePathToDelete);
        console.log(`Archivo viejo de imagen borrado: ${filePathToDelete}`);
      } catch (unlinkError: any) {
        if (unlinkError.code !== "ENOENT") {
          // Ignorar error si el archivo no existe (ENOENT)
          console.error(
            "Error al borrar archivo viejo de imagen:",
            unlinkError
          );
        }
        return
      }
    }
    if (
      files &&
      files["url_banner"] &&
      files["url_banner"][0] &&
      cursoExistente?.banner
    ) {
      const filePathToDelete = path.join(
        process.cwd(),
        cursoExistente?.banner
      );
      console.log(`[ACTUALIZAR CATEGORIA] Intentando borrar imagen vieja: ${filePathToDelete}`);
      try {
        await fs.unlink(filePathToDelete);
        console.log(`Archivo viejo de icono borrado: ${filePathToDelete}`);
      } catch (unlinkError: any) {
        if (unlinkError.code !== "ENOENT") {
          // Ignorar error si el archivo no existe (ENOENT)
          console.error("Error al borrar archivo viejo de icono:", unlinkError);
        }
      }
    }

    res.status(200).json({
      message: "Categoría actualizada con éxito.",
      categoria: cursoActualizado,
    });
  } catch (error: any) {
    console.error("Error al actualizar categoría:", error);
    res.status(500).json({
      message: "Error al actualizar la categoría",
      error: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const obtenerCursoPorId = async (
  req: Request,
  res: Response
): Promise<void> => {
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
      include: { detalles: true }
    });

    if (curso) {
      // Si se encuentra la categoría, enviarla en la respuesta
      res.status(200).json({ curso });
    } else {
      // Si no se encuentra la categoría, enviar un error 404
      res.status(404).json({ message: "Curso no encontrada." });
    }
  } catch (error: any) {
    console.error("Error al obtener el curso por ID:", error);
    res
      .status(500)
      .json({ message: "Error al obtener el curso", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteCurso = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    });

    if (!cursoExistente) {
      res.status(404).json({ message: "Curso no encontrado para eliminar." });
      return;
    }

    await prisma.curso.delete({
      where: { id: cursoId },
      select: { imagen: true, banner: true },
    });

    if (cursoExistente.imagen) {
      const rutaImagen = path.join(process.cwd(), cursoExistente.imagen);
      try {
        await fs.unlink(rutaImagen);
        console.log(`Imagen eliminada: ${rutaImagen}`);
      } catch (unlinkError) {
        console.error(`Error al eliminar imagen: ${rutaImagen}`, unlinkError);
      }
    }
    if (cursoExistente.banner) {
      const rutaIcono = path.join(process.cwd(), cursoExistente.banner);
      try {
        await fs.unlink(rutaIcono);
      } catch (unlinkError) {
        console.error(`Error al eliminar banner: ${rutaIcono}`, unlinkError);
      }
    }

    res.status(200).json({ message: "Curso eliminada con éxito." });
  } catch (error: any) {
    console.error("Error al eliminar el curso:", error);
    res
      .status(500)
      .json({ message: "Error al eliminar el curso", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const buscarPorNombre = async (req: Request, res: Response) => {
  const { nombre } = req.params
  try {

    const curso = await prisma.curso.findFirst({
      where: {
        nombre: {
          contains: nombre,
        }
      },
      include: {
        detalles: true,
      }
    })

    res.status(200).json(curso)
  }
  catch (e) {
    console.error(e)
    return
  }
}
