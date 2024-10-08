import { ITenantsGetAllDto } from '@/domains/v1/administrative/tenants/dto/get/model.dto';
import { IPersonsGetDataDto } from '@/domains/v1/identity/persons/dto/get/model.dto';
import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class IAuthConfigsUserGetAllDto extends IPersonsGetDataDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  keycloakId: string;
}

class ITenantsMembersGetAllDto {
  id: string;
  keycloakId: string;
  username: string;
}

class ITenantsFarmGetAllDto {
  id: string;
  name: string;
  cnpj: string;
}

export class IAuthConfigsTenantsGetAllDto extends ITenantsGetAllDto {
  clientSecret: string;
  clientId: string;
  id: string;
  farm: ITenantsFarmGetAllDto;
  members: Array<ITenantsMembersGetAllDto>;
}

export class IAuthConfigsUserGetDataDto {
  @ApiProperty()
  info?: IAuthConfigsUserGetAllDto;

  @ApiProperty()
  tenant?: IAuthConfigsTenantsGetAllDto;

  @ApiProperty()
  roles?: IRolesGetDataDto[];
}

export class IGroupsGetDataDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  id: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  path: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  subGroupCount: number;
}

class IGroupsGetAllAccessDto {
  @ApiProperty()
  view: boolean;

  @ApiProperty()
  viewMembers: boolean;

  @ApiProperty()
  manageMembers: boolean;

  @ApiProperty()
  manage: boolean;

  @ApiProperty()
  manageMembership: boolean;
}

export class IGroupsGetAllDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  subGroupCount: number;

  @ApiProperty()
  subGroups: Array<any>;

  @ApiProperty({ type: IGroupsGetAllAccessDto })
  access: IGroupsGetAllAccessDto;

  static toIGroupsGetDataDto(data: IGroupsGetAllDto): IGroupsGetDataDto {
    return {
      subGroupCount: data.subGroupCount,
      name: data.name,
      path: data.path,
      id: data.id,
    } as IGroupsGetDataDto;
  }
}

export class IRolesGetDataDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  id: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  containerId: string;
}

export class IRolesGetAllDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  composite: boolean;

  @ApiProperty()
  clientRole: boolean;

  @ApiProperty()
  containerId: string;

  public static toIRolesDataGetDto(data: IRolesGetAllDto): IRolesGetDataDto {
    return {
      description: data.description,
      containerId: data.containerId,
      name: data.name,
      id: data.id,
    } as IRolesGetDataDto;
  }
}

export class IGroupsRolesGetAllDto {
  @ApiProperty({ type: IRolesGetAllDto, isArray: true })
  realmMappings: Array<IRolesGetAllDto>;
}
