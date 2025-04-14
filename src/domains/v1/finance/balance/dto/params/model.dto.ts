import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { IsDate } from '@/decorators/validators/is-date.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class ICostCenterBalanceByCostCenterId {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  costCenterId: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  @IsDate({ message: commonExceptions.param.isDate })
  @Transform(({ value }) => new Date(value))
  endDate: Date;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  @IsDate({ message: commonExceptions.param.isDate })
  @Transform(({ value }) => new Date(value))
  startDate: Date;
}

export class IBalanceDataByTypeDTO {
  code: Array<string>;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  @IsDate({ message: commonExceptions.param.isDate })
  @Transform(({ value }) => new Date(value))
  endDate: Date;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  @IsDate({ message: commonExceptions.param.isDate })
  @Transform(({ value }) => new Date(value))
  startDate: Date;
}
