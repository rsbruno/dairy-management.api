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
              id: 'cm8q9nog10001e5ypjl4ze26r',
            },
          },
        }) as any,
    ),
    skipDuplicates: true,
  });
}
transactions_types();
