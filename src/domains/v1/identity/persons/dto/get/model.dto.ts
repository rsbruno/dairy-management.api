import { IFarmsDataDTO } from '@/domains/v1/administrative/farms/dto/get/model.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Persons } from '@prisma/client';

export class IPersonsSelectDTO implements Persons {
  activeFarmId: string;
  createdAt: Date;
  enabled: boolean;
  farmsId: string;
  fullName: string;
  id: string;
  keycloakId: string;
  updatedAt: Date;
  username: string;
}

export class IPersonsDataDTO {
  @ApiProperty()
  enabled: boolean;

  @ApiProperty({ type: IFarmsDataDTO, required: false, isArray: true })
  farms?: Array<IFarmsDataDTO>;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  public static transform(person: IPersonsSelectDTO | null): IPersonsDataDTO {
    if (!person) return null;
    const farms = [];
    const response: IPersonsDataDTO = {
      username: person.username,
      fullName: person.fullName,
      enabled: person.enabled,
      id: person.id,
    };
    if (farms.length > 0) response.farms = farms;
    return response;
  }
}
