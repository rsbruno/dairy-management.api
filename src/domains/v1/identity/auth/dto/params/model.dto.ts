import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
