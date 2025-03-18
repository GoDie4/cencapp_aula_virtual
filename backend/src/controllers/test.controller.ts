import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import multer from "multer";  
import path from "node:path";
import fs from "fs";
import fsPromise from "fs/promises";

const prisma = new PrismaClient();

const storageRes  = multer.diskStorage({
  destination(req, file, callback) {
    let folder = "private/"
    if (file.fieldname === "respuesta") {
      const user = (req as any).user;
      folder = folder + "curso/respuesta/" + user.id;
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
      }
      callback(null, folder);
    } else {
      throw new Error("Error");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "private/";
    if (file.fieldname === "archivo") {
      if (req.body.tipo_prueba === "EXAMEN") {
        folder = folder + "curso/examen";
        if (!fs.existsSync(folder)) {
          fs.mkdirSync(folder, { recursive: true });
        }
        cb(null, folder);
      } else if (req.body.tipo_prueba === "EJERCICIOS") {
        folder = folder + "curso/ejercicio";
        if (!fs.existsSync(folder)) {
          fs.mkdirSync(folder, { recursive: true });
        }
        cb(null, folder);
      } else {
        throw new Error("Error");
      } 
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const uploadArchivo = multer({
  storage: storage,
  limits: {
    files: 1,
  },
  fileFilter: function (req, file, cb) {
    // Filtro para aceptar solo ciertos tipos de archivos (imágenes en este ejemplo)
    const filetypes = /doc|docx|pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(null, false);
  },
});

const uploadArchivoRespuesta = multer({
  storage: storageRes,
  limits: {
    files: 1, // Límite de número de archivos subidos por campo (por ejemplo, máximo 2 imágenes 'imagen')
  },
  fileFilter: function (req, file, cb) {
    // Filtro para aceptar solo ciertos tipos de archivos (imágenes en este ejemplo)
    const filetypes = /doc|docx|pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(null, false);
  },
});

export const uploadArchivoTest = uploadArchivo.single("archivo");

export const uploadArchivoRes = uploadArchivoRespuesta.single("respuesta");


export async function showAllTests(req: Request, res: Response) {
  try {
    const tests = await prisma.test.findMany({
      where: {
        tipo_prueba: "EXAMEN",
      },
      include: {
        curso: true,
      },
    });
    res.status(200).json({ tests });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error interno al obtener los tests" });
    return;
  }
}

export async function showAllEjercicios(req: Request, res: Response) {
  try {
    const ejercicios = await prisma.test.findMany({
      where: {
        tipo_prueba: "EJERCICIOS",
      },
      include: {
        curso: true,
      },
    });
    res.status(200).json({ tests: ejercicios });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Error interno al obtener los ejercicios" });
    return;
  }
}

export async function createTest(req: Request, res: Response) {
  const {
    titulo,
    descripcion,
    claseId,
    cursoId,
    fecha_fin,
    fecha_inicio,
    puntaje_maxima,
    tiempo_limite,
    tipo_prueba,
  } = req.body
  console.log(req.body['titulo'])
  if (
    !titulo ||
    !descripcion ||
    !fecha_fin ||
    !fecha_inicio ||
    !puntaje_maxima ||
    !tiempo_limite ||
    !tipo_prueba
  ) {
    res.status(400).json({ message: "Faltan datos para crear el examen" });
    return;
  }
  if (!req.file) {
    res.status(400).json({ message: "Falta el archivo para crear el test" });
    return;
  }
  const nombreArchivo = req.file.filename;
  const rutaArchivo = "/" + req.file.path.replace(/\\/g, "/");
  console.log(nombreArchivo);
  console.log(rutaArchivo);
  try {
    
    const nuevoTest = await prisma.test.create({
      data: {
        estado: 'Pendiente',
        url_archivo: rutaArchivo ?? "",
        titulo: titulo,
        descripcion: descripcion,
        claseId: claseId ? claseId : null,
        cursoId: cursoId ? cursoId : null,
        fecha_inicio: new Date(fecha_inicio).toISOString(),
        fecha_fin: new Date(fecha_fin).toISOString(),
        puntaje_maxima: parseFloat(puntaje_maxima),
        activo: true,
        mime_type: req.file.mimetype,
        size: req.file.size,
        tipo_prueba: tipo_prueba,
        tiempo_limite: Number(tiempo_limite),
      },
    });

    res
      .status(201)
      .json({ message: "Examen creado con éxito", test: nuevoTest });
    return
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error interno al crear el examen" });
    return;
  }
}

export async function createEjercicio(req: Request, res: Response) {
  const {
    titulo,
    descripcion,
    claseId,
    fecha_fin,
    fecha_inicio,
    puntaje_maxima,
    tiempo_limite,
    tipo_prueba,
    cursoId
  } = req.body;
  console.log(req.body)
  console.log('Aya')
  if (
    !titulo ||
    !descripcion ||
    !fecha_fin ||
    !fecha_inicio ||
    !puntaje_maxima ||
    !tiempo_limite ||
    !tipo_prueba
  ) {
    res.status(400).json({ message: "Faltan datos para crear el ejercicio" });
    return;
  }
  if (!req.file) {
    res
      .status(400)
      .json({ message: "Falta el archivo para crear el ejercicio" });
    return;
  }
  const nombreArchivo = req.file.filename;
  const rutaArchivo = "/" + req.file.path.replace(/\\/g, "/");
  console.log(nombreArchivo);
  console.log(rutaArchivo);
  try {
    const nuevoEjercicio = await prisma.test.create({
      data: {
        estado: 'Pendiente',
        url_archivo: rutaArchivo ?? "",
        titulo: titulo,
        descripcion: descripcion,
        claseId: claseId ? claseId : null,
        cursoId: cursoId ? cursoId : null,
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin,
        mime_type: req.file.mimetype,
        size: req.file.size,
        puntaje_maxima: puntaje_maxima,
        activo: true,
        tipo_prueba: "EJERCICIOS",
        tiempo_limite: Number(tiempo_limite),
      },
    });

    res
      .status(201)
      .json({
        message: "Ejercicio creado con éxito",
        ejercicio: nuevoEjercicio,
      });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error interno al crear el ejercicio" });
    return;
  }
}

export async function actualizarTest(req: Request, res: Response) {
  const { id } = req.params;
  const {
    titulo,
    descripcion,
    activo,
    fecha_fin,
    fecha_inicio,
    puntaje_maxima,
    tiempo_limite,
    tipo_prueba,
  } = req.body;
  console.log(req.body)
  console.log(req.body['titulo'])
  if (
    !titulo ||
    !descripcion ||
    !activo ||
    !fecha_fin ||
    !fecha_inicio ||
    !puntaje_maxima ||
    !titulo ||
    !tiempo_limite ||
    !tipo_prueba
  ) {
    res.status(400).json({ message: "Faltan datos para actualizar el test" });
    return;
  }

  const Test = await prisma.test.findUnique({
    where: { id: id }
  })

  if (!Test) {
    res.status(404).json({ message: "Test no encontrado" });
    return;
  }

  if (req.file?.filename) {
    const nombreArchivo = req.file.filename;
    const rutaArchivo = "/" + req.file.path.replace(/\\/g, "/");
    console.log(nombreArchivo);
    console.log(rutaArchivo);
    try {
      const nuevoTest = await prisma.test.update({
        where: { id: id },
        data: {
          url_archivo: rutaArchivo ?? "",
          titulo: titulo,
          descripcion: descripcion,
          fecha_inicio: fecha_inicio,
          fecha_fin: fecha_fin,
          puntaje_maxima: puntaje_maxima,
          activo: Boolean(activo),
          mime_type: req.file.mimetype ? req.file.mimetype : Test.mime_type,
          size: req.file.size ? req.file.size : Test.size,
          tipo_prueba: tipo_prueba,
          tiempo_limite: Number(tiempo_limite),
        },
      });

      if (Test.url_archivo) {
        const rutaArchivoNuevo = path.join(process.cwd(), Test.url_archivo);

        try {
          await fsPromise.unlink(rutaArchivoNuevo);
          console.log(`Archivo eliminado: ${rutaArchivoNuevo}`);
        } catch (unlinkError) {
          console.error(
            `Error al eliminar archivo: ${rutaArchivoNuevo}`,
            unlinkError
          );
        }
      }

      res
        .status(200)
        .json({
          message: "Ejercicio actualizado con éxito",
          ejercicio: nuevoTest,
        });
      return
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .json({ message: "Error interno al actualizar el ejercicio" });
      return;
    }
  } else {
    await prisma.test.update({
      where: { id: id },
      data: {
        titulo: titulo,
        descripcion: descripcion,
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin,
        puntaje_maxima: puntaje_maxima,
        activo: Boolean(activo),
        tipo_prueba: tipo_prueba,
        tiempo_limite: Number(tiempo_limite),
      },
    });
    res.status(200).json({ message: "Ejercicio actualizado con éxito" });
    return
  }
}

export async function deleteTest(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const test = await prisma.test.delete({
      where: { id: id },
      select: {
        url_archivo: true,
      },
    });
    if (test.url_archivo) {
      const rutaArchivo = path.join(process.cwd(), test.url_archivo);

      try {
        await fsPromise.unlink(rutaArchivo);
        console.log(`Archivo eliminado: ${rutaArchivo}`);
        res.status(200).json({ message: "Test eliminado con éxito" });
        return;
      } catch (unlinkError) {
        console.error(`Error al eliminar archivo: ${rutaArchivo}`, unlinkError);
        res.status(404).json({ message: "Error al eliminar el archivo" });
        return;
      }
    } else {
      res.status(200).json({ message: "Test eliminado con éxito" });
      return;
    }

    return;
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error interno al eliminar el test" });
    return;
  }
}

export async function obtenerTestPorId(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const test = await prisma.test.findUnique({
      where: { id: id },
      include: {
        curso: true,
      },
    });
    res.status(200).json({ test });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error interno al obtener el test" });
    return;
  }
}

export async function obtenerDocumentoTestPorId(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const test = await prisma.test.findUnique({
      where: { id: id }
    });
    if (!test) {
      res.status(404).json({ message: "Test no encontrado" });
      return;
    }
    res.status(200).sendFile(process.cwd() + test.url_archivo, {
      headers: {
        "Content-Type": test.mime_type,
        "nombre": test.titulo,
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error interno al obtener el documento" });
    return;
  }
}

export async function obtenerExamenesPendientes(req: Request, res: Response) {
  const user = (req as any).user;

  try {
    const examenes = await prisma.cursoUsuario.findMany({
      where: {
        userId: user.id
      },
      include: {
        curso: {
          include: {
            test: {
              where: {
                examenesResueltos: {
                  every: {
                    estado: "EnRevision"
                  }
                }
              },
              include: {
                examenesResueltos: true
              }
            }
          }
        }
      }
    })
    res.status(200).json({
      examenes
    })
  }
  catch (error) {
    res.status(500).json({
      message: 'Ocurrió un error en el servidor'
    })
  }
}

export async function obtenerExamenesAsignados(req: Request, res: Response) {
  const user = (req as any).user;

  try {
    const examenes = await prisma.cursoUsuario.findMany({
      where: {
        userId: user.id
      },
      include: {
        curso: {
          include: {
            test: {
              where: {
                examenesResueltos: {
                  none: {
                    userId: user.id
                  }
                }
              },
              include: { curso: true }
            }
          }
        }
      }
    })
    res.status(200).json({
      examenes
    })
  }
  catch (error) {
    res.status(500).json({
      message: 'Ocurrió un error en el servidor'
    })
  }
} 

export async function enviarExamen(req: Request, res: Response) {
  const user = (req as any).user;
  const { examenId } = req.body 
  try {
    if (!req.file) {
      res
        .status(400)
        .json({ message: "Falta el archivo para crear el ejercicio" });
      return;
    }
    const rutaArchivo = "/" + req.file.path.replace(/\\/g, "/");
    await prisma.testResuelto.create({
      data: {
        examenId: examenId,
        userId: user.id,
        puntaje_final: "0",
        estado: 'EnRevision',
        url_archivo_resultado: rutaArchivo ?? ""
      }
    })
    res.status(201).json({
      message: 'El examen ha sido enviado a revisión'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Ocurrió un error en el servidor'
    })
    return
  }
} 