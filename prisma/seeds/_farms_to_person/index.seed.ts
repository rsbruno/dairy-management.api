import { IFarmsSelectDTO } from '@/domains/v1/administrative/farms/dto/get/model.dto';
import { IPersonsSelectDTO } from '@/domains/v1/identity/persons/dto/get/model.dto';
import { formatSqlToPrint } from '../index.seed';

type DumpPersonDTO = {
  farm: IFarmsSelectDTO;
  persons: Array<IPersonsSelectDTO>;
};

let farmId: string = '';

let personsJson: IPersonsSelectDTO[] = [];

async function dumpFarmsToPerson(dumpPersonDTO: DumpPersonDTO) {
  const { persons, farm } = dumpPersonDTO;
  personsJson = persons;
  farmId = farm.id;
  const values = persons.map(person => `('${farm.id}', '${person.id}')`);
  const sql = `
        -- ======================================
        -- LINKING PEOPLE TO FARMS
        -- ======================================
        INSERT INTO "_farms_to_person"
        ("A", "B")
        VALUES
        ${values.join(',\n')};
    `;
  return {
    sql: formatSqlToPrint(sql),
  };
}

async function dropFarmsToPerson() {
  const sql = `
        -- ======================================
        -- DELETE LINK PEOPLE TO FARMS
        -- ======================================
        delete from _farms_to_person
        where 'B' in (
            ${personsJson.map(person => `'${person.id}'`).join(',\n')}
        );
      `;
  return formatSqlToPrint(sql);
}

export default { dumpFarmsToPerson, dropFarmsToPerson };
