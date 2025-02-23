import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

registrarRoles()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
