import measurementUnits from './measurement-units.json';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function transactions_types() {
  console.info('Criando as unidades de medida...');
  await prisma.measurementUnits.createMany({
    data: measurementUnits.map((unit) => ({
      name: unit.name,
      code: unit.code,
      baseUnit: unit.baseUnit,
      conversionRate: unit.conversionRate,
    })),
    skipDuplicates: true,
  });
  console.info('Pronto!');
}
transactions_types();
