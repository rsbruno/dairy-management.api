import { IOffsetPagination, IOffsetPaginationResponse } from '@/models/pagination/offset-pagination/model';
import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { IPersonsGetDataDto, IUsersGetAllDto } from './dto/get/model.dto';
import { IPersonsCreateDto } from './dto/body/model.dto';
import { PersonsRepository } from './persons.repository';
import { Injectable } from '@nestjs/common';
import { CustomBusinessException } from '@/exceptions/custom-business.exception';

@Injectable()
export class PersonsService {
  constructor(
    private readonly personsRepository: PersonsRepository,
    private readonly authConfigsService: AuthConfigsService,
  ) {}

  async findAll(
    pagination: IOffsetPagination,
  ): Promise<IOffsetPaginationResponse<Array<IPersonsGetDataDto>>> {
    try {
      const myTenant = await this.authConfigsService.getMyTenant();
      const repositoryResponse = await this.personsRepository.findAll(pagination, {
        tenants: {
          some: {
            farmsId: myTenant.farm.id,
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

  async findById(id: string): Promise<IPersonsGetDataDto> {
    try {
      const { keycloakId } = await this.personsRepository.findById(id);
      const { data } = await this.personsRepository.keycloakfindById(keycloakId);
      return { ...IUsersGetAllDto.toIPersonsGetDataDto(data), id } as IPersonsGetDataDto;
    } catch (error) {
      throw error;
    }
  }

  async findByKeycloakId(keycloakId: string): Promise<IPersonsGetDataDto> {
    try {
      const person = await this.personsRepository.findBy({ keycloakId });
      const { data } = await this.personsRepository.keycloakfindById(keycloakId);
      return { ...IUsersGetAllDto.toIPersonsGetDataDto(data), id: person.id } as IPersonsGetDataDto;
    } catch (error) {
      throw error;
    }
  }

  async create(createPersonDto: IPersonsCreateDto): Promise<IPersonsCreateDto> {
    try {
      await this.personsRepository.create(createPersonDto);
      return createPersonDto;
    } catch (error) {
      throw error;
    }
  }

  async keycloakFindById(id: string): Promise<IPersonsGetDataDto> {
    try {
      const { data } = await this.personsRepository.keycloakfindById(id);
      return IUsersGetAllDto.toIPersonsGetDataDto(data);
    } catch (error) {
      throw error;
    }
  }
}
