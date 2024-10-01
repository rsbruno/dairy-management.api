import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class IPersonsCreateFarmDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  id: string;
}

export class IPersonsCreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  firstname: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  lastname: string;

  @ApiProperty({ type: IPersonsCreateFarmDto, isArray: true })
  @IsOptional()
  farms: Array<IPersonsCreateFarmDto>;
}
