import { IMeasurementUnitsDataDTO } from '@/domains/v1/parameters/measurement-units/dto/get/model';
import { handlerNullableStrings } from '@/utils/strings/handler-nullable.strings';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Products } from 'prisma/prisma-client';

export class IProductsSelectDTO implements Products {
  createdAt: Date;
  description: string;
  farmId: string;
  id: string;
  measurementUnit: IMeasurementUnitsDataDTO;
  measurementUnitId: string;
  name: string;
  updatedAt: Date;
}

export class IProductsDataDTO {
  @ApiProperty()
  description: string;

  @ApiProperty()
  id: string;

  @ApiProperty({ type: PartialType<IMeasurementUnitsDataDTO> })
  measurementUnit: Partial<IMeasurementUnitsDataDTO>;

  @ApiProperty()
  name: string;

  public static transform(product: IProductsSelectDTO): IProductsDataDTO {
    return {
      measurementUnit: {
        conversionRate: product.measurementUnit.conversionRate,
        baseUnit: product.measurementUnit.baseUnit,
        name: product.measurementUnit.name,
        code: product.measurementUnit.code,
      },
      description: handlerNullableStrings(product.description),
      name: product.name,
      id: product.id,
    };
  }
}
