import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ITenantsCreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  clientId: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  clientSecret: string;

  /* @ApiProperty({ type: IFarmsCreateDto })
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  farm: IFarmsCreateDto;

  @ApiProperty({ type: IPersonsGetDataDto, isArray: true })
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  members: Array<IPersonsGetDataDto>; */
}
