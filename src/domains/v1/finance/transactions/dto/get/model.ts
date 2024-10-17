import { IPersonsGetDataDto } from '@/domains/v1/identity/persons/dto/get/model.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ITransactionResponsibleGetAllDto {
  id: string;
  keycloakId: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ITransactionTypeGetAllDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;

  farmId?: string;
}

export class ITransactionGetDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  unitPrice: number;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ type: ITransactionTypeGetAllDto })
  type: ITransactionTypeGetAllDto;

  @ApiProperty({ type: IPersonsGetDataDto })
  responsible: IPersonsGetDataDto;
}

export class ITransactionGetAllDto {
  description: string;
  updatedAt: Date;
  unitPrice: number;
  createdAt: Date;
  quantity: number;
  id: string;
  responsible: IPersonsGetDataDto;
  type: ITransactionTypeGetAllDto;

  public static toITransactionGetDataDto(data: ITransactionGetAllDto): ITransactionGetDataDto {
    return {
      totalPrice: Number((data.quantity * data.unitPrice).toFixed(2)),
      responsible: data.responsible,
      description: data.description,
      createdAt: data.createdAt,
      unitPrice: data.unitPrice,
      quantity: data.quantity,
      id: data.id,
      type: {
        code: data.type.code,
        name: data.type.name,
        id: data.type.id,
      },
    };
  }
}
