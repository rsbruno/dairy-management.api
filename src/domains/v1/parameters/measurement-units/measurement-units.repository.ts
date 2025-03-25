import { IOffsetPagination, IOffsetPaginationResponse } from '@/models/pagination/offset-pagination/model';
import { PrismaService } from '@/configs/database/prisma.service';
import { IMeasurementUnitsResponseDto } from './dto/get/model';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class MeasurementUnitsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findBy(where: Prisma.MeasurementUnitsWhereInput): Promise<IMeasurementUnitsResponseDto> {
    try {
      const response = await this.prisma.measurementUnits.findFirstOrThrow({
        where,
        select: {
          conversionRate: true,
          baseUnit: true,
          code: true,
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
  ): Promise<IOffsetPaginationResponse<Array<IMeasurementUnitsResponseDto>>> {
    try {
      const paginateService = new IOffsetPagination(this.prisma, pagination);
      const response = await paginateService.paginate('MeasurementUnits', {
        where: {
          OR: [
            {
              farmId: {
                equals: null,
              },
            },
            {
              farm: {
                id: farmId,
              },
            },
          ],
        },
        select: {
          conversionRate: true,
          baseUnit: true,
          code: true,
          name: true,
          id: true,
        },
      });
      return response as unknown as IOffsetPaginationResponse<Array<IMeasurementUnitsResponseDto>>;
    } catch (error) {
      throw error;
    }
  }
}
