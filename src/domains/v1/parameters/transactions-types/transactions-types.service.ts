import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { Injectable } from '@nestjs/common';

import { TransactionsTypesRepository } from './transactions-types.repository';
import { ITransactionsDataDTO } from './dto/get/model';

@Injectable()
export class TransactionsTypesService {
  constructor(private readonly transactionsTypesRepository: TransactionsTypesRepository) {}

  async findAll(pagination: IOffsetPagination) {
    try {
      const transactionsTypes = await this.transactionsTypesRepository.findAll(pagination);
      return {
        ...transactionsTypes,
        items: transactionsTypes.items.map(transactionsType => ITransactionsDataDTO.transform(transactionsType)),
      };
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<ITransactionsDataDTO> {
    try {
      const transactionType = await this.transactionsTypesRepository.findBy({ id });
      return ITransactionsDataDTO.transform(transactionType);
    } catch (error) {
      throw error;
    }
  }
}
