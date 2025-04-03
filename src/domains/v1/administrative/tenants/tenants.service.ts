import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { TenantsRepository } from './tenants.repository';
import { ITenantsDataDTO } from './dto/get/model.dto';

@Injectable()
export class TenantsService {
  constructor(private readonly tenantsRepository: TenantsRepository) {}

  async findAssignedTenants(username: string) {
    try {
      return await this.findBy({
        members: { some: { username } },
      });
    } catch (error) {
      throw error;
    }
  }

  async findBy(where: Prisma.TenantsWhereInput): Promise<ITenantsDataDTO> {
    try {
      const tenants = await this.tenantsRepository.findBy(where);
      return ITenantsDataDTO.transform(tenants);
    } catch (error) {
      throw error;
    }
  }
}
