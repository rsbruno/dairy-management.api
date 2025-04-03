import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IProductsCreateDTO {
  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  measurementUnitId: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  name: string;
}
