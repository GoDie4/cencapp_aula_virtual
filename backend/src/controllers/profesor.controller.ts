import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const crearProfesor = async (req: any, res: any): Promise<void> => {
  const { nombres, apellidos, celular, email, password } = req.body;

  try {
    const profesor = await prisma.usuario.create({
      data: {
        nombres: nombres,
        apellidos: apellidos,
        celular: celular,
        email: email,
        password: password,
        rolId: 3,
        activo: false
      },
    });

    res.status(201).json({
      message: "Profesor creado con éxito",
      profesor: profesor,
    });
  } catch (error: any) {
    console.error("Error al crear profesor:", error);
    res.status(500).json({ message: "Error al crear profesor", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}

export const showAllProfesores = async (req: any, res: any): Promise<void> => {
  try {
    const profesores = await prisma.usuario.findMany({
      where: { rolId: 3 },
      include: { rol: true },
    });

    res.status(200).json({ profesores });
  } catch (error) {
    console.error("Error al obtener profesores:", error);
    res.status(500).json({ message: "Error al obtener profesores", error: error });
  } finally {
    await prisma.$disconnect();
  }
}; 

export const actualizarProfesor = async (req: any, res: any): Promise<void> => {
  const { id } = req.params;
  const { nombres, apellidos, celular, email, password } = req.body;

  try {
    const profesorBuscado = await prisma.usuario.findUnique({
      where: { id: id },
    });

    const profesor = await prisma.usuario.update({
      where: { id: id },
      data: {
        nombres: nombres,
        apellidos: apellidos,
        celular: celular,
        email: email,
        password: password ?? profesorBuscado?.password,
      },
    });

    res.status(200).json({
      message: "Profesor actualizado con éxito",
      profesor: profesor,
    });
  } catch (error: any) {
    console.error("Error al actualizar profesor:", error);
    res.status(500).json({ message: "Error al actualizar profesor", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteProfesor = async (req: any, res: any): Promise<void> => {
  const { id } = req.params;

  try {
    const profesor = await prisma.usuario.delete({
      where: { id: id },
    });

    res.status(200).json({
      message: "Profesor eliminado con éxito",
      profesor: profesor,
    });
  } catch (error: any) {
    console.error("Error al eliminar profesor:", error);
    res.status(500).json({ message: "Error al eliminar profesor", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const obtenerProfesorPorId = async (req: any, res: any): Promise<void> => {
  const { id } = req.params;

  try {
    const profesor = await prisma.usuario.findUnique({
      where: { id: id },
      include: { rol: true },
    });

    res.status(200).json({
      message: "Profesor obtenido con éxito",
      profesor: profesor,
    });
  } catch (error: any) {
    console.error("Error al obtener profesor por ID:", error);
    res.status(500).json({ message: "Error al obtener profesor", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};