import { IFarmsSelectDTO } from '@/domains/v1/administrative/farms/dto/get/model.dto';
import { faker } from '@faker-js/faker';
import cuid from 'cuid';
import { formatSqlToPrint } from '../index.seed';

type CreateFarmDto = {
  clientId: string;
  clientSecret: string;
  year: number;
};

const id = cuid();

const randomFarmName = () => {
  const prefixes = ['Fazenda', 'Sítio', 'Chácara', 'Estância', 'Rancho'];
  const natureNames = ['Verde', 'Rio Claro', 'Serra Azul', 'Vale Dourado', 'Águas Limpas', 'Palmeira alta'];
  const personName = faker.person.firstName();
  const options = [
    `${faker.helpers.arrayElement(prefixes)} ${personName}`,
    `${faker.helpers.arrayElement(prefixes)} ${faker.helpers.arrayElement(natureNames)}`,
  ];
  return faker.helpers.arrayElement(options);
};

async function dumpFarm(createFarmDto: CreateFarmDto) {
  const { clientId, clientSecret, year } = createFarmDto;
  const name = randomFarmName();
  const dateAt = new Date(`${year}-01-01T00:00:00`).toISOString();
  const sql = `
        -- ==============================
        -- CREATE FARMS
        -- ==============================
        INSERT INTO farms 
        ("id", "name", "clientId", "clientSecret", "createdAt", "updatedAt")
        VALUES
        ('${id}', '${name}', '${clientId}', '${clientSecret}', '${dateAt}', '${dateAt}');
    `;
  return {
    json: { id, name, clientId, clientSecret, createdAt: dateAt, updatedAt: dateAt } as unknown as IFarmsSelectDTO,
    sql: formatSqlToPrint(sql),
  };
}

async function dropFarm() {
  const sql = `
        -- ==============================
        -- DELETE FARMS
        -- ==============================
        delete from farms
        where id = '${id}'
      `;
  return formatSqlToPrint(sql);
}

export default { dumpFarm, dropFarm };
