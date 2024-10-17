import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ITransactionsCreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  quantity: number;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  @IsOptional()
  unityPrice: number;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  productId: string;

  @ApiProperty()
  @IsNotEmpty({ message: commonExceptions.param.isNotEmpty })
  typeId: string;
}
