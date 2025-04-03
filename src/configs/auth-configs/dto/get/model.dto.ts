import { ITenantsDataDTO } from '@/domains/v1/administrative/tenants/dto/get/model.dto';
import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class IAuthConfigsUserGetAllDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  keycloakId: string;
}

export class IAuthConfigsUserGetDataDto {
  @ApiProperty()
  info?: IAuthConfigsUserGetAllDto;

  @ApiProperty()
  roles?: IRolesGetDataDto[];

  @ApiProperty()
  tenant?: ITenantsDataDTO;
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
  manage: boolean;

  @ApiProperty()
  manageMembers: boolean;

  @ApiProperty()
  manageMembership: boolean;

  @ApiProperty()
  view: boolean;

  @ApiProperty()
  viewMembers: boolean;
}

export class IGroupsGetAllDto {
  @ApiProperty({ type: IGroupsGetAllAccessDto })
  access: IGroupsGetAllAccessDto;

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
  containerId: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  id: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  name: string;
}

export class IRolesGetAllDto {
  @ApiProperty()
  clientRole: boolean;

  @ApiProperty()
  composite: boolean;

  @ApiProperty()
  containerId: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

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
