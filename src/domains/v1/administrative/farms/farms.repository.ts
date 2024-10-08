import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { PrismaService } from '@/configs/database/prisma.service';
import { IFarmsGetAllDto } from './dto/get/model.dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class FarmsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findBy(where: Prisma.FarmsWhereInput): Promise<IFarmsGetAllDto> {
    try {
      const response = await this.prisma.farms.findFirstOrThrow({
        where,
        select: {
          cnpj: true,
          name: true,
          id: true,
          Tenants: {
            select: {
              clientId: true,
              clientSecret: true,
              members: true,
              _count: {
                select: {
                  members: true,
                },
              },
            },
          },
        },
      });
      return response as unknown as IFarmsGetAllDto;
    } catch (error) {
      throw error;
    }
  }

  async findAll(pagination: IOffsetPagination, where?: Prisma.FarmsWhereInput) {
    try {
      const paginateService = new IOffsetPagination<Array<IFarmsGetAllDto>>(this.prisma, pagination);
      const response = await paginateService.paginate('Farms', {
        where: where ?? {},
        select: {
          id: true,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
