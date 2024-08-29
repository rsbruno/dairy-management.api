import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { PrismaService } from '@/configs/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { IPersonsGetAllDto } from './dto/get/model.dto';
import { IPersonsCreateDto } from './dto/body/model.dto';

@Injectable()
export class PersonsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(pagination: IOffsetPagination) {
    try {
      const paginateService = new IOffsetPagination<Array<IPersonsGetAllDto>>(this.prisma, pagination);
      const response = await paginateService.paginate('Persons', {
        select: {
          id: true,
          keycloakId: true,
          occupationId: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const response = await this.prisma.persons.findFirstOrThrow({
        where: { id },
        select: {
          id: true,
          keycloakId: true,
          occupationId: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async create(createPersonDto: IPersonsCreateDto) {
    try {
      const response = await this.prisma.persons.create({
        data: {
          keycloakId: createPersonDto.keycloakId,
          username: createPersonDto.username,
          occupationId: {
            connect: {
              id: createPersonDto.occupation.id,
            },
          },
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
