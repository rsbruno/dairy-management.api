import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ICostCenterFindAll extends IOffsetPagination {
  @ApiProperty({ required: false })
  @IsOptional()
  onlyRoot?: boolean;
}
export class ICostCenterFindByIdDTO {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  id: string;
}
