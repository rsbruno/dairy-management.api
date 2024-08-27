import { ApiProperty } from '@nestjs/swagger';

class IUsersGetAllAccessDto {
  @ApiProperty()
  manageGroupMembership: boolean;

  @ApiProperty()
  impersonate: boolean;

  @ApiProperty()
  mapRoles: boolean;

  @ApiProperty()
  manage: boolean;

  @ApiProperty()
  view: boolean;
}

export class IUsersGetAllDto {
  @ApiProperty()
  disableableCredentialTypes: Array<string>;

  @ApiProperty({ type: [String] })
  requiredActions: Array<string>;

  @ApiProperty()
  createdTimestamp: number;

  @ApiProperty()
  emailVerified: boolean;

  @ApiProperty()
  notBefore: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty()
  access: IUsersGetAllAccessDto;

  @ApiProperty()
  totp: boolean;

  @ApiProperty()
  email: string;

  @ApiProperty()
  id: string;

  static toIUsersGetDataDto(data: IUsersGetAllDto): IUsersGetDataDto {
    return {
      createdTimestamp: data.createdTimestamp,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      enabled: data.enabled,
      email: data.email,
      id: data.id,
    };
  }
}

export class IUsersGetDataDto {
  @ApiProperty()
  createdTimestamp: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty()
  email: string;

  @ApiProperty()
  id: string;
}
