import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
const prisma = new PrismaClient();

export const crearProfesor = async (req: any, res: any): Promise<void> => {
  const { nombres, apellidos, celular, email, password } = req.body;
  console.log("REQ: ", req.body);
  try {
    const hashPassword = await bcrypt.hash(password, 10)
    const profesor = await prisma.usuario.create({
      data: {
        nombres: nombres,
        apellidos: apellidos,
        celular: celular,
        email: email,
        password: hashPassword,
        rolId: 3,
        activo: false,
      },
    });

    res.status(201).json({
      message: "Profesor creado con éxito",
      profesor: profesor,
    });
  } catch (error: any) {
    console.error("Error al crear profesor:", error);
    res
      .status(500)
      .json({ message: "Error al crear profesor", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const showAllProfesores = async (req: any, res: any): Promise<void> => {
  try {
    const profesores = await prisma.usuario.findMany({
      where: { rolId: 3 },
      include: { rol: true },
    });

    res.status(200).json({ profesores });
  } catch (error) {
    console.error("Error al obtener profesores:", error);
    res
      .status(500)
      .json({ message: "Error al obtener profesores", error: error });
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
    res
      .status(500)
      .json({ message: "Error al actualizar profesor", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteProfesor = async (req: any, res: any): Promise<void> => {
  const { id } = req.params;
  console.log(req.params)
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
    res
      .status(500)
      .json({ message: "Error al eliminar profesor", error: error.message });
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
    res
      .status(500)
      .json({ message: "Error al obtener profesor", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const darleCargoCurso = async (req: Request, res: Response): Promise<void> => {
  const { cursoId, profesorId } = req.body
  console.log("cursoId: ", cursoId)
<<<<<<< HEAD
  console.log("profesorId: ", profesorId)
=======
>>>>>>> dc2913c (d)
  if (!cursoId && !profesorId) {
    res.status(404).json({
      message: 'Faltan datos'
    })
    return
  }

  try {
    await prisma.cursoUsuario.create({
      data: {
        cursoId: cursoId,
        userId: profesorId,
        tipo: 'CARGO',
        avance: '0',
      }
    })
    res.status(200).json({
      message: 'El procedimiento se ha completado exitosamente'
    })
    return
  } catch (error) {
    res.status(500).json({
      message: 'Ha ocurrido un error en el servidor'
    })
  } finally {
    prisma.$disconnect
  }

};

export const obtenerCargoCurso = async (req: Request, res: Response): Promise<void> => {
  const cursoId = req.params.id
  console.log("cursoId: ", cursoId)
  if (!cursoId) {
    res.status(404).json({
      message: 'Faltan datos'
    })
    return
  }

  try {
    const profesores = await prisma.cursoUsuario.findMany({
      where: {
        cursoId: cursoId,
        tipo: 'CARGO'
      },
      include: {
        usuario: true
      }
    })
    res.status(200).json({
      profesores: profesores
    })
    return
  } catch (error) {
    res.status(500).json({
      message: 'Ha ocurrido un error en el servidor'
    })
  } finally {
    prisma.$disconnect
  }

};

export const eliminarCargoCurso = async (req: Request, res: Response): Promise<void> => {
  const cursoUsuarioId = req.params.id
  console.log("cursoUsuarioId: ", cursoUsuarioId)
  if (!cursoUsuarioId) {
    res.status(404).json({
      message: 'Faltan datos'
    })
    return
  }

  try {
    await prisma.cursoUsuario.deleteMany({
      where: {
        id: Number(cursoUsuarioId),
      }
    })
    res.status(200).json({
      message: 'El procedimiento se ha completado exitosamente'
    })
    return
  } catch (error) {
    res.status(500).json({
      message: 'Ha ocurrido un error en el servidor'
    })
  } finally {
    prisma.$disconnect
  }

};