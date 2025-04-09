import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import multer from "multer";
import path from "node:path";
import fs from "fs";
import fsPromise from "fs/promises";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import * as QRCode from "qrcode";
import { registrarError } from "../utils/registerError";
const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "private/";
    if (file.fieldname === "archivo") {
      folder = folder + "curso/certificados";
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
      }
      cb(null, folder);
    } else {
      throw new Error("Error");
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
    const filetypes = /pdf/;
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

export const uploadArchivoCertificado = uploadArchivo.single("archivo");

export async function traerCertificados(req: Request, res: Response) {
  try {
    const certificados = await prisma.certificados.findMany({
      include: {
        curso: true,
        usuario: true,
      },
    });
    res.status(200).json({ certificados });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Error interno al obtener los certificados" });
    return;
  }
}

export async function traerCertificadosByUser(req: Request, res: Response) {
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
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Error interno al obtener los certificados" });
    return;
  }
}

export async function obtenerCertificadosPorUsuario(req: any, res: Response) {
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
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Error interno al obtener los certificados" });
    return;
  }
}

export async function createCertificado(req: Request, res: Response) {
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
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error interno al subir el certificado" });
    return;
  }
}

export async function actualizarCertificado(req: Request, res: Response) {
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
        const rutaArchivoNuevo = path.join(
          process.cwd(),
          certificadoExiste.url_archivo
        );

        try {
          await fsPromise.unlink(rutaArchivoNuevo);
          console.log(`Archivo eliminado: ${rutaArchivoNuevo}`);
        } catch (unlinkError) {
          console.error(
            `Error al eliminar archivo: ${rutaArchivoNuevo}`,
            unlinkError
          );
        }
      }

      res.status(200).json({
        message: "Certificado actualizado con éxito",
        certificado: nuevoCertificado,
      });
      return;
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .json({ message: "Error interno al actualizar el certificado" });
      return;
    }
  } else {
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

export async function deleteCertificado(
  req: Request,
  res: Response
): Promise<any> {
  const { id } = req.params;

  try {
    const certificado = await prisma.certificados.delete({
      where: { id },
      select: {
        url_archivo: true,
      },
    });

    if (certificado.url_archivo) {
      const rutaArchivo = path.join(process.cwd(), certificado.url_archivo);

      try {
        await fsPromise.unlink(rutaArchivo);
        console.log(`Archivo eliminado: ${rutaArchivo}`);
      } catch (unlinkError) {
        console.error(`Error al eliminar archivo: ${rutaArchivo}`, unlinkError);
        return res.status(500).json({
          message:
            "Certificado eliminado, pero error al eliminar el archivo físico.",
        });
      }
    }

    return res.status(200).json({ message: "Certificado eliminado con éxito" });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Error interno al eliminar el certificado" });
  }
}

export async function obtenerCertificadoPorId(req: Request, res: Response) {
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
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error interno al obtener el documento" });
    return;
  }
}

export async function obtenerDataCertificadoPorId(req: Request, res: Response) {
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
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Error interno al obtener el certificado" });
    return;
  }
}

export const descargarCertificadoPorId = async (
  req: Request,
  res: Response
) => {
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
  } catch (error: any) {
    console.error("Error al obtener el documento:", error);
    res.status(500).json({ message: "Error interno del servidor" });
    return;
  }
};

export const generarCertificado = async (userId: string, cursoId: string) => {
  try {
    const user = await prisma.usuario.findUnique({ where: { id: userId } });
    const curso = await prisma.curso.findUnique({ where: { id: cursoId } });

    if (!user || !curso) throw new Error("Usuario o curso no encontrado");

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([842, 595]);

    // Cargar imagen de fondo usando la raíz del proyecto
    const imagePath = path.resolve(
      process.cwd(),
      "public/certificados/plantilla.png"
    );
    console.log(`Ruta de la plantilla: ${imagePath}`);
    if (!fs.existsSync(imagePath)) {
      throw new Error(`La plantilla de certificado no existe en: ${imagePath}`);
    }

    const bgImage = fs.readFileSync(imagePath);
    const pngImage = await pdfDoc.embedPng(bgImage);
    page.drawImage(pngImage, { x: 0, y: 0, width: 842, height: 595 });

    // Fuente y texto centrado
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = 24;
    const text = `${user.nombres} ${user.apellidos}`;
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const x = (page.getWidth() - textWidth) / 2;
    page.drawText(text, {
      x,
      y: 345,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });

    // Nombre del curso
    const fontSizeCurso = 18;
    const textWidthCurso = font.widthOfTextAtSize(curso.nombre, fontSizeCurso);
    const xCurso = (page.getWidth() - textWidthCurso) / 2;
    page.drawText(curso.nombre, {
      x: xCurso,
      y: 273,
      size: fontSizeCurso,
      font,
    });

    // Horas del curso
    const horas = curso.horas;
    const fontSizeHoras = 14;
    const textWidthHoras = font.widthOfTextAtSize(
      horas.toString(),
      fontSizeHoras
    );
    const xHoras = (page.getWidth() - textWidthHoras) / 2;
    page.drawText(horas.toString(), {
      x: xHoras,
      y: 245,
      size: fontSizeHoras,
      font,
    });

    // QR con enlace de verificación
    const qrDataUrl = await QRCode.toDataURL(
      `https://aula.cencapperu.com/certificados/${userId}`
    );
    const qrImageBytes = Buffer.from(qrDataUrl.split(",")[1], "base64");
    const qrImage = await pdfDoc.embedPng(qrImageBytes);
    page.drawImage(qrImage, { x: 600, y: 60, width: 135, height: 135 });

    // Guardar PDF en la raíz del proyecto
    const pdfBytes = await pdfDoc.save();
    const outputDir = path.resolve(process.cwd(), "private/curso/certificados");
    console.log(`Ruta de guardado: ${outputDir}`);

    if (!fs.existsSync(outputDir)) {
      console.log("La carpeta no existe. Creándola...");
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const fileName = `certificado-${userId}-${cursoId}.pdf`;
    const outputPath = path.join(outputDir, fileName);
    console.log(`Guardando el certificado en: ${outputPath}`);

    try {
      fs.writeFileSync(outputPath, pdfBytes);
      console.log(`Certificado guardado exitosamente en: ${outputPath}`);
    } catch (err) {
      console.error("Error al guardar el archivo PDF:", err);
      throw new Error(`Error al guardar el certificado en: ${outputPath}`);
    }
  } catch (err) {
    registrarError(`Error al guardar certificado generado: ${err}`);
    console.error("Error generando el certificado:", err);
    throw err;
  }
};

export const registrarCertificadoAutomatico = async ({
  userId,
  cursoId,
  nombre,
  emitidoEn,
}: {
  userId: string;
  cursoId: string;
  nombre: string;
  emitidoEn?: Date;
}) => {
  try {
    const fs = await import("fs");

    // Generar nombre de archivo y rutas
    const fileName = `certificado-${userId}-${cursoId}.pdf`;

    // Ruta relativa desde el raíz del proyecto
    const relativePath = `/private/curso/certificados/${fileName}`;

    // Usar process.cwd() para obtener la raíz del proyecto
    const rootPath = process.cwd();
    const absolutePath = path.join(rootPath, relativePath);

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
  } catch (error) {
    console.error("Error al registrar certificado:", error);
    registrarError(`Error al registrar certificado: ${error}`);
    throw new Error("Error al guardar en la base de datos");
  }
};
