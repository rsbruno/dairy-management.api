import { ApiProperty } from '@nestjs/swagger';

export class IAuthAccessGetDTO {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  refresh_token: string;
}

export class IAuthRefreshGetDTO {
  @ApiProperty()
  access_token: string;
}
