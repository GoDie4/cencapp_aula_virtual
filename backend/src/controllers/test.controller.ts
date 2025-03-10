import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { TestBody } from "interfaces/Test.interface";
import multer from "multer";
import path from "node:path";
import fs from "fs";

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "public/";
    if (file.fieldname === "archivo") {
      if (req.body.tipo_prueba === "EXAMEN") {
        folder = folder + "curso/examen";
        if (!fs.existsSync(folder)) {
          fs.mkdirSync(folder, { recursive: true });
        }
        cb(null, folder);
      } else if (req.body.tipo_prueba === "EJERCICIOS") {
        folder = folder + "curso/ejercicio";
        if (!fs.existsSync(folder)) {
          fs.mkdirSync(folder, { recursive: true }); 
        }
        cb(null, folder);
      } else {
        throw new Error("Error");
      }
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const uploadArchivo = multer({
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

export const uploadArchivoTest = uploadArchivo.single("archivo");

export async function showAllTests(req: Request, res: Response) {
  try {
    const tests = await prisma.test.findMany({
      include: {
        curso: true,
      },
    });
    res.status(200).json({ tests });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error interno al obtener los tests" });
    return;
  }
}

export async function createTest(req: Request, res: Response) {
  const {
    titulo,
    descripcion,
    cursoId,
    activo,
    fecha_fin,
    fecha_inicio,
    puntaje_maxima,
    tipo_prueba,
    tiempo_limite,
  } = req.body as TestBody;
  if (
    !titulo ||
    !descripcion ||
    !cursoId ||
    !activo ||
    !fecha_fin ||
    !fecha_inicio ||
    !puntaje_maxima ||
    !tipo_prueba ||
    !titulo ||
    !tiempo_limite
  ) {
    res.status(400).json({ message: "Faltan datos para crear el examen" });
    return;
  }

  const nombreArchivo = req.file?.filename;
  const rutaArchivo = req.file?.path;
  console.log(nombreArchivo);
  console.log(rutaArchivo);
  try {
    const nuevoTest = await prisma.test.create({
      data: {
        url_archivo: nombreArchivo ?? "",
        titulo: titulo,
        descripcion: descripcion,
        cursoId: cursoId,
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin,
        puntaje_maxima: puntaje_maxima,
        activo: activo,
        tipo_prueba: tipo_prueba,
        tiempo_limite: tiempo_limite,
      },
    });

    res
      .status(201)
      .json({ message: "Examen creado con éxito", test: nuevoTest });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error interno al crear el examen" });
    return;
  }
}
