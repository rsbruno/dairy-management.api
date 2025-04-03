import { IOffsetPaginationResponse, IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { PrismaService } from '@/configs/database/prisma.service';
import { Injectable } from '@nestjs/common';

import { ITransactionsFindAllDTO } from './dto/param/model.dto';
import { ITransactionsCreateDTO } from './dto/body/model.dto';
import { ITransactionSelectDTO } from './dto/get/model';

@Injectable()
export class TransactionsRepository {
  private selectQueryTransactions = {
    product: { include: { measurementUnit: true } },
    costCenter: { include: { parent: true } },
    unitPrice: true,
    quantity: true,
    type: true,
    id: true,
  };

  constructor(
    private readonly prisma: PrismaService,
    private readonly authConfigsService: AuthConfigsService,
  ) {}

  async create(transactionsCreateDTO: ITransactionsCreateDTO) {
    try {
      const { info: user, tenant } = this.authConfigsService.getUser();
      return (await this.prisma.transactions.create({
        data: {
          costCenter: {
            connect: {
              id: transactionsCreateDTO.costCenterId,
            },
          },
          product: {
            connect: {
              id: transactionsCreateDTO.productId,
            },
          },
          type: {
            connect: {
              id: transactionsCreateDTO.typeId,
            },
          },
          responsible: {
            connect: {
              id: user.id,
            },
          },
          farm: {
            connect: {
              id: tenant.farm.id,
            },
          },
          description: transactionsCreateDTO.description,
          unitPrice: transactionsCreateDTO.unityPrice,
          quantity: transactionsCreateDTO.quantity,
        },
        select: this.selectQueryTransactions,
      })) as unknown as ITransactionSelectDTO;
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: ITransactionsFindAllDTO): Promise<IOffsetPaginationResponse<Array<ITransactionSelectDTO>>> {
    try {
      const { tenant } = this.authConfigsService.getUser();
      const paginateService = new IOffsetPagination<ITransactionSelectDTO>(this.prisma, query);
      return await paginateService.paginate('Transactions', {
        where: {
          costCenter: query.costCenterId && {
            id: query.costCenterId,
          },
          product: query.productId && {
            id: query.productId,
          },
          farm: {
            id: tenant.farm.id,
          },
        },
        select: this.selectQueryTransactions,
      });
    } catch (error) {
      throw error;
    }
  }
}
