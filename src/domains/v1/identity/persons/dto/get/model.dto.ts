import { IKeycloakPaginationGetDto } from '@/models/pagination/keycloak/model';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class IPersonskeycloakFindAllDto extends IKeycloakPaginationGetDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  search: string;
}

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

  static toIPersonsGetDataDto(data: IUsersGetAllDto): IPersonsGetDataDto {
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

export class IPersonsGetDataDto {
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

export class IPersonsGetAllDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  keycloakId: string;

  @ApiProperty()
  username: string;
}
