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
      const { user } = this.authConfigsService.getUser();
      const paginateService = new IOffsetPagination<IFarmsSelectDTO>(this.prisma, pagination);
      return await paginateService.paginate('Farms', {
        where: {
          members: {
            some: { id: user.id },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findBy(where: Prisma.FarmsWhereInput): Promise<IFarmsSelectDTO> {
    try {
      const { user } = this.authConfigsService.getUser();
      return (await this.prisma.farms.findFirstOrThrow({
        where: {
          members: {
            some: { id: user.id },
          },
          AND: where,
        },
      })) as unknown as IFarmsSelectDTO;
    } catch (error) {
      throw error;
    }
  }

  async switch(farmId: string): Promise<void> {
    try {
      const { user } = this.authConfigsService.getUser();
      await this.prisma.persons.update({
        where: {
          AND: {
            farms: {
              some: { id: farmId },
            },
          },
          id: user.id,
        },
        data: { activeFarm: { connect: { id: farmId } } },
      });
    } catch (error) {
      throw error;
    }
  }
}
