import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { PrismaService } from '@/configs/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { IFarmsSelectDTO } from './dto/get/model.dto';

@Injectable()
export class FarmsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authConfigsService: AuthConfigsService,
  ) {}

  async findAll(pagination: IOffsetPagination) {
    try {
      const { info } = this.authConfigsService.getUser();
      const paginateService = new IOffsetPagination<IFarmsSelectDTO>(this.prisma, pagination);
      return await paginateService.paginate('Farms', {
        where: {
          Tenants: {
            members: {
              some: { id: info.id },
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findBy(where: Prisma.FarmsWhereInput): Promise<IFarmsSelectDTO> {
    try {
      const { info } = this.authConfigsService.getUser();
      return (await this.prisma.farms.findFirstOrThrow({
        where: {
          Tenants: {
            members: {
              some: { id: info.id },
            },
          },
          AND: where,
        },
      })) as unknown as IFarmsSelectDTO;
    } catch (error) {
      throw error;
    }
  }
}
