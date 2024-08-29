import { IPersonsCreateDto } from '@/domains/v1/identity/persons/dto/body/model.dto';
import { IPersonsGetAllDto, IPersonsGetDataDto } from '@/domains/v1/identity/persons/dto/get/model.dto';
import { IUsersGetDataDto } from '@/domains/v1/identity/users/dto/get/model.dto';
import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class ITenantsCreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  clientId: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  clientSecret: string;

  @ApiProperty({ type: IPersonsGetAllDto, isArray: true })
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  members: Array<IPersonsGetAllDto>;
}
