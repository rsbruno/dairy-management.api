import { ApiProperty } from '@nestjs/swagger';

class IProductsFarmGetAllDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cnpj: string;

  createdAt?: Date;
  updatedAt?: Date;
}

class IProductsCostCenterGetAllDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  farmId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class IProductsGetDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  unitPrice: number;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: IProductsFarmGetAllDto })
  farm: IProductsFarmGetAllDto;

  @ApiProperty({ type: IProductsCostCenterGetAllDto })
  costCenter: IProductsCostCenterGetAllDto;
}

export class IProductsGetAllDto {
  id: string;
  unitPrice: number;
  quantity: number;
  name: string;
  description: string;
  farm: IProductsFarmGetAllDto;
  costCenter: IProductsCostCenterGetAllDto;

  public static toIProductsGetDataDto(data: IProductsGetAllDto): IProductsGetDataDto {
    return {
      totalPrice: Number((data.quantity * data.unitPrice).toFixed(2)),
      description: data.description ?? '',
      unitPrice: data.unitPrice,
      quantity: data.quantity,
      name: data.name,
      id: data.id,
      farm: {
        id: data.farm.id,
        name: data.farm.name,
        cnpj: data.farm.cnpj,
      },
      costCenter: {
        id: data.costCenter.id,
        name: data.costCenter.name,
        description: data.costCenter.description,
      },
    };
  }
}
