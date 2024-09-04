import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class IPersonsCreateFarmDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  id: string;
}

export class IPersonsCreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  firstname: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  lastname: string;

  @ApiProperty({ type: IPersonsCreateFarmDto, isArray: true })
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  farm: Array<IPersonsCreateFarmDto>;
}
