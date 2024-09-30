import { IPersonsGetDataDto } from '@/domains/v1/identity/persons/dto/get/model.dto';
import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { IsCNPJ } from '@/decorators/validators/is-cnpj.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class IFarmsGetDataDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  id: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  clientId: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  clientSecret: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  @IsCNPJ({ message: commonExceptions.param.isNotCNPJ })
  cnpj: string;

  @ApiProperty({ type: IPersonsGetDataDto, isArray: true })
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  members: Array<IPersonsGetDataDto>;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  membersCount: number;
}

export class IFarmsGetAllDto {
  id: string;
  name: string;
  cnpj: string;
  Tenants: {
    clientSecret: string;
    clientId: string;
    members?: Array<{
      id: string;
    }>;
    _count?: {
      members?: number;
    };
  };

  public static toIFarmsGetDataDto(data: IFarmsGetAllDto) {
    return {
      clientId: data.Tenants.clientId,
      clientSecret: data.Tenants.clientSecret,
      cnpj: data.cnpj,
      name: data.name,
      id: data.id,
      members: data?.Tenants?.members?.map((member) => ({ id: member.id })) ?? [],
      membersCount: data.Tenants?._count?.members,
    };
  }
}
