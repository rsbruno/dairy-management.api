import { TenantsRepository } from './tenants.repository';
import { ITenantsGetAllDto } from './dto/get/model.dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class TenantsService {
  constructor(private readonly tenantsRepository: TenantsRepository) {}

  async findBy(where: Prisma.TenantsWhereInput): Promise<ITenantsGetAllDto> {
    try {
      return await this.tenantsRepository.findBy(where);
    } catch (error) {
      throw error;
    }
  }

  async findAssignedTenants(username: string) {
    try {
      return await this.findBy({
        members: { some: { username } },
      });
    } catch (error) {
      throw error;
    }
  }
}
