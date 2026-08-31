// prisma/seed.ts
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seed...');

  // 2. Criação de usuários com diferentes roles
  const hashedPassword = await bcrypt.hash('123', 10);

  // Cria os usuários se ainda não existirem; se existirem, mantém os dados.
  const userComum = await prisma.user.upsert({
    where: { email: 'user@email.com' },
    update: {},
    create: {
      name: 'Usuario Comum',
      email: 'user@email.com',
      password: hashedPassword,
      role: Role.USER,
    },
  });

  const userOng = await prisma.user.upsert({
    where: { email: 'ong@email.com' },
    update: {},
    create: {
      name: 'ONG Petly',
      email: 'ong@email.com',
      password: hashedPassword,
      role: Role.ONG,
    },
  });

  const userVet = await prisma.user.upsert({
    where: { email: 'vet@email.com' },
    update: {},
    create: {
      name: 'Veterinário',
      email: 'vet@email.com',
      password: hashedPassword,
      role: Role.VET,
    },
  });

  const userAdmin = await prisma.user.upsert({
    where: { email: 'admin@email.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@email.com',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log('Seed finalizado com sucesso!');
  console.log({ userComum, userOng, userVet, userAdmin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
