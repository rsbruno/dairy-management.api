import { IOffsetPaginationResponse, IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { PrismaService } from '@/configs/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ICostCenterCreateDTO } from './dto/body/model.dto';
import { ICostCenterFindAll } from './dto/param/model.dto';
import { ICostCenterSelectDTO } from './dto/get/model';

@Injectable()
export class CostCenterRepository {
  private selectQueryCostCenter = { description: true, parent: true, name: true, code: true, id: true };

  constructor(
    private readonly prisma: PrismaService,
    private readonly authConfigsService: AuthConfigsService,
  ) {}

  async create(costCenterCreateDto: ICostCenterCreateDTO): Promise<ICostCenterSelectDTO> {
    try {
      const { tenant } = this.authConfigsService.getUser();
      return (await this.prisma.costCenter.create({
        data: {
          parent: costCenterCreateDto.parentId && {
            connect: {
              id: costCenterCreateDto.parentId,
            },
          },
          farm: {
            connect: {
              id: tenant.farm.id,
            },
          },
          description: costCenterCreateDto.description,
          name: costCenterCreateDto.name,
          code: costCenterCreateDto.code,
        },
        select: this.selectQueryCostCenter,
      })) as unknown as ICostCenterSelectDTO;
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: ICostCenterFindAll): Promise<IOffsetPaginationResponse<Array<ICostCenterSelectDTO>>> {
    try {
      const paginateService = new IOffsetPagination<ICostCenterSelectDTO>(this.prisma, query);
      return await paginateService.paginate('CostCenter', {
        where: {
          ...this.mountCostCenterWhereInput(),
          parent: query.onlyRoot && {
            is: null,
          },
        },
        select: this.selectQueryCostCenter,
      });
    } catch (error) {
      throw error;
    }
  }

  async findBy(where: Prisma.CostCenterWhereInput): Promise<ICostCenterSelectDTO> {
    try {
      return (await this.prisma.costCenter.findFirstOrThrow({
        where: { ...this.mountCostCenterWhereInput(), AND: where },
        select: this.selectQueryCostCenter,
      })) as unknown as ICostCenterSelectDTO;
    } catch (error) {
      throw error;
    }
  }

  private mountCostCenterWhereInput() {
    const { tenant } = this.authConfigsService.getUser();
    return {
      farm: {
        id: tenant.farm.id,
      },
    };
  }
}
