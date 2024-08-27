import { ApiProperty } from '@nestjs/swagger';

export class IAuthAccessGetDto {
  @ApiProperty({ example: 'Token de acesso' })
  access_token: string;
  @ApiProperty({ example: 'Token de atualização' })
  refresh_token: string;
}

export class IAuthRefreshGetDto {
  @ApiProperty({ example: 'Token de acesso' })
  access_token: string;
}
