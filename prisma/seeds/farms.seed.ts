import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function farmsSeed() {
  console.info('Criando Fazenda, Tenant e Usuário...');
  await prisma.tenants.create({
    data: {
      clientId: 'client-dev',
      clientSecret: '09299478000139',
      farm: {
        create: {
          cnpj: '09299478000139',
          name: 'Fazenda Palmeira alta',
        },
      },
      members: {
        create: {
          username: 'johndoe@email.com',
          keycloakId: '',
        },
      },
    },
  });
  console.info('Pronto!');
}
farmsSeed();
