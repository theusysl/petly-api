// prisma/seed.ts
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seed...');

  // 1. Deleta dados existentes para começar do zero
  await prisma.user.deleteMany({});
  
  // 2. Criação de usuários com diferentes roles
  const hashedPassword = await bcrypt.hash('123', 10);

  // Usuário Comum
  const userComum = await prisma.user.create({
    data: {
      name: 'Usuario Comum',
      email: 'user@email.com',
      password: hashedPassword,
      role: Role.USER,
    },
  });

  // Usuário ONG
  const userOng = await prisma.user.create({
    data: {
      name: 'ONG Petly',
      email: 'ong@email.com',
      password: hashedPassword,
      role: Role.ONG,
    },
  });

  // Usuário Veterinário
  const userVet = await prisma.user.create({
    data: {
      name: 'Veterinário',
      email: 'vet@email.com',
      password: hashedPassword,
      role: Role.VET,
    },
  });

  // Usuário Admin
  const userAdmin = await prisma.user.create({
    data: {
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