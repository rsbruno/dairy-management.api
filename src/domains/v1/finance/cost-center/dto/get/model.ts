import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

class ICostCenterFarmGetDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cnpj: string;
}

export class ICostCenterGetDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: ICostCenterFarmGetDto })
  farm: ICostCenterFarmGetDto;
}

export class ICostCenterGetAllDto {
  id: string;
  name: string;
  description?: string;
  farm: ICostCenterFarmGetDto;

  public static toICostCenterGetDataDto(data: ICostCenterGetAllDto): ICostCenterGetDataDto {
    return {
      description: data.description ?? '',
      name: data.name,
      id: data.id,
      farm: {
        id: data.farm.id,
        name: data.farm.name,
        cnpj: data.farm.cnpj,
      },
    };
  }
}
