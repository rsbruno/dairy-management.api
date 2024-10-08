import { IOffsetPagination, IOffsetPaginationResponse } from '@/models/pagination/offset-pagination/model';
import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { KeycloakUserService } from '@/keycloak/users/keycloak-user.service';
import { IPersonsGetDataDto, IUsersGetAllDto } from './dto/get/model.dto';
import { PersonsRepository } from './persons.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonsService {
  constructor(
    private readonly personsRepository: PersonsRepository,
    private readonly authConfigsService: AuthConfigsService,
    private readonly keycloakUserService: KeycloakUserService,
  ) {}

  async findById(id: string): Promise<IPersonsGetDataDto> {
    try {
      const { tenant } = this.authConfigsService.getUser();
      const person = await this.personsRepository.findBy({
        id,
        AND: {
          tenants: {
            some: {
              farmsId: tenant.farm.id,
            },
          },
        },
      });
      const user = await this.keycloakUserService.findById(person.keycloakId);
      return { ...IUsersGetAllDto.toIPersonsGetDataDto(user), id: person.id } as IPersonsGetDataDto;
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    pagination: IOffsetPagination,
  ): Promise<IOffsetPaginationResponse<Array<IPersonsGetDataDto>>> {
    try {
      const { tenant } = this.authConfigsService.getUser();
      const repositoryResponse = await this.personsRepository.findAll(pagination, {
        tenants: {
          some: {
            farmsId: tenant.farm.id,
          },
        },
      });
      const items = await Promise.all(
        repositoryResponse.items.map(async (person) => await this.findById(person.id)),
      );
      return { ...repositoryResponse, items } as IOffsetPaginationResponse<Array<IPersonsGetDataDto>>;
    } catch (error) {
      throw error;
    }
  }
}
