import { IOccupationsGetDataDto } from '@/domains/v1/administration/occupations/dto/get/model.dto';
import { IUsersGetDataDto } from '@/domains/v1/identity/users/dto/get/model.dto';
import { ApiProperty } from '@nestjs/swagger';

export class IPersonsGetDataDto extends IUsersGetDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: IOccupationsGetDataDto })
  occupation: IOccupationsGetDataDto;
}

export class IPersonsGetAllDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  keycloakId: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ type: IOccupationsGetDataDto })
  occupationId: IOccupationsGetDataDto;
}
