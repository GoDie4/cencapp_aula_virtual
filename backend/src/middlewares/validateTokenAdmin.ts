import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const requiredAdmin = async (req: any, res: any, next: any) => {
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

    if (usuarioExiste.rol.nombre !== "administrador") {
      return res
        .status(403)
        .json({ message: "Acceso solo para administradores" });
    }
    next();
  } catch (error: any) {
    console.error("Error en requiredAdmin");
    return res.status(500).json({ message: error.message });
  }
};
