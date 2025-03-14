import { PrismaClient } from "@prisma/client";
import { NextFunction, Response } from "express";

const prisma = new PrismaClient();

export const verificarCompraCurso = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const userId = req.user?.id;
  const slug = req.params.slug;
  const cursoId = req.body.cursoId;
  const claseId = req.body.claseId;

  if (!userId || (!cursoId && !claseId && !slug)) {
    return res.status(400).json({
      message: "Faltan datos para verificar la compra del curso",
    });
  }

  try {
    let curso = null;

    if (cursoId) {
      curso = await prisma.curso.findUnique({
        where: { id: cursoId },
      });
    }

    if (!curso && slug) {
      curso = await prisma.curso.findFirst({
        where: { slug },
      });
    }

    if (!curso && claseId) {
      const clase = await prisma.clases.findUnique({
        where: { id: claseId },
        include: {
          seccion: {
            include: {
              curso: true,
            },
          },
        },
      });

      if (clase?.seccion?.curso) {
        curso = clase.seccion.curso;
      }
    }

    if (!curso && slug) {
      const clase = await prisma.clases.findFirst({
        where: { slug },
        include: {
          seccion: {
            include: {
              curso: true,
            },
          },
        },
      });

      if (clase?.seccion?.curso) {
        curso = clase.seccion.curso;
      }
    }

    if (!curso) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    const compra = await prisma.ventasDetalles.findFirst({
      where: {
        productoId: curso.id,
        venta: {
          usuarioId: userId,
        },
      },
    });

    if (!compra) {
      return res.status(403).json({ message: "No tienes acceso a este curso" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al verificar la compra del curso" });
  }
};