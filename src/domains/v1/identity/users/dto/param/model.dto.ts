import { IKeycloakPaginationGetDto } from '@/models/pagination/keycloak/model';
import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IUsersFindByIdDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  id: string;
}

export class IUsersAssignByGroupIdDto extends IUsersFindByIdDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  groupId: string;
}

export class IUsersFindAllDto extends IKeycloakPaginationGetDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  search: string;
}
