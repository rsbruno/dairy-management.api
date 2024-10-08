import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { PrismaService } from '@/configs/database/prisma.service';
import { IPersonsGetAllDto } from './dto/get/model.dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PersonsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findBy(where: Prisma.PersonsWhereInput) {
    try {
      const response = await this.prisma.persons.findFirstOrThrow({
        where,
        select: {
          keycloakId: true,
          id: true,
          username: true,
          tenants: {
            select: {
              farm: true,
              members: true,
            },
          },
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findAll(pagination: IOffsetPagination, where?: Prisma.PersonsWhereInput) {
    try {
      const paginateService = new IOffsetPagination<Array<IPersonsGetAllDto>>(this.prisma, pagination);
      const response = await paginateService.paginate('Persons', {
        where: where ?? {},
        select: {
          id: true,
          keycloakId: true,
          tenants: true,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
