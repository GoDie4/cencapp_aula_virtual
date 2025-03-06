import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

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

async function registrarAdministrador() {

  const hashPassword = await bcrypt.hash('administrador', 10)
  await prisma.usuario.create({
    data: {
      nombres: 'Administrador',
      apellidos: '',
      celular: '983432123',
      email: 'administrador@gmail.com',
      password: hashPassword,
      rolId: 1
    }
  })
  console.log('Administrador Creado')
}

registrarRoles()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

registrarAdministrador()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })