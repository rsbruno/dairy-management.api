import { IFarmsSelectDTO } from '@/domains/v1/administrative/farms/dto/get/model.dto';
import { IPersonsSelectDTO } from '@/domains/v1/identity/persons/dto/get/model.dto';
import { faker, simpleFaker } from '@faker-js/faker';
import cuid from 'cuid';
import { formatSqlToPrint } from '../index.seed';

type DumpPersonDTO = {
  year: number;
  count: number;
  farm: IFarmsSelectDTO;
};

const values: Array<string> = [];
const json: Array<IPersonsSelectDTO> = [];

async function dumpPerson(dumpPersonDTO: DumpPersonDTO) {
  const { year, count, farm } = dumpPersonDTO;
  const dateAt = new Date(`${year}-01-01T00:00:00`).toISOString();
  for (let index = 0; index <= count; index++) {
    const id = cuid();
    const keycloakId = simpleFaker.string.uuid();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.internet.email({ firstName, lastName }).toLocaleLowerCase();
    const fullName = `${firstName} ${lastName}`;
    values.push(`('${id}','${keycloakId}','${username}','${fullName}',true,'${dateAt}','${dateAt}','${farm.id}')`);
    json.push({
      id,
      keycloakId,
      username,
      fullName,
      enabled: true,
      createdAt: new Date(dateAt),
      updatedAt: new Date(dateAt),
      activeFarmId: farm.id,
    } as IPersonsSelectDTO);
  }

  const sql = `
        -- ==============================
        -- CREATE PEOPLE
        -- ==============================
        INSERT INTO persons
        ("id", "keycloakId", "username", "fullName", "enabled", "createdAt", "updatedAt", "activeFarmId")
        VALUES
        ${values.join(',\n')};
    `;
  return {
    sql: formatSqlToPrint(sql),
    json,
  };
}

async function dropPerson() {
  const sql = `
        -- ==============================
        -- DELETE PEOPLE
        -- ==============================
        delete from persons
        where id in (
            ${json.map(person => `'${person.id}'`).join(',\n')}
        );
      `;
  return formatSqlToPrint(sql);
}

export default { dumpPerson, dropPerson };
