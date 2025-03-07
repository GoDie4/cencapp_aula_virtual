import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const agregarComentario = async (req: any, res: any): Promise<void> => {
  const { userId, claseId, comentario } = req.body;

  try {
    const comentarioObject = await prisma.comentarios.create({
      data: {
        comentario: comentario,
        claseId: claseId,
        userId: userId,
      },
    });

    res.status(201).json({
      message: "Comentario enviado",
      comentario: comentarioObject,
    });
  } catch (error) {
    console.error("Error al crear el comentario: ", error);

    res.status(500).json({
      message: "Error al crear el comentario",
      error,
    });
  }
};
