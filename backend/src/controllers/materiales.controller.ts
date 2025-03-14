import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "private/";

    if (file.fieldname === "archivo") {
      folder = folder + "curso/materiales";
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
      }
      cb(null, folder);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    files: 1,
  },
  fileFilter: function (req, file, cb) {
    // Filtro para aceptar solo ciertos tipos de archivos (imágenes en este ejemplo)
    const filetypes = /doc|docx|pdf/;
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

export const uploadArchivo = upload.single("archivo")

export const createMaterial = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.error("Error al crear el material:", error);
    res.status(500).json({ message: "Error interno del servidor" });
    return;
  }
};

export const showAllMateriales = async (req: Request, res: Response) => {
  try {
    const materiales = await prisma.materiales.findMany({
      include: {
        clase: true,
      },
    });

    res.status(200).json({ materiales });
  } catch (error) {
    console.error("Error al obtener los materiales:", error);
    res.status(500).json({ message: "Error interno del servidor" });
    return;
  }
};

export const actualizarMaterial = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { nombre, descripcion, claseId, path_archivo, mime_type, size } = req.body;
  let rutaArchivo = "";
  let archivoExiste = false;

  if (!nombre || !descripcion || !mime_type || !path_archivo || !size) {
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
      fs.unlink(path.join(process.cwd(), path_archivo), (err) => {
        console.log("Error al eliminar el archivo: ", err);
      });
    }

    res.status(200).json({
      message: "Material actualizado con éxito",
      material: materialActualizado,
    });
    return
  } catch (error: any) {
    console.error("Error al actualizar el material:", error);
    res.status(500).json({ message: "Error interno del servidor" });
    return;
  }
};

export const deleteMaterial = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const material = await prisma.materiales.delete({
      where: { id: parseInt(id) },
      select: {
        path_archivo: true,
      },
    });

    if (material.path_archivo) {
      const rutaArchivo = path.join(process.cwd(), material.path_archivo);

      try {
        fs.unlink(rutaArchivo, (err) => {
          console.log("Error al eliminar el archivo: ", err);
        });
        console.log(`Archivo eliminado: ${rutaArchivo}`);
        res.status(200).json({ message: "Material eliminado con éxito" });
        return;
      } catch (unlinkError) {
        console.error(`Error al eliminar archivo: ${rutaArchivo}`, unlinkError);
        res.status(404).json({ message: "Error al eliminar el archivo" });
        return;
      }
    } else {
      res.status(200).json({ message: "Material eliminado con éxito" });
      return;
    }
  } catch (error: any) {
    console.error("Error al eliminar el material:", error);
    res.status(500).json({ message: "Error interno del servidor" });
    return;
  }
};

export const obtenerMaterialPorId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const material = await prisma.materiales.findUnique({
      where: { id: parseInt(id) },
    });

    if (material) {
      // Si se encuentra la material, enviarla en la respuesta
      res.status(200).json({ material });
    } else {
      // Si no se encuentra la material, enviar un error 404
      res.status(404).json({ message: "Material no encontrado." });
    }
  } catch (error: any) {
    console.error("Error al obtener la material por ID:", error);
    res.status(500).json({ message: "Error interno del servidor" });
    return;
  } finally {
    await prisma.$disconnect();
  } 
}

export const obtenerDocumentoPorId = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    console.error("Error al obtener el documento:", error);
    res.status(500).json({ message: "Error interno del servidor" });
    return;
  }
}
