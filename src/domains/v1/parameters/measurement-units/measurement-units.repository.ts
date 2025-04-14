import { IOffsetPaginationResponse, IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { PrismaService } from '@/configs/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { IMeasurementUnitsSelectDTO } from './dto/get/model';

@Injectable()
export class MeasurementUnitsRepository {
  private selectQueryProducts = { conversionRate: true, baseUnit: true, code: true, name: true, id: true };

  constructor(
    private readonly prisma: PrismaService,
    private readonly authConfigsService: AuthConfigsService,
  ) {}

  async findAll(pagination: IOffsetPagination): Promise<IOffsetPaginationResponse<Array<IMeasurementUnitsSelectDTO>>> {
    try {
      const paginateService = new IOffsetPagination<IMeasurementUnitsSelectDTO>(this.prisma, pagination);
      return await paginateService.paginate('MeasurementUnits', {
        where: { ...this.mountMeasurementUnitsWhereInput() },
        select: this.selectQueryProducts,
      });
    } catch (error) {
      throw error;
    }
  }

  async findBy(where: Prisma.MeasurementUnitsWhereInput): Promise<IMeasurementUnitsSelectDTO> {
    try {
      return (await this.prisma.measurementUnits.findFirstOrThrow({
        where: { ...this.mountMeasurementUnitsWhereInput(), ...where },
        select: this.selectQueryProducts,
      })) as unknown as IMeasurementUnitsSelectDTO;
    } catch (error) {
      throw error;
    }
  }

  private mountMeasurementUnitsWhereInput() {
    const { farm } = this.authConfigsService.getUser();
    return {
      OR: [{ farmId: farm.id }, { farmId: null }],
    };
  }
}
