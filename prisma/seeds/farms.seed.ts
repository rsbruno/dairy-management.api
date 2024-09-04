import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedFarms() {
  console.info('Criando Fazenda, Tenant e Usuário...');
  await prisma.tenants.create({
    data: {
      clientId: 'client-dev',
      clientSecret: '09299478000139',
      farm: {
        create: {
          cnpj: '09299478000139',
          name: 'Fazenda Gestão de Leite',
        },
      },
      members: {
        create: {
          username: 'johndoe@email.com',
          keycloakId: '2c362e56-6db0-44cb-aab6-cd81b8050dd5',
        },
      },
    },
  });
  console.info('Pronto!');
}
