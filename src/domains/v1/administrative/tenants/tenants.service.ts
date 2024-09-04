import { PersonsService } from '@/domains/v1/identity/persons/persons.service';
import { ITenantsCreateDto } from './dto/body/model.dto';
import { TenantsRepository } from './tenants.repository';
import { ITenantsGetDataDto } from './dto/get/model.dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { CustomBusinessException } from '@/exceptions/custom-business.exception';
import { businessException } from '@/mappings/business-exception.mapping';
import { IFarmsCreateDto } from '../farms/dto/body/model.dto';

@Injectable()
export class TenantsService {
  constructor(
    private readonly tenantsRepository: TenantsRepository,
    private readonly personsService: PersonsService,
    private readonly authConfigsService: AuthConfigsService,
  ) {}

  private async findBy(where: Prisma.TenantsWhereInput) {
    try {
      const me = await this.authConfigsService.getMe();
      const { members, ...respositoryResponse } = await this.tenantsRepository.findBy(where);
      /*  if (!members.some((member) => member.id === me.id)) throw new CustomBusinessException('ATN100'); */
      const data = await Promise.all(
        members.map(async ({ keycloakId, id }) => {
          const data = await this.personsService.keycloakFindById(keycloakId);
          return { ...data, id };
        }),
      );
      return { ...respositoryResponse, members: data } as ITenantsGetDataDto;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const respositoryResponse = await this.findBy({ id });
      return respositoryResponse;
    } catch (error) {
      throw error;
    }
  }

  async findByClientId(clientId: string) {
    try {
      const respositoryResponse = await this.findBy({ clientId });
      return respositoryResponse;
    } catch (error) {
      throw error;
    }
  }

  async assignPerson(clientId: string) {
    try {
      const respositoryResponse = await this.findBy({ clientId });
      return respositoryResponse;
    } catch (error) {
      throw error;
    }
  }

  async create(createTenantDto: IFarmsCreateDto) {
    try {
      const { id } = await this.tenantsRepository.create(createTenantDto);
      return { createTenantDto, id };
    } catch (error) {
      throw error;
    }
  }
}
