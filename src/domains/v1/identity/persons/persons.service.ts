import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { Injectable } from '@nestjs/common';

import { PersonsRepository } from './persons.repository';
import { IPersonsDataDTO } from './dto/get/model.dto';

@Injectable()
export class PersonsService {
  constructor(private readonly personsRepository: PersonsRepository) {}

  async findAll(pagination: IOffsetPagination) {
    try {
      const persons = await this.personsRepository.findAll(pagination);
      return {
        ...persons,
        items: persons.items.map(person => IPersonsDataDTO.transform(person)),
      };
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const person = await this.personsRepository.findBy({ id });
      return IPersonsDataDTO.transform(person);
    } catch (error) {
      throw error;
    }
  }
}
