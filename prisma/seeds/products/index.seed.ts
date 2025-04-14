import cuid from 'cuid';
import { formatSqlToPrint } from '../index.seed';
import data from './data.json';
import { IFarmsSelectDTO } from '@/domains/v1/administrative/farms/dto/get/model.dto';
import { IProductsSelectDTO } from '@/domains/v1/stock/products/dto/get/model';

type DumpProductsDTO = {
  farm: IFarmsSelectDTO;
  year: number;
};

let farmId: IFarmsSelectDTO = null;
const productsJson = [];

async function dumpProducts({ farm, year }: DumpProductsDTO) {
  const dateAt = new Date(`${year}-01-01T00:00:00`).toISOString();
  farmId = farm;
  const products = data?.map?.(({ name, description, measurementUnitId, costCenterId }) => {
    const id = cuid();
    productsJson.push({
      id,
      name,
      description,
      farmId: farm.id,
      measurementUnitId,
      costCenterId,
      createdAt: dateAt,
      updatedAt: dateAt,
    });
    return `('${id}', '${name}', '${description}', '${farm.id}', '${measurementUnitId}', '${dateAt}', '${dateAt}')`;
  });
  const sql = `
      -- ==============================
      -- CREATE PRODUCTS
      -- ==============================
      INSERT INTO products
      ("id", "name", "description", "farmId", "measurementUnitId", "createdAt", "updatedAt")
      VALUES
      ${products.join(',\n')};
    `;
  return {
    sql: formatSqlToPrint(sql),
    json: productsJson as unknown as Array<IProductsSelectDTO>,
  };
}

async function dropProducts() {
  const sql = `
        -- ==============================
        -- DELETE PRODUCTS
        -- ==============================
        delete from products
        where id in (
          ${productsJson.map(e => `'${e.id}'`).join(',\n')}
        )
      `;
  return formatSqlToPrint(sql);
}

export default { dumpProducts, dropProducts };
