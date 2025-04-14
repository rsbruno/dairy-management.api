import { ITransactionsSelectDTO, ITransactionsDataDTO } from '@/domains/v1/parameters/transactions-types/dto/get/model';
import { ICostCenterSelectDTO, ICostCenterDataDTO } from '@/domains/v1/parameters/cost-center/dto/get/model';
import { IPersonsSelectDTO, IPersonsDataDTO } from '@/domains/v1/identity/persons/dto/get/model.dto';
import { IProductsSelectDTO, IProductsDataDTO } from '@/domains/v1/stock/products/dto/get/model';
import { formatNumberToMoney } from '@/utils/format-number-to-mony';
import { Transactions } from '@prisma/client';
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
  responsible: IPersonsSelectDTO;
  responsibleId: string;
  type: ITransactionsSelectDTO;
  typeId: string;
  unitPrice: number;
}

export class ITransactionDataDTO {
  @ApiProperty()
  costCenter: ICostCenterDataDTO;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  description: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  product: IProductsDataDTO;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  responsible: IPersonsDataDTO;

  @ApiProperty()
  type: ITransactionsDataDTO;

  @ApiProperty()
  unitPrice: number;

  public static transform(transaction: ITransactionSelectDTO | null): ITransactionDataDTO {
    if (!transaction) return null;
    return {
      costCenter: ICostCenterDataDTO.toICostCenterDataDTO(transaction.costCenter),
      responsible: IPersonsDataDTO.transform(transaction.responsible),
      product: IProductsDataDTO.transform(transaction.product),
      type: ITransactionsDataDTO.transform(transaction.type),
      unitPrice: formatNumberToMoney(transaction.unitPrice),
      description: transaction.description,
      createdAt: transaction.createdAt,
      quantity: transaction.quantity,
      id: transaction.id,
    };
  }
}
