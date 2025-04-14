import { ICostCenterSelectDTO } from '@/domains/v1/parameters/cost-center/dto/get/model';
import { formatSqlToPrint } from '../index.seed';
import { faker } from '@faker-js/faker';
import cuid from 'cuid';
import { IFarmsSelectDTO } from '@/domains/v1/administrative/farms/dto/get/model.dto';
import { IPersonsSelectDTO } from '@/domains/v1/identity/persons/dto/get/model.dto';
import costCenters from '../cost_center/data.json';

type DumpTransactionsDTO = {
  farm: IFarmsSelectDTO;
  persons: Array<IPersonsSelectDTO>;
  consCenters: Array<ICostCenterSelectDTO>;
  products: any;
  year: number;
  month?: number;
};

const ids = [];

function mountBatchTransactions({ year, persons, farm, products, month, consCenters }: DumpTransactionsDTO) {
  const transactionCount = faker.number.int({ min: 35, max: 50 });

  const values = Array.from({ length: transactionCount }, () => {
    const quantity = faker.number.int({ min: 1, max: 300 });
    const unitPrice = faker.number.float({ min: 10, max: 300 });
    const product = faker.helpers.arrayElement(products) as any;
    const costCenter = consCenters.flat().find(f => f.id === product.costCenterId);
    const typeId =
      !costCenter || costCenter.code.includes('B') ? 'cm9cz44o600013j6mv2f6fync' : 'cm9cz3zuh00003j6mdia3x8tq';
    const responsibleId = faker.helpers.arrayElement(persons.map(p => p.id));
    const date = faker.date
      .between({
        from: new Date(year, (month ?? 1) - 1, 1),
        to: new Date(year, month ?? 1, 0),
      })
      .toISOString();
    const id = cuid();
    ids.push(id);
    const values = `('${id}', '${faker.lorem.words({ min: 10, max: 20 })}', ${quantity}, ${unitPrice}, '${product.id}', '${responsibleId}', '${farm.id}', '${typeId}', '${product.costCenterId}', '${date}')`;
    return formatSqlToPrint(values);
  });

  return `
    -- ==============================
    -- CREATE TRANSACTIONS ${month}/${year}
    -- ==============================
    INSERT INTO transactions
    (id, description, quantity, "unitPrice", "productId", "responsibleId", "farmId", "typeId", "costCenterId", "createdAt")
    VALUES
    ${values.join(',\n')};
  `;
}

async function dumpTransactions({ year, persons, farm, products, consCenters }: DumpTransactionsDTO) {
  const transactions = [];
  for (let month = 1; month <= 12; month++) {
    transactions.push(mountBatchTransactions({ year, persons, farm, products, month, consCenters }));
  }

  const sql = `
    -- ==============================
    -- CREATE TRANSACTIONS
    -- ==============================
    ${transactions.map(transaction => formatSqlToPrint(transaction)).join('\n')}
  `;

  return {
    sql: formatSqlToPrint(sql),
  };
}

async function dropTransactions() {
  const sql = `
    -- ==============================
    -- DELETE TRANSACTIONS
    -- ==============================
    delete from transactions
    where id in(
      ${ids.map(id => `'${id}'`).join(',\n')}
    );
  `;
  return formatSqlToPrint(sql);
}

export default { dumpTransactions, dropTransactions };
