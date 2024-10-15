import { IOffsetPagination, IOffsetPaginationResponse } from '@/models/pagination/offset-pagination/model';
import { PrismaService } from '@/configs/database/prisma.service';
import { ICostCenterCreateDto } from './dto/body/model.dto';
import { ICostCenterGetAllDto } from './dto/get/model';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CostCenterRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findBy(where: Prisma.CostCenterWhereInput): Promise<ICostCenterGetAllDto> {
    try {
      const response = await this.prisma.costCenter.findFirstOrThrow({
        where,
        select: {
          description: true,
          farm: true,
          name: true,
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
  ): Promise<IOffsetPaginationResponse<Array<ICostCenterGetAllDto>>> {
    try {
      const paginateService = new IOffsetPagination(this.prisma, pagination);
      const response = await paginateService.paginate('CostCenter', {
        where: {
          farm: {
            id: farmId,
          },
        },
        select: {
          description: true,
          farm: true,
          name: true,
          id: true,
        },
      });
      return response as unknown as IOffsetPaginationResponse<Array<ICostCenterGetAllDto>>;
    } catch (error) {
      throw error;
    }
  }

  async create(costCenterCreateDto: ICostCenterCreateDto, farmId: string) {
    try {
      return this.prisma.costCenter.create({
        data: {
          name: costCenterCreateDto.name,
          description: costCenterCreateDto.description,
          farm: {
            connect: {
              id: farmId,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
