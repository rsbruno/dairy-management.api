import { IOffsetPaginationResponse, IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { PrismaService } from '@/configs/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ITransactionsSelectDTO } from './dto/get/model';

@Injectable()
export class TransactionsTypesRepository {
  private selectQueryTransactionsTypes = { code: true, farm: true, id: true };

  constructor(
    private readonly prisma: PrismaService,
    private readonly authConfigsService: AuthConfigsService,
  ) {}

  async findAll(pagination: IOffsetPagination): Promise<IOffsetPaginationResponse<Array<ITransactionsSelectDTO>>> {
    try {
      const paginateService = new IOffsetPagination<ITransactionsSelectDTO>(this.prisma, pagination);
      return await paginateService.paginate('TransactionsTypes', {
        where: { ...this.mountTransactionsTypesWhereInput() },
        select: this.selectQueryTransactionsTypes,
      });
    } catch (error) {
      throw error;
    }
  }

  async findBy(where: Prisma.TransactionsTypesWhereInput): Promise<ITransactionsSelectDTO> {
    try {
      return (await this.prisma.transactionsTypes.findFirstOrThrow({
        where: { ...this.mountTransactionsTypesWhereInput(), AND: where },
        select: this.selectQueryTransactionsTypes,
      })) as unknown as ITransactionsSelectDTO;
    } catch (error) {
      throw error;
    }
  }

  private mountTransactionsTypesWhereInput() {
    const { farm } = this.authConfigsService.getUser();
    return {
      OR: [{ farmId: farm.id }, { farmId: null }],
    };
  }
}
