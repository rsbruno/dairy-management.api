import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ICostCenterCreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  description: string;
}
