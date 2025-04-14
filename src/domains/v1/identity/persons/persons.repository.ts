import { IOffsetPaginationResponse, IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { PrismaService } from '@/configs/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { IPersonsSelectDTO } from './dto/get/model.dto';

@Injectable()
export class PersonsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authConfigsService: AuthConfigsService,
  ) {}

  async findAll(pagination: IOffsetPagination): Promise<IOffsetPaginationResponse<IPersonsSelectDTO[]>> {
    try {
      const { farm } = this.authConfigsService.getUser();
      const paginateService = new IOffsetPagination<IPersonsSelectDTO>(this.prisma, pagination);
      return await paginateService.paginate('Persons', {
        where: {
          farms: {
            some: {
              id: farm.id,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findBy(where: Prisma.PersonsWhereInput) {
    try {
      const { farm } = this.authConfigsService.getUser();
      const response = await this.prisma.persons.findFirstOrThrow({
        where: {
          farms: {
            some: {
              id: farm.id,
            },
          },
          AND: where,
        },
      });
      return response as unknown as IPersonsSelectDTO;
    } catch (error) {
      throw error;
    }
  }
}
