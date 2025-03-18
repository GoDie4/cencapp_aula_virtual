import { Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

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
    await registrarVentaYDetalles(curso.id);
    // Registrar Secciones y Clases
    await registrarSeccionesYClases(curso.id);

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
      nombre: "Topografía",
      slug: generarSlug("Topografía"),
      url_icono:
        "/public/categoriasIcono/url_icono-1741624940177-144144489.png",
      url_imagen: "/public/categorias/url_imagen-1741624940177-371970580.webp",
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
      nombre: "TOPOGRAFÍA EN OBRAS CIVILES",
      slug: generarSlug("TOPOGRAFÍA EN OBRAS CIVILES"),
      imagen: "/public/cursos/url_imagen-1741102295185-255449320.webp",
      banner: "topografia-banner.jpg",
      horas: 40,
      precio: 199.99,
      categoriaId: categoria.id,
    },
  });
  console.log("Curso Creado");
  return curso;
}

async function registrarSeccionesYClases(cursoId: string) {
  const secciones = [
    {
      nombre: "sesion 1",
      clases: [
        "Introducción a la topografía",
        "Conceptos básicos",
        "Materiales y recursos",
        "Metodología",
      ],
    },
    {
      nombre: "sesion 2",
      clases: [
        "Conociendo los Equipos Topográficos",
        "Manejo de Estación Total Topcon OS-105",
        "Manejo de Nivel de Ingeniero",
        "Manejo de GNSS (GPS DIFERENCIAL)",
      ],
    },
  ];

  const videos = [
    "ouPdZpziMbM",
    "wZ80815v76M",
    "UeSjUum3Y7M",
    "Oe7_nLfUNfU",
    "ULnhDPuxwMg",
    "-fh2X88vY5s",
    "JZcRPMnWESs",
    "Ce5Uxj1_SsU",
  ];

  let videoIndex = 0;

  for (let i = 0; i < secciones.length; i++) {
    const seccion = await prisma.seccion.create({
      data: {
        nombre: secciones[i].nombre,
        slug: generarSlug(secciones[i].nombre),
        cursoId: cursoId,
        posicion: i + 1,
      },
    });
    console.log(`Sección '${secciones[i].nombre}' Creada`);

    for (let j = 0; j < secciones[i].clases.length; j++) {
      console.log({
        nombre: secciones[i].clases[j],
        slug: generarSlug(secciones[i].clases[j]),
        duracion: "60 minutos",
        posicion: j + 1,
        url_video: videos[videoIndex],
        seccionId: seccion.id,
      });

      await prisma.clases.create({
        data: {
          nombre: secciones[i].clases[j],
          slug: generarSlug(secciones[i].clases[j]),
          duracion: "60 minutos",
          posicion: j + 1,
          url_video: videos[videoIndex],
          seccionId: seccion.id,
        },
      });
      console.log(`Clase '${secciones[i].clases[j]}' Creada`);
      videoIndex++;
    }
  }
}

async function registrarCursoDetalles(cursoId: string) {
  await prisma.cursoDetalles.create({
    data: {
      cursoId: cursoId,
      objetivo: "Dominar las técnicas de topografía en obras civiles.",
      presentacion:
        "Este curso te enseñará los fundamentos y aplicaciones de la topografía.",
      dirigido: "Ingenieros civiles, técnicos y estudiantes.",
      metodologia: "Clases teórico-prácticas con equipos especializados.",
      certificacion: "Certificado de finalización del curso.",
    },
  });
  console.log("CursoDetalles Creado");
}

async function registrarBeneficio(cursoId: string) {
  await prisma.beneficio.create({
    data: {
      icono: "compass-icon.png",
      texto: "Acceso a equipos topográficos durante las prácticas.",
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
      comentario: "Excelente curso y explicación.",
    },
  });
  console.log("Comentario Creado");
}

async function registrarVentaYDetalles(cursoId: string) {
  const usuario = await prisma.usuario.findFirst();
  if (!usuario) {
    throw new Error("No se encontró un usuario para registrar la venta.");
  }

  const venta = await prisma.ventas.create({
    data: {
      usuarioId: usuario.id,
      pedidoMercadoId: "PED123456789",
      fecha_aprobada: new Date(),
      estado: "aprobado",
      estado_detalle: "pagado",
      total_neto: new Prisma.Decimal(150),
      total: new Prisma.Decimal(199.99),
      ultimo_caracteres: "1234",
    },
  });
  console.log('Categoría Creada');
}

  await prisma.ventasDetalles.create({
    data: {
      ventaId: venta.id,
      productoId: cursoId,
      cantidad: 1,
      precio: new Prisma.Decimal(199.99),
    },
  });

  console.log("Venta y Detalle registrados correctamente");
}
main();
