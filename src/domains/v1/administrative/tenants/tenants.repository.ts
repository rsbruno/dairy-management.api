import { PrismaService } from '@/configs/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ITenantsSelectDTO } from './dto/get/model.dto';

@Injectable()
export class TenantsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findBy(where: Prisma.TenantsWhereInput): Promise<ITenantsSelectDTO> {
    try {
      const response = await this.prisma.tenants.findFirstOrThrow({
        orderBy: {
          id: 'desc',
        },
        include: { members: true, farm: true },
        where,
      });
      return response as unknown as ITenantsSelectDTO;
    } catch (error) {
      throw error;
    }
  }
}
