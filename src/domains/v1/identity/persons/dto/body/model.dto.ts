import { IOccupationsGetDataDto } from '@/domains/v1/administration/occupations/dto/get/model.dto';
import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class IPersonsCreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  keycloakId: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  username: string;

  @ApiProperty({ type: IOccupationsGetDataDto })
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  occupation: IOccupationsGetDataDto;
}
