import { ApiProperty } from '@nestjs/swagger';

export class IAuthAccessGetDto {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  refresh_token: string;
}

export class IAuthRefreshGetDto {
  @ApiProperty()
  access_token: string;
}
