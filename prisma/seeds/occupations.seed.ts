import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedOccupations() {
  console.info('Criando ocupações...');
  await prisma.occupations.createMany({
    data: [
      { name: 'Contador/Escritório' },
      { name: 'Proprietário da Fazenda' },
      { name: 'Capataz' },
      { name: 'Peão' },
    ],
    skipDuplicates: true,
  });
  console.info('Pronto!');
}
