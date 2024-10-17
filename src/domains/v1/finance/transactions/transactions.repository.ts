import { IOffsetPagination, IOffsetPaginationResponse } from '@/models/pagination/offset-pagination/model';
import { IProductsGetDataDto } from '@/domains/v1/administrative/products/dto/get/model';
import { ITransactionsTypesGetDataDto } from '../transactions-types/dto/get/model';
import { CustomBusinessException } from '@/exceptions/custom-business.exception';
import { transactionsTypesEnum } from '@/enums/transactions-types.enum';
import { PrismaService } from '@/configs/database/prisma.service';
import { ITransactionsCreateDto } from './dto/body/model.dto';
import { ITransactionGetAllDto } from './dto/get/model';
import { Injectable } from '@nestjs/common';
import {
  IAuthConfigsTenantsGetAllDto,
  IAuthConfigsUserGetAllDto,
} from '@/configs/auth-configs/dto/get/model.dto';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  prepareProductToTrasaction(
    product: IProductsGetDataDto,
    transaction: ITransactionsCreateDto,
    transactionType: ITransactionsTypesGetDataDto,
  ) {
    switch (transactionType.code) {
      case transactionsTypesEnum.income.code:
        //Se chegamos aqui estamos dando entrada no estoque
        if (!transaction?.unityPrice) throw new CustomBusinessException('F-TRS-101');
        product.quantity = product.quantity + transaction.quantity;
        product.unitPrice = transaction.unityPrice;
        break;
      case transactionsTypesEnum.expense.code:
        //Se chegamos aqui estamos dando saída no estoque
        if (transaction.quantity > product.quantity) throw new CustomBusinessException('F-TRS-100');
        product.quantity = Number(product.quantity - transaction.quantity);
        break;
      default:
        throw new CustomBusinessException('F-TRS-102');
    }
    return product;
  }

  async create(
    transactionsCreateDto: ITransactionsCreateDto,
    tenant: IAuthConfigsTenantsGetAllDto,
    info: IAuthConfigsUserGetAllDto,
    product: IProductsGetDataDto,
  ) {
    try {
      return await this.prisma.$transaction(async (schema) => {
        const transaction = await schema.transactions.create({
          data: {
            description: transactionsCreateDto.description,
            quantity: transactionsCreateDto.quantity,
            unitPrice: product.unitPrice,
            product: {
              connect: {
                id: transactionsCreateDto.productId,
              },
            },
            responsible: {
              connect: {
                id: info.id,
              },
            },
            farm: {
              connect: {
                id: tenant.farm.id,
              },
            },
            type: {
              connect: {
                id: transactionsCreateDto.typeId,
              },
            },
          },
        });
        await schema.products.update({
          data: { quantity: product.quantity, unitPrice: product.unitPrice },
          where: { id: product.id },
        });
        return transaction;
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    pagination: IOffsetPagination,
    tenant: IAuthConfigsTenantsGetAllDto,
    productId: string,
  ): Promise<IOffsetPaginationResponse<Array<ITransactionGetAllDto>>> {
    try {
      const paginateService = new IOffsetPagination(this.prisma, pagination);
      const response = await paginateService.paginate('Transactions', {
        where: {
          product: {
            id: productId,
          },
          AND: {
            farm: {
              id: tenant.farm.id,
            },
          },
        },
        select: {
          description: true,
          updatedAt: true,
          unitPrice: true,
          createdAt: true,
          quantity: true,
          id: true,
          responsible: true,
          type: true,
        },
      });
      return response as unknown as IOffsetPaginationResponse<Array<ITransactionGetAllDto>>;
    } catch (error) {
      throw error;
    }
  }
}
