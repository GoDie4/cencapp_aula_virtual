import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const requireEstudiante = async (req: any, res: any, next: any) => {

  if (!req.user) {
    return res.status(401).json({ message: "Autenticación requerida" });
  }

  try {
    const usuarioExiste = await prisma.usuario.findUnique({
      where: { id: req.user.id },
      include: { rol: true },
    });
    if (!usuarioExiste)
      return res.status(401).json({ message: "Usuario no encontrado" });

    req.user = usuarioExiste;

    if (
      usuarioExiste.rol.nombre === "estudiante" ||
      usuarioExiste.rol.nombre === "administrador"
    ) {
      next();
    }

    return res.status(403).json({ message: "Acceso denegado" });
  } catch (error: any) {
    console.error("Error en requireEstudiante");
    return res.status(500).json({ message: error.message });
  }
};
