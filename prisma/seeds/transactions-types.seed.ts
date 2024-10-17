import { transactionsTypesEnum } from '../../src/enums/transactions-types.enum';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function transactions_types() {
  console.info('Criando os tipos de transações...');
  await prisma.transactionsTypes.createMany({
    data: Object.values(transactionsTypesEnum).map(
      (transactionsType) =>
        ({
          ...transactionsType,
          farm: {
            connect: {
              id: 'cm2c8elk1000111n2hy4hpkde',
            },
          },
        }) as any,
    ),
    skipDuplicates: true,
  });
}
transactions_types();
