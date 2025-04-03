import { ITenantsSelectDTO } from '@/domains/v1/administrative/tenants/dto/get/model.dto';
import { IFarmsDataDTO } from '@/domains/v1/administrative/farms/dto/get/model.dto';
import { Persons } from 'prisma/prisma-client';
import { ApiProperty } from '@nestjs/swagger';

export class IPersonsSelectDTO implements Persons {
  createdAt: Date;
  enabled: boolean;
  fullName: string;
  id: string;
  keycloakId: string;
  tenants: Array<ITenantsSelectDTO>;
  updatedAt: Date;
  username: string;
}

export class IPersonsDataDTO {
  @ApiProperty()
  enabled: boolean;

  @ApiProperty({ type: IFarmsDataDTO, isArray: true })
  farms: Array<IFarmsDataDTO>;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  public static transform(person: IPersonsSelectDTO | null): IPersonsDataDTO {
    if (!person) return null;
    return {
      farms: person.tenants.map(tenant => IFarmsDataDTO.transform(tenant.farm)),
      username: person.username,
      fullName: person.fullName,
      enabled: person.enabled,
      id: person.id,
    };
  }
}
