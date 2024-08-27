import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IAuthLogoutParamDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  refresh_token: string;
}

export class IAuthRefreshTokenParamDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  refresh_token: string;
}
