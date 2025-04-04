import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ICostCenterBalanceByCostCenterId {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  costCenterId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  endDate: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  startDate: Date;
}

export class IBalanceDataByTypeDTO {
  code: Array<string>;

  @ApiProperty({ required: false })
  @IsOptional()
  endDate: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  startDate: Date;
}
