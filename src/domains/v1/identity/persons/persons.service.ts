import { IOffsetPagination, IOffsetPaginationResponse } from '@/models/pagination/offset-pagination/model';
import { IPersonsGetDataDto } from './dto/get/model.dto';
import { IPersonsCreateDto } from './dto/body/model.dto';
import { PersonsRepository } from './persons.repository';
import { UsersService } from '../users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonsService {
  constructor(
    private readonly personsRepository: PersonsRepository,
    private readonly usersService: UsersService,
  ) {}

  async findAll(
    pagination: IOffsetPagination,
  ): Promise<IOffsetPaginationResponse<Array<IPersonsGetDataDto>>> {
    try {
      const repositoryResponse = await this.personsRepository.findAll(pagination);
      const data = await Promise.all(
        repositoryResponse.items.map(async (person) => {
          const keycloakUser = await this.usersService.findById(person.keycloakId);
          return { ...keycloakUser, occupation: person.occupationId } as IPersonsGetDataDto;
        }),
      );
      return { ...repositoryResponse, items: data } as IOffsetPaginationResponse<Array<IPersonsGetDataDto>>;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<IPersonsGetDataDto> {
    try {
      const repositoryResponse = await this.personsRepository.findById(id);
      const keycloakUser = await this.usersService.findById(repositoryResponse.keycloakId);
      return { ...keycloakUser, occupation: repositoryResponse.occupationId } as IPersonsGetDataDto;
    } catch (error) {
      throw error;
    }
  }

  async create(createPersonDto: IPersonsCreateDto): Promise<IPersonsGetDataDto> {
    try {
      return (await this.personsRepository.create(createPersonDto)) as unknown as IPersonsGetDataDto;
    } catch (error) {
      throw error;
    }
  }
}
