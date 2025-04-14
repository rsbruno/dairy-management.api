import { IMeasurementUnitsSelectDTO } from '@/domains/v1/parameters/measurement-units/dto/get/model';
import { formatSqlToPrint } from '../index.seed';
import data from './data.json';

async function dumpTransactionTypes(year: number) {
  const dateAt = new Date(`${year}-01-01T00:00:00`).toISOString();
  const sql = `
      -- ==============================
      -- CREATE TRANSACTION TYPES
      -- ==============================
      INSERT INTO transactions_types 
      (id, "name", code, "farmId","createdAt", "updatedAt") 
      VALUES
      ${data.map(({ id, name, code }) => `('${id}','${name}','${code}', NULL,'${dateAt}','${dateAt}')`).join(',\n')}
      ON CONFLICT ("id") DO NOTHING;`;
  return {
    sql: formatSqlToPrint(sql),
    json: data.map(unit => ({
      ...unit,
      createdAt: dateAt,
      updatedAt: dateAt,
    })) as unknown as Array<IMeasurementUnitsSelectDTO>,
  };
}

async function dropTransactionTypes() {
  const sql = `
        -- ==============================
        -- DELETE TRANSACTION TYPES
        -- ==============================
        delete from transactions_types
        where id in(
            ${data.map(unit => `'${unit.id}'`).join(',\n')}
        );
      `;
  return formatSqlToPrint(sql);
}

export default { dumpTransactionTypes, dropTransactionTypes };
