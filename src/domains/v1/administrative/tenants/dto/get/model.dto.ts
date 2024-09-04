import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IPersonsGetDataDto } from '@/domains/v1/identity/persons/dto/get/model.dto';
import { IFarmsGetAllDto } from '../../../farms/dto/get/model.dto';

class ITenantsMembersGetAllDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  id: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  keycloakId: string;
}

export class ITenantsGetAllDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  clientSecret: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  clientId: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  id: string;

  @ApiProperty({ type: IFarmsGetAllDto })
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  farm: IFarmsGetAllDto;

  @ApiProperty({ type: ITenantsMembersGetAllDto, isArray: true })
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  members: Array<ITenantsMembersGetAllDto>;
}

export class ITenantsGetDataDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  clientSecret: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  clientId: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  id: string;

  @ApiProperty({ type: IFarmsGetAllDto })
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  farm: IFarmsGetAllDto;

  @ApiProperty({ type: IPersonsGetDataDto, isArray: true })
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  members: Array<IPersonsGetDataDto>;
}

export class ITenantsGetByIdDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  id: string;
}
