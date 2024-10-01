import { createClientTemplatePayload } from '@/utils/keycloak-scaffold/create-client-palyload';
import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { PersonsService } from '@/domains/v1/identity/persons/persons.service';
import { IFarmsCreateDto } from '../farms/dto/body/model.dto';
import { TenantsRepository } from './tenants.repository';
import { ITenantsGetDataDto } from './dto/get/model.dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class TenantsService {
  constructor(private readonly tenantsRepository: TenantsRepository) {}

  async create(createTenantDto: IFarmsCreateDto) {
    try {
      const { id } = await this.tenantsRepository.create(createTenantDto);
      return { createTenantDto, id };
    } catch (error) {
      throw error;
    }
  }

  async keycloakCreateClient(createClientDto: { name: string }) {
    try {
      const createTenantDto = createClientTemplatePayload({
        name: createClientDto.name,
      });
      await this.tenantsRepository.keycloakCreateClient(createTenantDto);
      return { clientId: createTenantDto.clientId, clientSecret: createTenantDto.secret };
    } catch (error) {
      throw error;
    }
  }
}
