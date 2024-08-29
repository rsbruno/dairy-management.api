import { Injectable } from '@nestjs/common';
import { TenantsRepository } from './tenants.repository';
import { ITenantsCreateDto } from './dto/body/model.dto';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { UsersService } from '../../identity/users/users.service';

@Injectable()
export class TenantsService {
  constructor(
    private readonly tenantsRepository: TenantsRepository,
    private readonly usersService: UsersService,
  ) {}

  async findAll(pagination: IOffsetPagination) {
    try {
      const repositoryResponse = await this.tenantsRepository.findAll(pagination);
      const mapper = repositoryResponse.items.map((response) => ({
        membersCount: response._count.members,
        clientSecret: response.clientSecret,
        clientId: response.id,
        id: response.id,
      }));
      return { ...repositoryResponse, items: mapper };
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const respositoryResponse = await this.tenantsRepository.findById(id);
      const members = await Promise.all(
        respositoryResponse.members.map(
          async (member) => await this.usersService.findById(member.keycloakId),
        ),
      );
      return { ...respositoryResponse, members };
    } catch (error) {
      throw error;
    }
  }

  async create(createTenantDto: ITenantsCreateDto) {
    try {
      return await this.tenantsRepository.create(createTenantDto);
    } catch (error) {
      throw error;
    }
  }
}
