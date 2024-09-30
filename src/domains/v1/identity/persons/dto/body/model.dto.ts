import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { ArrayMinSize, IsNotEmpty } from 'class-validator';
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
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  @ArrayMinSize(1, { message: commonExceptions.validator.isArray.min.one })
  farms: Array<IPersonsCreateFarmDto>;
}
