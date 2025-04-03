import { ITransactionsSelectDTO, ITransactionsDataDTO } from '@/domains/v1/parameters/transactions-types/dto/get/model';
import { ICostCenterSelectDTO, ICostCenterDataDTO } from '@/domains/v1/parameters/cost-center/dto/get/model';
import { IProductsSelectDTO, IProductsDataDTO } from '@/domains/v1/stock/products/dto/get/model';
import { Transactions } from 'prisma/prisma-client';
import { ApiProperty } from '@nestjs/swagger';

export class ITransactionSelectDTO implements Transactions {
  costCenter: ICostCenterSelectDTO;
  costCenterId: string;
  createdAt: Date;
  description: string;
  farmId: string;
  id: string;
  product: IProductsSelectDTO;
  productId: string;
  quantity: number;
  responsibleId: string;
  type: ITransactionsSelectDTO;
  typeId: string;
  unitPrice: number;
}

export class ITransactionDataDTO {
  @ApiProperty()
  costCenter: ICostCenterDataDTO;

  @ApiProperty()
  description: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  product: IProductsDataDTO;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  type: ITransactionsDataDTO;

  @ApiProperty()
  unitPrice: number;

  public static transform(transaction: ITransactionSelectDTO | null): ITransactionDataDTO {
    if (!transaction) return null;
    return {
      costCenter: ICostCenterDataDTO.toICostCenterDataDTO(transaction.costCenter),
      product: IProductsDataDTO.transform(transaction.product),
      type: ITransactionsDataDTO.transform(transaction.type),
      description: transaction.description,
      unitPrice: transaction.unitPrice,
      quantity: transaction.quantity,
      id: transaction.id,
    };
  }
}
