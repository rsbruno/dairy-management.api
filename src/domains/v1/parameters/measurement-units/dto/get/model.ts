import { MeasurementUnits } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class IMeasurementUnitsSelectDTO implements MeasurementUnits {
  baseUnit: string;
  code: string;
  conversionRate: number;
  createdAt: Date;
  farmId: string;
  id: string;
  name: string;
  updatedAt: Date;
}

export class IMeasurementUnitsDataDTO {
  @ApiProperty()
  baseUnit: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  conversionRate: number;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  public static transform(measurementUnit: IMeasurementUnitsSelectDTO): IMeasurementUnitsDataDTO {
    return {
      conversionRate: measurementUnit.conversionRate,
      baseUnit: measurementUnit.baseUnit,
      name: measurementUnit.name,
      code: measurementUnit.code,
      id: measurementUnit.id,
    };
  }
}
