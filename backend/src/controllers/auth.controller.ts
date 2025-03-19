import { PrismaClient } from "@prisma/client";
import { LoginRequest, RegisterRequest } from "../interfaces/auth.interface";
import { Response, Request } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import createAccessToken from "../utils/jwt";
import { sendEmail } from "./mail.controller";
const prisma = new PrismaClient();

export const crearAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { nombres, apellidos, celular, email, password } = req.body;

  try {
    const usuarioExiste = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExiste) {
      res.status(400).json({ message: "El usuario ya existe" });
    }

    const defaultRole = await prisma.rol.findFirst({
      where: { nombre: "administrador" },
    });

    if (!defaultRole) {
      res
        .status(500)
        .json({ message: "El rol por defecto no está configurado" });
      return;
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

    res.status(201).json({
      message: "Registrado correctamente",
      usuario: {
        id: nuevoUsuario.id,
        nombres: nuevoUsuario.nombres,
        apellidos: nuevoUsuario.apellidos,
        email: nuevoUsuario.email,
        celular: nuevoUsuario.celular,
      },
      token: token,
    });
    return;
  } catch (error) {
    console.error("Error al registrar usuario", error);
    res.status(500).json({ message: "Error interno del servidor" });
    return;
  } finally {
    prisma.$disconnect;
  }
};

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
      //domain: ".cencapperu.com",
      maxAge: 2 * 60 * 60 * 1000,
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
      token: token,
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
  const { email, password, mantenerConexion } = req.body;

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
      // domain: ".cencapperu.com",
      maxAge: mantenerConexion ? 30 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000,
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
        rolId: usuarioExiste.rolId,
      },
      status: 200,
      token: token,
    });
  } catch (error: any) {
    console.error("Error al iniciar sesión", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const recuperarContrasena = async (req: any, res: any) => {
  const { email } = req.body;

  const user = await prisma.usuario.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: "Correo no registrado" });

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 30);

  await prisma.passwordResetToken.create({
    data: {
      token,
      expiresAt: expires,
      userId: user.id,
    },
  });

  const resetLink = `http://localhost:3000/restablecer?token=${token}`;

  await sendEmail(email, "Recuperar contraseña", `RecuperarContrasena.html`, {
    enlace: resetLink,
    nombre: user.nombres.split(" ")[0],
  });

  res.json({
    message: "Te hemos enviado un enlace para restablecer tu contraseña.",
  });
};

export const cambiarContrasena = async (req: any, res: any) => {
  const { token, newPassword } = req.body;

  const registro = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!registro || registro.expiresAt < new Date()) {
    return res.status(400).json({ message: "Token inválido o expirado" });
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.usuario.update({
    where: { id: registro.userId },
    data: { password: hashed },
  });

  await prisma.passwordResetToken.delete({ where: { token } });

  res.json({ message: "Contraseña actualizada con éxito" });
};

export const logout = (req: any, res: any) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  return res.sendStatus(200);
};
