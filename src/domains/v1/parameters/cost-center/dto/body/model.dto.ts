import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ICostCenterCreateDTO {
  @ApiProperty()
  @IsOptional()
  code: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  name: string;

  @ApiProperty()
  @IsOptional()
  parentId: string;
}
