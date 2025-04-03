import { Injectable } from '@nestjs/common';

import { TransactionsRepository } from './transactions.repository';
import { ITransactionsFindAllDTO } from './dto/param/model.dto';
import { ITransactionsCreateDTO } from './dto/body/model.dto';
import { ITransactionDataDTO } from './dto/get/model';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionsRepository: TransactionsRepository) {}

  async create(transactionsCreateDTO: ITransactionsCreateDTO) {
    try {
      const createdTransaction = await this.transactionsRepository.create(transactionsCreateDTO);
      return ITransactionDataDTO.transform(createdTransaction);
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: ITransactionsFindAllDTO) {
    try {
      const transactions = await this.transactionsRepository.findAll(query);
      return {
        ...transactions,
        items: transactions.items.map(transaction => ITransactionDataDTO.transform(transaction)),
      };
    } catch (error) {
      throw error;
    }
  }
}
