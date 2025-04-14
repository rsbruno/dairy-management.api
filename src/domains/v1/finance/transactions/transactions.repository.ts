import { IOffsetPaginationResponse, IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { PrismaService } from '@/configs/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ITransactionsFindAllDTO } from './dto/param/model.dto';
import { ITransactionsCreateDTO } from './dto/body/model.dto';
import { ITransactionSelectDTO } from './dto/get/model';

@Injectable()
export class TransactionsRepository {
  private selectQueryTransactions = {
    product: { include: { measurementUnit: true } },
    costCenter: { include: { parent: true } },
    responsible: true,
    description: true,
    createdAt: true,
    unitPrice: true,
    quantity: true,
    type: true,
    id: true,
  } as Prisma.TransactionsSelect;

  constructor(
    private readonly prisma: PrismaService,
    private readonly authConfigsService: AuthConfigsService,
  ) {}

  async create(transactionsCreateDTO: ITransactionsCreateDTO) {
    try {
      const { user, farm } = this.authConfigsService.getUser();
      return (await this.prisma.transactions.create({
        data: {
          product: transactionsCreateDTO.productId && {
            connect: {
              id: transactionsCreateDTO.productId,
            },
          },
          costCenter: {
            connect: {
              id: transactionsCreateDTO.costCenterId,
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
              id: farm.id,
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
      const { farm } = this.authConfigsService.getUser();
      const paginateService = new IOffsetPagination<ITransactionSelectDTO>(this.prisma, query);
      return await paginateService.paginate('Transactions', {
        where: {
          createdAt: {
            gte: query.startDate,
            lte: query.endDate,
          },
          responsible: query.responsibleId && {
            id: query.responsibleId,
          },
          costCenter: query.costCenterId && {
            id: query.costCenterId,
          },
          product: query.productId && {
            id: query.productId,
          },
          type: query.typeId && {
            id: query.typeId,
          },
          farm: {
            id: farm.id,
          },
        },
        select: this.selectQueryTransactions,
      });
    } catch (error) {
      throw error;
    }
  }
}
