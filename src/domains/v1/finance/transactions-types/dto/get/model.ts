import { ApiProperty } from '@nestjs/swagger';

class ITransactionsTypesFarmGetDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cnpj: string;
}

export class ITransactionsTypesGetDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;

  @ApiProperty({ type: ITransactionsTypesFarmGetDto })
  farm: ITransactionsTypesFarmGetDto;
}

export class ITransactionsTypesGetAllDto {
  name: string;
  code: string;
  id: string;
  farm: ITransactionsTypesFarmGetDto;

  public static toITransactionsTypesGetDataDto(
    data: ITransactionsTypesGetAllDto,
  ): ITransactionsTypesGetDataDto {
    return {
      name: data.name,
      code: data.code,
      id: data.id,
      farm: {
        id: data.farm.id,
        name: data.farm.name,
        cnpj: data.farm.cnpj,
      },
    };
  }
}
