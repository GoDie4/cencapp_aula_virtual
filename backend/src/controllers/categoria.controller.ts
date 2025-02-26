import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

import multer from 'multer';
import path from "node:path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Directorio donde se guardarán las imágenes de las categorías
    // Usando process.cwd() para obtener la ruta a la raíz del proyecto
    const categoriasImagesDir = path.join(process.cwd(), 'public', 'categorias');
    cb(null, categoriasImagesDir); // Guarda en 'uploads/categorias' relativo a la raíz del proyecto
  },
  filename: function (req, file, cb) {
    // Generar un nombre de archivo único (igual que antes)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configuración de Multer con memoryStorage y límites extendidos
const upload = multer({
  storage: storage, // Usamos memoryStorage en lugar de diskStorage
  limits: {
    fileSize: 1024 * 1024 * 5, // Límite de tamaño de archivo: 5MB
    files: 2,                  // Límite de número de archivos subidos por campo (por ejemplo, máximo 2 imágenes 'url_imagen')
    fields: 10,                 // Límite de campos no-archivo (campos de texto)
    fieldSize: 1024 * 100,     // Tamaño máximo de un campo no-archivo (100KB)
    parts: 15,                  // Límite total de partes (archivos + campos) en la petición
    headerPairs: 200            // Límite de pares clave-valor de cabecera
  },
  fileFilter: function (req, file, cb) {
    // Filtro para aceptar solo ciertos tipos de archivos (imágenes en este ejemplo)
    const filetypes = /jpeg|jpg|png|webp|avif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(null, false);
  }
});

// Middleware para un solo archivo subido con el campo 'url_imagen' (usando la configuración 'upload' de arriba)
export const uploadImageCategoriaMemory = upload.single('url_imagen');

// En tu controlador, cuando uses este middleware, el archivo estará disponible en req.file (en memoria)
export const createCategoriaMemory = async (req: Request, res: Response): Promise<void> => {
  const { nombres } = req.body;

  if (!nombres) {
    res.status(400).json({ message: "El nombre de la categoría es obligatorio." });
  }

  if (req.file) {
    // const imagenBuffer = req.file.buffer;
    const imagenMimetype = req.file.mimetype;
    const imagenOriginalName = req.file.originalname;
    const imagenSize = req.file.size;

    console.log("Nombre original del archivo:", imagenOriginalName);
    console.log("Tipo MIME del archivo:", imagenMimetype);
    console.log("Tamaño del archivo (bytes):", imagenSize); // Muestra los primeros 50 bytes del buffer

    // Aquí podrías procesar el buffer de la imagen en memoria
    // Por ejemplo, redimensionarla, guardarla en un servicio en la nube, etc.

    // En este ejemplo, simplemente guardaremos la ruta de un archivo temporal (simulando que la guardamos en disco después de procesarla)
    const tempFilePath = `/public/categorias/${Date.now()}-${imagenOriginalName}`; // Ruta temporal simulada
    console.log("Simulando guardar el archivo procesado en:", tempFilePath);

    const url_imagen_path = tempFilePath; // Usar la ruta temporal simulada como url_imagen
    try {
      const nuevaCategoria = await prisma.categorias.create({
        data: {
          nombre: nombres,
          url_imagen: url_imagen_path,
        },
      });
      res.status(201).json({ message: "Categoría creada con éxito (usando memoryStorage)", categorias: nuevaCategoria });
      return
    } catch (error: any) {
      console.error("Error al crear categoría:", error);
      if (error.code === 'P2002') {
        res.status(409).json({ message: "Ya existe una categoría con ese nombre." });
        return
      }
      res.status(500).json({ message: "Error interno del servidor al crear la categoría", error: error.message });
      return
    }


  } else {
    res.status(400).json({ message: "Por favor, sube un archivo de imagen para la categoría." });
    return
  }
};

export const deleteCategoria = () => {

}

export const updateCategoria = () => {

}

export const showCategoria = () => {

}

export const showAllCategorias = async (req: Request, res: Response): Promise<void> => {
  try {
    // Utiliza prisma.categorias.findMany() para obtener todas las categorías de la base de datos
    const categorias = await prisma.categorias.findMany();

    // Envía una respuesta exitosa con el código de estado 200 y las categorías en formato JSON
    res.status(200).json({ categorias });

  } catch (error) {
    console.error("Error al obtener categorías:", error);
    // En caso de error, envía una respuesta de error con código de estado 500 (Error interno del servidor)
    res.status(500).json({ message: "Error al obtener la lista de categorías", error: error });
  } finally {
    await prisma.$disconnect();
  }
}

export const actualizarCategoria = async (req: Request, res: Response): Promise<void> => {
  const categoriaId = parseInt(req.params.id);
  const { nombres } = req.body; // Nuevo nombre de categoría desde req.body
  const nuevaImagen = req.file; // Nuevo archivo de imagen subido (si existe)

  if (isNaN(categoriaId)) {
      res.status(400).json({ message: "ID de categoría no válido." });
      return;
  }

  if (!nombres) {
      res.status(400).json({ message: "El nombre de la categoría es obligatorio para actualizar." });
      return;
  }

  try {
      // 1. Buscar la categoría existente en la base de datos, incluyendo la url_imagen actual
      const categoriaExistente = await prisma.categorias.findUnique({
          where: { id: categoriaId },
          select: { url_imagen: true } // Necesitamos la ruta de la imagen actual para poder eliminarla si se reemplaza
      });

      if (!categoriaExistente) {
          res.status(404).json({ message: "Categoría no encontrada para actualizar." });
          return;
      }

      let url_imagen_path_actualizada: string | null = categoriaExistente.url_imagen; // Inicialmente usa la ruta de imagen existente

      // 2. Manejar la subida de nueva imagen (si se proporcionó una)
      if (nuevaImagen) {
          // Generar nuevo nombre de archivo (reutilizando la lógica de filename de diskStorage)
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const nuevoNombreArchivo = nuevaImagen.fieldname + '-' + uniqueSuffix + path.extname(nuevaImagen.originalname);
          const nuevaImagenFilePath = path.join(__dirname, '../../../public/categorias', nuevoNombreArchivo);

          // Guardar la nueva imagen en 'public/categorias' (Multer ya lo hace con diskStorage, req.file.path contendrá la ruta temporal)
          // No necesitamos mover el archivo aquí con diskStorage, Multer ya lo guarda en el destino correcto

          url_imagen_path_actualizada = `/categorias/${nuevoNombreArchivo}`; // Nueva ruta URL pública para la base de datos

          // 3. Eliminar la imagen anterior del sistema de archivos (si existía una imagen anterior)
          if (categoriaExistente.url_imagen) {
              const rutaImagenAnterior = path.join(__dirname, '../../../public', categoriaExistente.url_imagen);
              try {
                  await fs.unlink(rutaImagenAnterior);
                  console.log(`Imagen anterior eliminada: ${rutaImagenAnterior}`);
              } catch (unlinkError: any) {
                  console.error(`Error al eliminar imagen anterior: ${rutaImagenAnterior}`, unlinkError);
                  // Loguear error, no bloquear la actualización por fallo al borrar imagen antigua
              }
          }
      }
      // Si no se subió una nueva imagen (nuevaImagen es null), url_imagen_path_actualizada mantiene el valor anterior (o null si no tenía imagen)

      // 4. Actualizar la categoría en la base de datos con el nuevo nombre y (posiblemente) nueva ruta de imagen
      const categoriaActualizada = await prisma.categorias.update({
          where: { id: categoriaId },
          data: {
              nombre: nombres,
              url_imagen: url_imagen_path_actualizada, // Usar la nueva ruta de imagen (o la existente si no se subió nueva imagen)
          },
      });

      // 5. Enviar respuesta de éxito con la categoría actualizada
      res.status(200).json({ message: "Categoría actualizada con éxito.", categoria: categoriaActualizada });

  } catch (error: any) {
      console.error("Error al actualizar categoría:", error);
      res.status(500).json({ message: "Error al actualizar la categoría", error: error.message });
  } finally {
      await prisma.$disconnect();
  }
};

export const obtenerCategoriaPorId = async (req: Request, res: Response): Promise<void> => {
  const categoriaId = parseInt(req.params.id);

  if (isNaN(categoriaId)) {
      res.status(400).json({ message: "ID de categoría no válido." });
      return;
  }

  try {
      // Buscar una categoría por ID en la base de datos
      const categoria = await prisma.categorias.findUnique({
          where: { id: categoriaId }
      });

      if (categoria) {
          // Si se encuentra la categoría, enviarla en la respuesta
          res.status(200).json({ categoria });
      } else {
          // Si no se encuentra la categoría, enviar un error 404
          res.status(404).json({ message: "Categoría no encontrada." });
      }

  } catch (error: any) {
      console.error("Error al obtener categoría por ID:", error);
      res.status(500).json({ message: "Error al obtener la categoría", error: error.message });
  } finally {
      await prisma.$disconnect();
  }
};