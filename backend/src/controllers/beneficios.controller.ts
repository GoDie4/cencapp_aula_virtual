import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import multer from "multer";
import path from "node:path";
import fs from "fs/promises";

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "public/";
    if (file.fieldname === "icono") {
      folder = "public/beneficios/iconos/";
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

export const allBeneficios = async (_req: Request, res: Response) => {
  const beneficios = await prisma.beneficio.findMany({
    include: { curso: true },
  });
  res.json(beneficios);
};

export const getBeneficioById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  const beneficio = await prisma.beneficio.findUnique({
    where: { id: Number(id) },
    include: { curso: true },
  });

  if (!beneficio)
    return res.status(404).json({ error: "Beneficio no encontrado" });

  res.json(beneficio);
};

export const agregarBeneficio = async (req: Request, res: Response) => {
  const { texto, cursoId } = req.body;

  console.log(req.files);
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

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

export const editarBeneficio = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { texto, cursoId } = req.body;

  const files = req.files as
    | { [fieldname: string]: Express.Multer.File[] }
    | undefined;
  let urlImagenPath: string | null = null;

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
    const filePathToDelete = path.join(process.cwd(), beneficioExiste.icono);
    try {
      await fs.unlink(filePathToDelete);
      console.log(`Archivo viejo de imagen borrado: ${filePathToDelete}`);
    } catch (unlinkError: any) {
      if (unlinkError.code !== "ENOENT") {
        console.error("Error al borrar archivo viejo de imagen:", unlinkError);
      }
      return;
    }
  }

  res.json(beneficioActualizado);
};

export const eliminarBeneficio = async (req: Request, res: Response) => {
  const { id } = req.params;
  const beneficioExiste = await prisma.beneficio.findUnique({
    where: { id: Number(id) },
  });

  try {
    if (beneficioExiste?.icono) {
      const rutaImagen = path.join(process.cwd(), beneficioExiste.icono);
      try {
        await fs.unlink(rutaImagen);
        console.log(`Imagen eliminada: ${rutaImagen}`);
      } catch (unlinkError) {
        console.error(`Error al eliminar imagen: ${rutaImagen}`, unlinkError);
      }
    }
    await prisma.beneficio.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Se elimino el beneficio" });

  } catch (error: any) {
    console.error("Error al eliminar beneficio:", error);
    res.status(500).json({
      message: "Error al eliminar el beneficio",
      error: error.message,
    });
  }
};
