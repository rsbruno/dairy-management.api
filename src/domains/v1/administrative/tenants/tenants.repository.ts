import { PrismaService } from '@/configs/database/prisma.service';
import { ITenantsCreateDto } from './dto/body/model.dto';
import { Injectable } from '@nestjs/common';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';

@Injectable()
export class TenantsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(pagination: IOffsetPagination) {
    try {
      const paginateService = new IOffsetPagination<Array<any>>(this.prisma, pagination);
      const response = await paginateService.paginate('Tenants', {
        select: {
          id: true,
          clientId: true,
          clientSecret: true,
          _count: {
            select: {
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

  async findById(id: string) {
    try {
      const response = await this.prisma.tenants.findFirstOrThrow({
        where: { id },
        select: {
          id: true,
          clientId: true,
          clientSecret: true,
          members: {
            select: {
              id: true,
              keycloakId: true,
            },
          },
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async create(createTenantDto: ITenantsCreateDto) {
    try {
      const response = await this.prisma.tenants.create({
        data: {
          clientId: createTenantDto.clientId,
          clientSecret: createTenantDto.clientSecret,
          members: {
            connect: createTenantDto.members.map((member) => ({ keycloakId: member.keycloakId })),
          },
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
