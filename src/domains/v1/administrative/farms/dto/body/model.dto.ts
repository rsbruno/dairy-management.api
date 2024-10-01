import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { IsCNPJ } from '@/decorators/validators/is-cnpj.decorator';
import { ArrayMinSize, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class IFarmsMembersCreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  personId: string;
}

export class IFarmsCreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  @IsCNPJ({ message: commonExceptions.param.isNotCNPJ })
  cnpj: string;

  @ApiProperty({ type: IFarmsMembersCreateDto, isArray: true })
  @IsOptional()
  members: Array<IFarmsMembersCreateDto>;
}
