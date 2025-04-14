import { IMeasurementUnitsSelectDTO } from '@/domains/v1/parameters/measurement-units/dto/get/model';
import { formatSqlToPrint } from '../index.seed';
import data from './data.json';

async function dumpMeasurementUnits(year: number) {
  const dateAt = new Date(`${year}-01-01T00:00:00`).toISOString();
  const sql = `
        -- ==============================
        -- CREATE MEASUREMENT UNITS
        -- ==============================
        INSERT INTO measurement_units
        ("id", "name", "code", "farmId", "baseUnit", "conversionRate", "createdAt", "updatedAt")
        VALUES
        ${data
          .map(
            ({ id, name, code, baseUnit, conversionRate }) =>
              `('${id}','${name}','${code}', NULL, '${baseUnit}', ${conversionRate},'${dateAt}','${dateAt}')`,
          )
          .join(',\n')}
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

async function dropMeasurementUnits() {
  const sql = `
        -- ==============================
        -- DELETE MEASUREMENT UNITS
        -- ==============================
        delete from measurement_units
        where id in(
            ${data.map(unit => `'${unit.id}'`).join(',\n')}
        );
      `;
  return formatSqlToPrint(sql);
}

export default { dumpMeasurementUnits, dropMeasurementUnits };
