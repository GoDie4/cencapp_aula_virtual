import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createClase = async (req: Request, res: Response) => {
  const { nombre, duracion, url_video, seccionId, posicion } = req.body;
  if (!nombre || !duracion || !url_video || !seccionId || !posicion) {
    res.status(400).json({ message: "Faltan datos para crear la clase." });
    return;
  }
  try {
    const nuevaClase = await prisma.clases.create({
      data: {
        nombre: nombre,
        duracion: duracion,
        posicion: parseInt(posicion),
        url_video: url_video,
        seccionId: seccionId,
      },
    });
    res.status(201).json({
      message: "Clase creada con éxito.",
      clase: nuevaClase,
    });
    return;
  } catch (error: any) {
    console.error("Error al crear la clase:", error);
    if (error.code === "P2002") {
      res.status(409).json({ message: "Ya existe una clase con ese nombre." });
      return;
    }
    res.status(500).json({
      message: "Error interno del servidor al crear la clase",
      error: error.message,
    });
    return;
  } finally {
    await prisma.$disconnect();
  }
};

export const showAllClases = async (req: Request, res: Response) => {
  try {
    // Utiliza prisma.clase.findMany() para obtener todas las clases de la base de datos
    const clases = await prisma.clases.findMany();

    // Envía una respuesta exitosa con el código de estado 200 y las clases en formato JSON
    res.status(200).json({ clases });
  } catch (error) {
    console.error("Error al obtener las clases:", error);
    // En caso de error, envía una respuesta de error con código de estado 500 (Error interno del servidor)
    res.status(500).json({
      message: "Error al obtener la lista de clases",
      error: error,
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const actualizarClase = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { nombre, duracion, url_video, seccionId, posicion } = req.body;
  if (!nombre || !duracion || !url_video || !seccionId || !posicion) {
    res.status(400).json({ message: "Faltan datos para actualizar la clase." });
    return;
  }
  try {
    // Obtener la clase actual de la base de datos ANTES de actualizar
    const claseExistente = await prisma.clases.findUnique({
      where: { id: id },
    });
    if (!claseExistente) {
      res.status(404).json({ message: "Clase no encontrada para actualizar." });
      return;
    }

    const claseActualizada = await prisma.clases.update({
      where: { id: id },
      data: {
        nombre: nombre,
        duracion: duracion,
        posicion: parseInt(posicion),
        url_video: url_video,
        seccionId: seccionId,
      },
    });

    res.status(200).json({
      message: "Clase actualizada con éxito.",
      clase: claseActualizada,
    });
  } catch (error: any) {
    console.error("Error al actualizar la clase:", error);
    res.status(500).json({
      message: "Error al actualizar la clase",
      error: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const obtenerClasePorId = async (req: Request, res: Response) => {
  const claseId = req.params.id;
  if (!claseId) {
    res.status(400).json({ message: "ID de clase no válido." });
    return;
  }
  try {
    // Buscar una clase por ID en la base de datos
    const clase = await prisma.clases.findUnique({
      where: { id: claseId },
    });

    if (clase) {
      // Si se encuentra la clase, enviarla en la respuesta
      res.status(200).json({ clase });
    } else {
      // Si no se encuentra la clase, enviar un error 404
      res.status(404).json({ message: "Clase no encontrada." });
    }
  } catch (error: any) {
    console.error("Error al obtener la clase por ID:", error);
    res
      .status(500)
      .json({ message: "Error al obtener la clase", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteClase = async (req: Request, res: Response) => {
  const claseId = req.params.id;
  if (!claseId) {
    res.status(400).json({ message: "ID de clase no válido." });
    return;
  }
  try {
    const claseExistente = await prisma.clases.findUnique({
      where: { id: claseId },
    });

    if (!claseExistente) {
      res.status(404).json({ message: "Clase no encontrada para eliminar." });
      return;
    }

    await prisma.clases.delete({
      where: { id: claseId },
    });

    res.status(200).json({ message: "Clase eliminada con éxito." });
  } catch (error: any) {
    console.error("Error al eliminar la clase:", error);
    res
      .status(500)
      .json({ message: "Error al eliminar la clase", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const obtenerClases = async (req: Request, res: Response) => {
  const { nombre } = req.params;
  let clases
  try {
    if (nombre === 'all') {
      clases = await prisma.clases.findMany({
        include: {
          seccion: true,
        },
      });
    }
    else {
      clases = await prisma.clases.findMany({
        where: {
          seccion: {
            nombre: {
              contains: nombre,
            }
          }
        },
        include: {
          seccion: true,
        },
      });
    }

    res.json(clases ? { clases } : { clases: [] });	
  } catch (error) {
    console.error("Error al obtener clases:", error);
    res.status(500).json({ error: "Error al obtener clases" });
  }
};

export const obtenerClasesPorSeccion = async (req: Request, res: Response) => {
  const seccionId = req.params.id;
  try {
    const clases = await prisma.clases.findMany({
      where: {
        seccionId: seccionId,
      },
    });
    res.status(200).json(clases ? { clases } : { clases: [] });
  } catch (error) {
    console.error("Error al obtener clases:", error);
    res.status(500).json({ error: "Error al obtener clases" });
  }
}
