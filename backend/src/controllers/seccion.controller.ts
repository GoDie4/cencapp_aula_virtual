import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createSeccion = async (req: Request, res: Response) => {
  const { cursoId, posicion, nombre } = req.body;
  
  if (!cursoId || !posicion || !nombre) {
    res.status(400).json({ message: "Faltan datos para crear la sección." });
    return;
  }
  
  try {
    const findSeccion = await prisma.seccion.findFirst({
      where: {
        posicion: parseInt(posicion)
      }
    })
    if (findSeccion) {
      res.status(400).json({
        message: 'Ya existe esa posición. Te recomendamos buscar el curso y agregarle clases.'
      })
      return
    }

    const nuevaSeccion = await prisma.seccion.create({
      data: {
        nombre: nombre,
        cursoId: cursoId,
        posicion: parseInt(posicion),
      },
    });
    res.status(201).json({
      message: "Sección creada con éxito.",
      seccion: nuevaSeccion,
    });
    return;
  } catch (error: any) {
    console.error("Error al crear la sección:", error);
    if (error.code === "P2002") {
      res
        .status(409)
        .json({ message: "Ya existe una sección con ese nombre." });
      return;
    }
    res.status(500).json({
      message: "Error interno del servidor al crear la sección",
      error: error.message,
    });
    return;
  } finally {
    await prisma.$disconnect();
  }
};

export const showAllSecciones = async (req: Request, res: Response) => {
  try {
    // Utiliza prisma.seccion.findMany() para obtener todas las secciones de la base de datos
    const secciones = await prisma.seccion.findMany({
      include: { clases: true },
    });
    // Envía una respuesta exitosa con el código de estado 200 y las secciones en formato JSON
    res.status(200).json({ secciones: secciones });
  } catch (error) {
    console.error("Error al obtener las secciones:", error);
    // En caso de error, envía una respuesta de error con código de estado 500 (Error interno del servidor)
    res.status(500).json({
      message: "Error al obtener la lista de secciones",
      error: error,
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const actualizarSeccion = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { cursoId, posicion, nombre } = req.body;
  if (!cursoId || !posicion || !nombre) {
    res
      .status(400)
      .json({ message: "Faltan datos para actualizar la sección." });
    return;
  }
  try {
    // Obtener la sección actual de la base de datos ANTES de actualizar
    const seccionExistente = await prisma.seccion.findUnique({
      where: { id: id },
    });
    if (!seccionExistente) {
      res
        .status(404)
        .json({ message: "Sección no encontrada para actualizar." });
      return;
    }

    const seccionActualizada = await prisma.seccion.update({
      where: { id: id },
      data: {
        nombre: nombre,
        cursoId: cursoId,
        posicion: parseInt(posicion),
      },
    });

    res.status(200).json({
      message: "Sección actualizada con éxito.",
      seccion: seccionActualizada,
    });
  } catch (error: any) {
    console.error("Error al actualizar la sección:", error);
    res.status(500).json({
      message: "Error al actualizar la sección",
      error: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const obtenerSeccionPorId = async (req: Request, res: Response) => {
  const seccionId = req.params.id;
  console.log(req.params)
  if (!seccionId) {
    res.status(400).json({ message: "ID de sección no válido." });
    return;
  }
  try {
    // Buscar una sección por ID en la base de datos
    const seccion = await prisma.seccion.findUnique({
      where: { id: seccionId },
    });

    if (seccion) {
      // Si se encuentra la sección, enviarla en la respuesta
      res.status(200).json({ seccion });
    } else {
      // Si no se encuentra la sección, enviar un error 404
      res.status(404).json({ message: "Sección no encontrada." });
    }
  } catch (error: any) {
    console.error("Error al obtener la sección por ID:", error);
    res
      .status(500)
      .json({ message: "Error al obtener la sección", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteSeccion = async (req: Request, res: Response) => {
  const seccionId = req.params.id;
  console.log(seccionId)
  if (!seccionId) {
    res.status(400).json({ message: "ID de sección no válido." });
    return;
  }
  try {
    const seccionExistente = await prisma.seccion.findUnique({
      where: { id: seccionId },
    });

    if (!seccionExistente) {
      res.status(404).json({ message: "Sección no encontrada para eliminar." });
      return;
    }

    await prisma.seccion.delete({
      where: { id: seccionId },
    });

    res.status(200).json({ message: "Sección eliminada con éxito." });
  } catch (error: any) {
    console.error("Error al eliminar la sección:", error);
    res
      .status(500)
      .json({ message: "Error al eliminar la sección", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export async function obtenerSecciones(req: Request, res: Response) {
  const { nombre } = req.params;

  try {
    let secciones;

    if (nombre === 'all') {
      secciones = await prisma.seccion.findMany({
        include: {
          curso: true,
          clases: true
        },
      });
    } else {
      // Buscar secciones por nombre de curso
      secciones = await prisma.seccion.findMany({
        where: {
          curso: {
            nombre: {
              contains: nombre
            }
          },
        },
        include: {
          clases: true, // Incluir información de las clases relacionadas
          curso: true, // Incluir información del curso relacionado
        },
      });
    }

    res.json({secciones});
  } catch (error) {
    console.error("Error al obtener secciones:", error);
    res.status(500).json({ error: "Error al obtener secciones" });
  }
}

export async function obtenerSeccionesCurso(req: Request, res: Response) {
  const { id } = req.params;

  try {
    let secciones;

    // Buscar secciones por curso
    secciones = await prisma.seccion.findMany({
      where: {
        cursoId: id,
      },
      omit: {
        createdAt: true,
        updatedAt: true,
        posicion: true,
      }
    });

    res.json({secciones});
  } catch (error) {
    console.error("Error al obtener secciones:", error);
    res.status(500).json({ error: "Error al obtener secciones" });
  }
}
