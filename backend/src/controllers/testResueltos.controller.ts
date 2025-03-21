import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export async function obtenerExamenesResueltos(req: Request, res: Response) {
  const user = (req as any).user;
  try {
    const testResueltos = await prisma.testResuelto.findMany({
      where: {
        userId: user.id,
        tipo_prueba: "EXAMEN"
      },
      include: {
        examen: {
          include: {
            curso: true
          }
        }
      }
    })
    res.status(200).json({
      testResueltos
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Ha ocurrido un error en el servidor'
    })
  }
}

export async function obtenerExamenResueltoDocumento(req: Request, res: Response) {
  const {
    testId,
    userId
  } = req.body

  if (!testId) {
    res.status(404).json({
      message: 'No se colocó el ID del examen a revisar'
    })
    return
  }

  try {
    const testResuelto = await prisma.testResuelto.findUnique({
      where: { id: testId, userId: userId }
    })
    if (!testResuelto) {
      res.status(404).json({
        message: 'No se ha encontrado el documento'
      })
      return
    }
    res.status(200).sendFile(process.cwd() + testResuelto.url_archivo_resultado, {
      headers: {
        "Content-Type": testResuelto.mime_type,
        "nombre": testResuelto.id
      }
    })

  } catch (error) {
    res.status(500).json({
      message: 'Ocurrió un error en el servidor'
    })
    return
  }
}

export async function colocarPuntaje (req: Request, res: Response) {
  const {
    puntaje,
    testId
  } = req.body

  try {
    await prisma.testResuelto.update({
      where: {
        id: testId
      },
      data: {
        puntaje_final: String(puntaje),
        estado: "Finalizado"
      }
    })
    res.status(200).json({
      message: 'Nota Agregada Exitosamente!'
    })
    return
  } catch (e) {
    res.status(500).json({
      message: 'Ha ocurrido un error'
    })
    return
  }
}

export async function obtenerEjerciciosResueltos(req: Request, res: Response) {
  const user = (req as any).user;
  try {
    const testResueltos = await prisma.testResuelto.findMany({
      where: {
        userId: user.id,
        tipo_prueba: "EJERCICIOS"
      },
      include: {
        examen: {
          include: {
            clase: true
          }
        }
      }
    })
    res.status(200).json({
      testResueltos
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Ha ocurrido un error en el servidor'
    })
  }
}