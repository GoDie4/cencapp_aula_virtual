import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  try {
    // Registrar Roles
    await registrarRoles();

    // Registrar Administrador
    await registrarAdministrador();

    // Registrar Categoría
    await registrarCategoria();

    // Registrar Curso
    const curso = await registrarCurso();

    // Registrar Seccion
    const seccion = await registrarSeccion(curso.id);

    // Registrar Clase
    await registrarClase(seccion.id);

    // Registrar CursoDetalles
    await registrarCursoDetalles(curso.id);

    // Registrar Beneficio
    await registrarBeneficio(curso.id);

    // Registrar CursoUsuario
    await registrarCursoUsuario(curso.id);

    // Registrar Comentario
    await registrarComentario();

    console.log("Seed data inserted successfully!");
  } catch (error) {
    console.error("Error during seed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function registrarRoles() {
  const roles = ["administrador", "estudiante", "profesor", "prueba"];

  for (const nombre of roles) {
    const rolExiste = await prisma.rol.findUnique({
      where: { nombre },
    });

    if (!rolExiste) {
      await prisma.rol.create({
        data: { nombre },
      });

      console.log(`Rol '${nombre}' registrado.`);
    }
  }
}

async function registrarAdministrador() {
  const hashPassword = await bcrypt.hash("administrador", 10);
  await prisma.usuario.create({
    data: {
      nombres: "Administrador",
      apellidos: "Logos Perú",
      celular: "983432123",
      email: "administrador@gmail.com",
      password: hashPassword,
      rolId: 1,
    },
  });
  console.log("Administrador Creado");
}

const generarSlug = (texto: string) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

async function registrarCategoria() {
  await prisma.categorias.create({
    data: {
      nombre: "Desarrollo Web",
      slug: generarSlug("Desarrollo Web"),
      url_icono: "web-icon.png",
      url_imagen: "web-image.jpg",
    },
  });
  console.log("Categoría Creada");
}

async function registrarCurso() {
  const categoria = await prisma.categorias.findFirst();
  if (!categoria) {
    throw new Error("No se encontró la categoría para crear el curso.");
  }

  const curso = await prisma.curso.create({
    data: {
      nombre: "Curso de React",
      slug: generarSlug("Curso de React"),
      imagen: "react-course.jpg",
      banner: "react-banner.jpg",
      horas: 30,
      precio: 149.99,
      categoriaId: categoria.id,
    },
  });
  console.log("Curso Creado");
  return curso;
}

async function registrarSeccion(cursoId: string) {
  const seccion = await prisma.seccion.create({
    data: {
      nombre: "Introducción a React",
      slug: generarSlug("Introducción a React"),
      cursoId: cursoId,
      posicion: 1,
    },
  });
  console.log("Sección Creada");
  return seccion;
}

async function registrarClase(seccionId: string) {
  await prisma.clases.create({
    data: {
      nombre: "Componentes en React",
      slug: generarSlug("Componentes en React"),
      duracion: "45 minutos",
      posicion: 1,
      url_video: "react-components.mp4",
      seccionId: seccionId,
    },
  });
  console.log("Clase Creada");
}

async function registrarCursoDetalles(cursoId: string) {
  await prisma.cursoDetalles.create({
    data: {
      cursoId: cursoId,
      objetivo: "Aprender a construir aplicaciones con React.",
      presentacion: "Este curso te enseñará los fundamentos de React.",
      dirigido: "Desarrolladores web.",
      metodologia: "Clases prácticas y teóricas.",
      certificacion: "Certificado de finalización.",
    },
  });
  console.log("CursoDetalles Creado");
}

async function registrarBeneficio(cursoId: string) {
  await prisma.beneficio.create({
    data: {
      icono: "code-icon.png",
      texto: "Acceso a código fuente.",
      cursoId: cursoId,
    },
  });
  console.log("Beneficio Creado");
}

async function registrarCursoUsuario(cursoId: string) {
  const usuario = await prisma.usuario.findFirst();
  if (!usuario) {
    throw new Error("No se encontró un usuario para crear CursoUsuario.");
  }

  await prisma.cursoUsuario.create({
    data: {
      cursoId: cursoId,
      userId: usuario.id,
      tipo: "MATRICULADO",
    },
  });
  console.log("CursoUsuario Creado");
}

async function registrarComentario() {
  const usuario = await prisma.usuario.findFirst();
  const clase = await prisma.clases.findFirst();

  if (!usuario || !clase) {
    throw new Error("No se encontró usuario o clase para crear comentario.");
  }

  await prisma.comentarios.create({
    data: {
      userId: usuario.id,
      claseId: clase.id,
      comentario: "Excelente explicación.",
    },
  });
  console.log("Comentario Creado");
}



main();
