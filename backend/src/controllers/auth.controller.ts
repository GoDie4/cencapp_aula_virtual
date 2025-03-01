import { PrismaClient } from "@prisma/client";
import { LoginRequest, RegisterRequest } from "../interfaces/auth.interface";
import { Response, Request } from "express";
import bcrypt from "bcrypt";
import createAccessToken from "../utils/jwt";
const prisma = new PrismaClient();

export const register = async (
  req: Request<{}, {}, RegisterRequest>,
  res: Response
): Promise<any | undefined> => {
  const { nombres, apellidos, celular, email, password } = req.body;

  try {
    const usuarioExiste = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExiste) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const defaultRole = await prisma.rol.findFirst({
      where: { nombre: "estudiante" },
    });

    if (!defaultRole) {
      return res
        .status(500)
        .json({ message: "El rol por defecto no está configurado" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        activo: false,
        apellidos,
        email,
        nombres,
        celular,
        password: hashPassword,
        rolId: defaultRole.id,
      },
    });

    const token = await createAccessToken({ id: nuevoUsuario.id });

    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });

    return res.status(201).json({
      message: "Registrado correctamente",
      usuario: {
        id: nuevoUsuario.id,
        nombres: nuevoUsuario.nombres,
        apellidos: nuevoUsuario.apellidos,
        email: nuevoUsuario.email,
        celular: nuevoUsuario.celular,
      },
      token: token
    });
  } catch (error) {
    console.error("Error al registrar usuario", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const login = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response
): Promise<any | undefined> => {
  const { email, password } = req.body;

  try {
    const usuarioExiste = await prisma.usuario.findFirst({
      where: { email },
    });

    if (!usuarioExiste)
      return res.status(400).json({ message: "El usuario no existe" });

    const isMatch = await bcrypt.compare(password, usuarioExiste.password);

    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccessToken({ id: usuarioExiste.id });

    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });

    const primerNombre = usuarioExiste.nombres.split(" ");

    res.json({
      message: `Bienvenido ${primerNombre[0]}`,
      usuario: {
        id: usuarioExiste.id,
        nombres: usuarioExiste.nombres,
        apellidos: usuarioExiste.apellidos,
        celular: usuarioExiste.celular,
        email: usuarioExiste.email,
      },
      status: 200,
      token: token,
    });
  } catch (error: any) {
    console.error("Error al iniciar sesión", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const logout = (req: any, res: any) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });

  return res.sendStatus(200);
};
