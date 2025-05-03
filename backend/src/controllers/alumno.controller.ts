import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Response } from "express";

const prisma = new PrismaClient();

export const crearAlumno = async (req: any, res: any): Promise<void> => {
  const { nombres, apellidos, celular, email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const alumno = await prisma.usuario.create({
      data: {
        nombres: nombres,
        apellidos: apellidos,
        celular: celular,
        email: email,
        password: hashPassword,
        rolId: 2,
      },
    });

    res.status(201).json({
      message: "Alumno creado con éxito",
      alumno: alumno,
    });
  } catch (error: any) {
    console.error("Error al crear alumno:", error);
    res
      .status(500)
      .json({ message: "Error al crear alumno", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const showAllAlumnos = async (req: any, res: any): Promise<void> => {
  try {
    const alumnos = await prisma.usuario.findMany({
      where: { rolId: 2 },
      include: {
        rol: true,

        examenesResueltos: {
          select: {
            puntaje_final: true,
          },
        },
      },
    });

    res.status(200).json({ alumnos });
  } catch (error) {
    console.error("Error al obtener alumnos:", error);
    res.status(500).json({ message: "Error al obtener alumnos", error: error });
  } finally {
    await prisma.$disconnect();
  }
};

export const actualizarAlumno = async (req: any, res: any): Promise<void> => {
  const { id } = req.params;
  const { nombres, apellidos, celular, email, password } = req.body;

  try {
    const alumno = await prisma.usuario.update({
      where: { id: id },
      data: {
        nombres: nombres,
        apellidos: apellidos,
        celular: celular,
        email: email,
        password: password,
      },
    });

    res.status(200).json({
      message: "Alumno actualizado con éxito",
      alumno: alumno,
    });
  } catch (error: any) {
    console.error("Error al actualizar alumno:", error);
    res
      .status(500)
      .json({ message: "Error al actualizar alumno", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteAlumno = async (req: any, res: any): Promise<void> => {
  const { id } = req.params;

  try {
    const alumno = await prisma.usuario.delete({
      where: { id: id },
    });

    res.status(200).json({
      message: "Alumno eliminado con éxito",
      alumno: alumno,
    });
  } catch (error: any) {
    console.error("Error al eliminar alumno:", error);
    res
      .status(500)
      .json({ message: "Error al eliminar alumno", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const obtenerAlumnoPorId = async (req: any, res: any): Promise<void> => {
  const { id } = req.params;

  try {
    const alumno = await prisma.usuario.findUnique({
      where: { id: id },
      include: { rol: true },
    });

    res.status(200).json({
      message: "Alumno obtenido con éxito",
      alumno: alumno,
    });
  } catch (error: any) {
    console.error("Error al obtener alumno por ID:", error);
    res
      .status(500)
      .json({ message: "Error al obtener alumno", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const obtenerTotalDataPorAlumno = async (req: any, res: Response) => {
  const userId = req.user.id;

  try {
    const totalCursosComprados = await prisma.cursoUsuario.count({
      where: {
        usuario: {
          id: userId,
        },
      },
    });

    const totalExamenes = await prisma.testResuelto.count({
      where: {
        puntaje_final: {
          gt: "13",
        },
        userId: userId,
      },
    });

    const totalCertificados = await prisma.certificados.count({
      where: {
        usuarioId: userId,
      },
    });

    res.status(200).json({
      data: {
        totalCursos: totalCursosComprados,
        totalExamenes: totalExamenes,
        totalCertificados: totalCertificados,
      },
    });
  } catch (error: any) {
    console.error(
      "Error al traer total de cursos, éxamenes y certificados:",
      error
    );
    res
      .status(500)
      .json({ message: "Error al obtener alumno", error: error.message });
  }
};
