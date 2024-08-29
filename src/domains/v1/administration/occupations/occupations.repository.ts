import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { PrismaService } from '@/configs/database/prisma.service';
import { IOccupationsGetDataDto } from './dto/get/model.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OccupationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(pagination: IOffsetPagination) {
    try {
      const paginateService = new IOffsetPagination<Array<IOccupationsGetDataDto>>(this.prisma, pagination);
      const response = await paginateService.paginate('Occupations', {
        select: {
          name: true,
          id: true,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const response = await this.prisma.occupations.findFirstOrThrow({
        where: { id },
        select: {
          name: true,
          id: true,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
