import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
export const profile = async (req: any, res: any) => {
  const { userId } = req.body;

  try {
    const user = await prisma.usuario.findFirst({
      where: { id: userId },
    });

    if (!user) return res.status(400).json({ message: "El usuario no existe" });

    return res.status(201).json({
      message: "Solicitud exitosa",
      usuario: {
        id: user.id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        celular: user.celular,
      },
    });
  } catch (error) {}
};

export const getDecodedUser = (req: Request, res: Response) => {
  try {

    const user = (req as any).user;
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado en la solicitud." });
    }
    res.status(200).json(user);
  } catch (error: any) {
    console.error("Error al obtener usuario decodificado:", error);
    res.status(500).json({ message: "Error interno del servidor.", error: error.message });
  }
  finally {
    prisma.$disconnect();
  }
};
