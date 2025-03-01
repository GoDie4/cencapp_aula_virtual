import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
import fs from "fs/promises";
import multer from "multer";
import path from "node:path";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "public/";
    if (file.fieldname === "url_imagen") {
      folder = "public/categorias/";
    } else if (file.fieldname === "url_icono") {
      folder = "public/categoriasIcono/";
    }
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

export const upload = multer({ storage: storage });

export const createCategoriaMemory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { nombre } = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
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
  } catch (error: any) {
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
  /*
  if (req.file) {
    
  

    // En este ejemplo, simplemente guardaremos la ruta de un archivo temporal (simulando que la guardamos en disco después de procesarla)
    const tempFilePath = `/public/categorias/${Date.now()}-${imagenOriginalName}`;
    const tempFilePath2 = `/public/categoriasIcono/${Date.now()}-${imagenOriginalName}`; // Ruta temporal simulada
    console.log("Simulando guardar el archivo procesado en:", tempFilePath);

    const url_imagen_path = tempFilePath; // Usar la ruta temporal simulada como url_imagen
    const url_icono_path = tempFilePath2; // Usar la ruta temporal simulada como url_icono
    try {
      const nuevaCategoria = await prisma.categorias.create({
        data: {
          nombre: nombres,
          url_imagen: url_imagen_path,
          url_icono: url_icono_path,
        },
      });
      res
        .status(201)
        .json({
          message: "Categoría creada con éxito (usando memoryStorage)",
          categorias: nuevaCategoria,
        });
      return;
    } catch (error: any) {
      console.error("Error al crear categoría:", error);
      if (error.code === "P2002") {
        res
          .status(409)
          .json({ message: "Ya existe una categoría con ese nombre." });
        return;
      }
      res
        .status(500)
        .json({
          message: "Error interno del servidor al crear la categoría",
          error: error.message,
        });
      return;
    }
  } else {
    res
      .status(400)
      .json({
        message: "Por favor, sube un archivo de imagen para la categoría.",
      });
    return;
  }
    */
};

export const showAllCategorias = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Utiliza prisma.categorias.findMany() para obtener todas las categorías de la base de datos
    const categorias = await prisma.categorias.findMany({
      include: { cursos: true }
    });

    // Envía una respuesta exitosa con el código de estado 200 y las categorías en formato JSON
    res.status(200).json({ categorias });
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    // En caso de error, envía una respuesta de error con código de estado 500 (Error interno del servidor)
    res.status(500).json({
      message: "Error al obtener la lista de categorías",
      error: error,
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const actualizarCategoria = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send({ error: "ID de categoría inválido." });
    return
  }

  if (!req.body.nombre) {
    res
      .status(400)
      .send({
        error:
          "El nombre de la categoría es obligatorio para la actualización.",
      });
    return
  }

  const files = req.files as
    | { [fieldname: string]: Express.Multer.File[] }
    | undefined;
  let urlImagenPath: string | null = null;
  let urlIconoPath: string | null = null;

  try {
    // Obtener la categoría actual de la base de datos ANTES de actualizar
    const categoriaExistente = await prisma.categorias.findUnique({
      where: { id: id },
    });
    console.log(categoriaExistente)
    if (!categoriaExistente) {
      res
        .status(404)
        .send({ error: "Categoría no encontrada para actualizar." });
      return
    }

    if (files && files["url_imagen"] && files["url_imagen"][0]) {
      urlImagenPath = "/" + files["url_imagen"][0].path.replace(/\\/g, "/");
    }
    if (files && files["url_icono"] && files["url_icono"][0]) {
      urlIconoPath = "/" + files["url_icono"][0].path.replace(/\\/g, "/");
    }
    console.log(urlIconoPath)
    console.log(urlImagenPath)
    const categoriaActualizada = await prisma.categorias.update({
      where: { id: id },
      data: {
        nombre: req.body.nombre,
        url_imagen: urlImagenPath !== null ? urlImagenPath : categoriaExistente.url_imagen,
        url_icono: urlIconoPath !== null ? urlIconoPath : categoriaExistente.url_icono,
      },
    });
    console.log(categoriaActualizada)
    // Borrar archivos viejos DESPUÉS de actualizar la base de datos y SÓLO si se subieron nuevos archivos
    if (
      files &&
      files["url_imagen"] &&
      files["url_imagen"][0] &&
      categoriaExistente?.url_imagen
    ) {
      const filePathToDelete = path.join(
        process.cwd(),
        categoriaExistente.url_imagen
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
      files["url_icono"] &&
      files["url_icono"][0] &&
      categoriaExistente?.url_icono
    ) {
      const filePathToDelete = path.join(
        process.cwd(),
        categoriaExistente?.url_icono
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

    res.json(categoriaActualizada);
    return
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    res.status(500).send({ error: "Error al actualizar la categoría." });
    return
  } finally {
    await prisma.$disconnect();
  }
};

export const obtenerCategoriaPorId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categoriaId = parseInt(req.params.id);

  if (isNaN(categoriaId)) {
    res.status(400).json({ message: "ID de categoría no válido." });
    return;
  }

  try {
    // Buscar una categoría por ID en la base de datos
    const categoria = await prisma.categorias.findUnique({
      where: { id: categoriaId },
    });

    if (categoria) {
      // Si se encuentra la categoría, enviarla en la respuesta
      res.status(200).json({ categoria });
    } else {
      // Si no se encuentra la categoría, enviar un error 404
      res.status(404).json({ message: "Categoría no encontrada." });
    }
  } catch (error: any) {
    console.error("Error al obtener categoría por ID:", error);
    res
      .status(500)
      .json({ message: "Error al obtener la categoría", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteCategoria = async (
  req: Request,
  res: Response
): Promise<void> => {
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
      const rutaImagen = path.join(
        process.cwd(),
        categoriaExistente.url_imagen
      );
      try {
        await fs.unlink(rutaImagen);
        console.log(`Imagen eliminada: ${rutaImagen}`);
      } catch (unlinkError) {
        console.error(`Error al eliminar imagen: ${rutaImagen}`, unlinkError);
      }
    }
    if (categoriaExistente.url_icono) {
      const rutaIcono = path.join(
        process.cwd(),
        categoriaExistente.url_icono
      );
      try {
        await fs.unlink(rutaIcono);
        console.log(`Icono eliminada: ${rutaIcono}`);
      } catch (unlinkError) {
        console.error(`Error al eliminar icono: ${rutaIcono}`, unlinkError);
      }
    }

    res.status(200).json({ message: "Categoría eliminada con éxito." });
  } catch (error: any) {
    console.error("Error al eliminar categoría:", error);
    res.status(500).json({
      message: "Error al eliminar la categoría",
      error: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
};
