import { IOffsetPagination, IOffsetPaginationResponse } from '@/models/pagination/offset-pagination/model';
import { PrismaService } from '@/configs/database/prisma.service';
import { ITransactionsTypesGetAllDto } from './dto/get/model';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionsTypesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findBy(where: Prisma.TransactionsTypesWhereInput): Promise<ITransactionsTypesGetAllDto> {
    try {
      const response = await this.prisma.transactionsTypes.findFirstOrThrow({
        where: where,
        select: {
          name: true,
          code: true,
          farm: true,
          id: true,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    pagination: IOffsetPagination,
    farmId: string,
  ): Promise<IOffsetPaginationResponse<Array<ITransactionsTypesGetAllDto>>> {
    try {
      const paginateService = new IOffsetPagination(this.prisma, pagination);
      const response = await paginateService.paginate('TransactionsTypes', {
        where: {
          farmId,
        },
        select: {
          name: true,
          code: true,
          farm: true,
          id: true,
        },
      });
      return response as unknown as IOffsetPaginationResponse<Array<ITransactionsTypesGetAllDto>>;
    } catch (error) {
      throw error;
    }
  }
}
