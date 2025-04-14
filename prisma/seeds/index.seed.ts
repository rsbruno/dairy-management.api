import farmRepository from './farms/index.seed';
import personRepository from './person/index.seed';
import farmsToPerson from './_farms_to_person/index.seed';
import measurementUnits from './measurement_units/index.seed';
import transactionTypes from './transaction-types/index.seed';
import costCenterRepository from './cost_center/index.seed';
import productsRepository from './products/index.seed';
import transactionsRepository from './transactions/index.seed';
import fs from 'fs';

const log = (...logs: Array<string>) => console.info(`${logs}`);

export function formatSqlToPrint(template) {
  return template
    .split('\n')
    .map(line => line.trimStart())
    .join('\n');
}

async function main() {
  const year = 2024;
  const client = {
    secret: 'erp-milk-client',
    id: 'M6K3PKBNqBo728NhCgo2QIuZbYqo3sIQ1',
  };

  log('🔶 CRIANDO UNIDADES DE MEDIDA');
  const dumpMeasurementUnits = await measurementUnits.dumpMeasurementUnits(year);
  log('✅ PRONTO!\n');

  log('🔶 CRIANDO OS TIPOS DE TRANSAÇÂO');
  const dumpTransactionTypes = await transactionTypes.dumpTransactionTypes(year);
  log('✅ PRONTO!\n');

  log('🔶 CRIANDO OS CENTROS DE CUSTO');
  const dumpCostCenter = await costCenterRepository.dumpCostCenter(year);
  log('✅ PRONTO!\n');

  log('🔶 CRIANDO A FAZENDA');
  const dumpFarms = await farmRepository.dumpFarm({ clientId: client.id, clientSecret: client.secret, year });
  log('✅ PRONTO!\n');

  log('🔶 CRIANDO A PRODUTOS');
  const dumpProducts = await productsRepository.dumpProducts({ farm: dumpFarms.json, year });
  log('✅ PRONTO!\n');

  log('🔶 CRIANDO PESSOA(s)');
  const dumpPersons = await personRepository.dumpPerson({ count: 1, year, farm: dumpFarms.json });
  log('✅ PRONTO!\n');

  log('🔶 CRIANDO VINCULO DE PESSOAS E FAZENDAS');
  const dumpFarmsToPerson = await farmsToPerson.dumpFarmsToPerson({
    persons: dumpPersons.json,
    farm: dumpFarms.json,
  });
  log(`✅ PRONTO!\n`);

  log('🔶 CRIANDO AS TRANSAÇÔES');
  const dumpTransactions = await transactionsRepository.dumpTransactions({
    consCenters: dumpCostCenter.json,
    products: dumpProducts.json,
    persons: dumpPersons.json,
    farm: dumpFarms.json,
    year,
  });
  log('✅ PRONTO!\n');

  const dumpSqlString = `
    ${dumpMeasurementUnits.sql}
    ${dumpTransactionTypes.sql}
    ${dumpCostCenter.sql}
    ${dumpFarms.sql}
    ${dumpProducts.sql}
    ${dumpPersons.sql}
    ${dumpFarmsToPerson.sql}
    ${dumpTransactions.sql}
  `;

  const dropSqlString = `
    ${await transactionsRepository.dropTransactions()}
    ${await productsRepository.dropProducts()}
    ${await farmsToPerson.dropFarmsToPerson()}
    ${await personRepository.dropPerson()}
    ${await farmRepository.dropFarm()}
  `;

  fs.writeFile('./prisma/sql/dump/dump.sql', formatSqlToPrint(dumpSqlString), err => {
    if (!err) log('✅ PRONTO DUMP GERADO!\n');
  });

  fs.writeFile('./prisma/sql/drop/drop.sql', formatSqlToPrint(dropSqlString), err => {
    if (!err) log('✅ PRONTO DROP GERADO!\n');
  });
}
main();
