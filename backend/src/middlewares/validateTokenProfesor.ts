import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const requireProfesor = async (req: any, res: any, next: any) => {
  if (!req.user) {
    return res.status(401).json({ message: "Autenticación requerida" });
  }

  try {
    const usuarioExiste = await prisma.usuario.findUnique({
      where: { email: req.user.email },
      include: { rol: true },
    });
    if (!usuarioExiste)
      return res.status(401).json({ message: "Usuario no encontrado" });

    req.user = usuarioExiste;

    if (
      usuarioExiste.rol.nombre === "profesor" ||
      usuarioExiste.rol.nombre === "administrador"
    ) {
      next();
    }

    return res.status(403).json({ message: "Acceso denegado" });
  } catch (error: any) {
    console.error("Error en requireProfesor");
    return res.status(500).json({ message: error.message });
  }
};
