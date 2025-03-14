import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
export const profile = async (req: any, res: any) => {
  const { userId } = req.body;

  try {
    const user = await prisma.usuario.findUnique({
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
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error interno del servidor.", error: error.message });
  }
};

export const yo = async (req: any, res: any) => {
  const userId = req.user?.id;

  try {
    const userEncontrado = await prisma.usuario.findUnique({
      where: { id: userId },
    });

    if (!userEncontrado)
      return res.status(400).json({ message: "El usuario no existe" });

    return res.status(201).json({
      message: "Solicitud exitosa",
      usuario: {
        id: userEncontrado.id,
        nombres: userEncontrado.nombres,
        apellidos: userEncontrado.apellidos,
        email: userEncontrado.email,
        celular: userEncontrado.celular,
      },
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error interno del servidor.", error: error.message });
  }
};

export const editarPerfil = async (req: any, res: any) => {
  const userId = req.user?.id;
  const { nombres, apellidos, celular } = req.body;

  try {
    if (!nombres || !apellidos || !celular) {
      return res
        .status(400)
        .json({ error: "Falta nombres, apellidos o celular son obligatorios" });
    }

    const usuarioActualizado = await prisma.usuario.update({
      where: { id: userId },
      data: {
        nombres,
        apellidos,
        celular,
      },
    });

    res.json({
      message: "Perfil actualizado correctamente",
      usuario: usuarioActualizado,
    });
  } catch (error: any) {
    console.error("Error al actualizar perfil:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getDecodedUser = (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user) {
      res
        .status(404)
        .json({ message: "Usuario no encontrado en la solicitud." });
    }
    res.status(200).json(user);
  } catch (error: any) {
    console.error("Error al obtener usuario decodificado:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor.", error: error.message });
  } finally {
    prisma.$disconnect();
  }
};

export const cambiarContrasenaPerfil = async (req: any, res: any) => {
  const { newPassword } = req.body;
  const userId = req.user?.id;

  try {
    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.usuario.update({
      where: { id: userId },
      data: { password: hashed },
    });

    res.json({ message: "Contraseña actualizada con éxito" });
  } catch (error: any) {
    console.error("Error al actualizar perfil:", error.message);
    res.status(500).json({ error: error.message });
  }
};
