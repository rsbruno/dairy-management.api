import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ITransactionsFindAllDTO extends IOffsetPagination {
  @ApiProperty({ required: false })
  @IsOptional()
  costCenterId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  productId: string;
}

export class ITransactionsFindByIdDTO {
  @ApiProperty()
  @IsOptional()
  id: string;
}
