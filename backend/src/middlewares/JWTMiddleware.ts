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
  const tokenFromCookie = req.cookies?.token;
  const token = tokenFromCookie;

    console.log("Cookies:" , req.cookies?.token)

  console.log("BODY: ", req.body)
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

    if (user?.rolId !== 2) {
      res.status(403).json({ message: "No tienes permisos de alumno." });
      return;
    }

    (req as any).user = user;
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

export const verifyUser = async (
  req: any,
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
      select: { id: true, email: true, rol: true },
    });

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
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

export const verificarCompraCurso = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  console.log("params: ", req.params);
  console.log("first:: ", req.body.claseId || req.params.claseId)
  const userId = req.user?.id;
  const cursoId = req.params.cursoId || req.body.cursoId;
  const claseId = req.params.claseId || req.body.claseId;
  const slug = req.params.slug;
  
  console.log({ userId, cursoId, claseId, slug });
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

    const compra = await prisma.cursoUsuario.findFirst({
      where: {
        usuario: {
          id: userId,
        }
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

export const verifyAlumnoNoCookie = async (
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
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    if (user?.rolId !== 2) {
      res.status(403).json({ message: "No tienes permiso de alumno" });
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