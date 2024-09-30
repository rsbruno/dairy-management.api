import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { IsCNPJ } from '@/decorators/validators/is-CNPJ.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsNotEmpty } from 'class-validator';

class IFarmsMembersCreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  personId: string;
}

export class IFarmsCreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  clientId: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  clientSecret: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  @IsCNPJ({ message: commonExceptions.param.isNotCNPJ })
  cnpj: string;

  @ApiProperty({ type: IFarmsMembersCreateDto, isArray: true })
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  @ArrayMinSize(1, { message: commonExceptions.validator.isArray.min.one })
  members: Array<IFarmsMembersCreateDto>;
}
