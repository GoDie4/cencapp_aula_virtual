import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { ENV } from "../config/config";

dotenv.config();

const prisma = new PrismaClient();

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Token no proporcionado." });
    return;
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(
      token ?? "",
      ENV.TOKEN_SECRET as string
    ) as JwtPayload;
    console.log(decoded);
    const user = await prisma.usuario.findUnique({
      where: { id: decoded.id },
      include: { rol: true },
    });

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado." });
    }

    if (user?.rolId !== 1) {
      res.status(403).json({ message: "No tienes permisos de administrador." });
    }

    (req as any).user = user; // Agrega el usuario decodificado a la solicitud
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido." });
  }
};

export const verifyAlumno = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Token no proporcionado." });
    return;
  }

  const tokenFromHeader = req.headers.authorization?.split(" ")[1];
  const tokenFromCookie = req.cookies?.token;
  const token = tokenFromHeader || tokenFromCookie;
  if (!token || !tokenFromCookie) {
    res.status(401).json({ message: "Token no proporcionado." });
    return;
  }

  try {
    const decoded = jwt.verify(
      token ?? "",
      ENV.TOKEN_SECRET as string
    ) as JwtPayload;
    console.log(decoded);
    const user = await prisma.usuario.findUnique({
      where: { id: decoded.id },
      include: { rol: true },
    });

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado." });
      return;
    }

    if (user?.rolId !== 2) {
      res.status(403).json({ message: "No tienes permisos de alumno." });
      return;
    }

    (req as any).user = user; // Agrega el usuario decodificado a la solicitud
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido." });
    return;
  }
};

export const verifyProfesor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Token no proporcionado." });
    return;
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(
      token ?? "",
      ENV.TOKEN_SECRET as string
    ) as JwtPayload;
    console.log(decoded);
    const user = await prisma.usuario.findUnique({
      where: { id: decoded.id },
      include: { rol: true },
    });

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado." });
    }

    if (user?.rolId !== 3) {
      res.status(403).json({ message: "No tienes permisos de profesor." });
    }

    (req as any).user = user; // Agrega el usuario decodificado a la solicitud
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido." });
  }
};

export const verifyAlumnoOrProfesor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Token no proporcionado." });
    return;
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token no proporcionado." });
    return;
  }

  try {
    const decoded = jwt.verify(
      token ?? "",
      ENV.TOKEN_SECRET as string
    ) as JwtPayload;
    const user = await prisma.usuario.findUnique({
      where: { id: decoded.id },
      include: { rol: true },
    });

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado." });
      return;
    }

    if (user?.rolId !== 2 && user?.rolId !== 3) {
      res
        .status(403)
        .json({ message: "No tienes permisos de alumno o profesor." });
      return;
    }

    (req as any).user = user; // Agrega el usuario decodificado a la solicitud
    next();
  } catch (error) {
    console.error("Error al verificar el rol de usuario:", error);
    res.status(500).json({ message: "Error al verificar el rol de usuario" });
    return;
  }
};

export const verifyAdminOrProfesor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Token no proporcionado." });
    return;
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token no proporcionado." });
    return;
  }

  try {
    const decoded = jwt.verify(
      token ?? "",
      ENV.TOKEN_SECRET as string
    ) as JwtPayload;
    const user = await prisma.usuario.findUnique({
      where: { id: decoded.id },
      include: { rol: true },
    });

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado." });
      return;
    }

    if (user?.rolId !== 1 && user?.rolId !== 3) {
      res
        .status(403)
        .json({ message: "No tienes permisos de administrador o profesor." });
      return;
    }

    (req as any).user = user; // Agrega el usuario decodificado a la solicitud
    next();
  } catch (error) {
    console.error("Error al verificar el rol de usuario:", error);
    res.status(500).json({ message: "Error al verificar el rol de usuario" });
    return;
  }
};
