import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class IKeycloakPaginationGetDto {
  @ApiProperty({ default: 0 })
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  first: number;

  @ApiProperty({ default: 10 })
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  max: number;
}
