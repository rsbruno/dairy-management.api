import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IFarmsSwitchBodyDTO {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  @IsString()
  refreshToken: string;
}
