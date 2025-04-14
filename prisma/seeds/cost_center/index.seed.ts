import { ICostCenterSelectDTO } from '@/domains/v1/parameters/cost-center/dto/get/model';
import { formatSqlToPrint } from '../index.seed';
import data from './data.json';

const json = [];

const mountCostCenterSql = (ct: (typeof data)[0], date: string, parent?: (typeof data)[0] | null): string => {
  if (!ct?.children) {
    json.push(ct);
    return `('${ct.id}','${ct.name}','${ct.code}',NULL,${parent?.id ? `'${parent.id}'` : 'NULL'},'${date}','${date}')`;
  }
  const children = ct?.children?.map?.(child => mountCostCenterSql(child, date, ct));
  return [`('${ct.id}','${ct.name}','${ct.code}',NULL,NULL,'${date}','${date}')`, ...children].flat().join(',\n');
};

async function dumpCostCenter(year: number) {
  const dateAt = new Date(`${year}-01-01T00:00:00`).toISOString();
  const constCenters = data?.map?.(costCenter => {
    const sql = `
      -- ==============================
      -- CREATE COST CENTERS
      -- ==============================
      INSERT INTO cost_center
      ("id", "name", "code", "farmId", "parentId", "createdAt", "updatedAt")
      VALUES
      ${mountCostCenterSql(costCenter, dateAt)}
      ON CONFLICT ("id") DO NOTHING;
    `;
    return formatSqlToPrint(sql);
  });
  return {
    sql: constCenters.join('\n'),
    json: json as unknown as Array<ICostCenterSelectDTO>,
  };
}

async function dropCostCenter() {
  const sql = `
      -- ==============================
      -- DELETE COST CENTERS
      -- ==============================
      delete from cost_center
      where 'B' in (
       ${json.map(costCenter => `'${costCenter.id}'`).join(',\n')}
      );
      `;
  return formatSqlToPrint(sql);
}

export default { dumpCostCenter, dropCostCenter };
