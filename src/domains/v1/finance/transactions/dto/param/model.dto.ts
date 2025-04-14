import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { IsDate } from '@/decorators/validators/is-date.decorator';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class ITransactionsFindAllDTO extends IOffsetPagination {
  @ApiProperty({ required: false })
  @IsOptional()
  costCenterId: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  @IsDate({ message: commonExceptions.param.isDate })
  @Transform(({ value }) => new Date(value))
  endDate: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  productId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  responsibleId: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  @IsDate({ message: commonExceptions.param.isDate })
  @Transform(({ value }) => new Date(value))
  startDate: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  typeId: string;
}

export class ITransactionsFindByIdDTO {
  @ApiProperty()
  @IsOptional()
  id: string;
}
