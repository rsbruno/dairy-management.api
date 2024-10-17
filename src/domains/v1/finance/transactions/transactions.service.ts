import { TransactionsTypesService } from '../transactions-types/transactions-types.service';
import { ProductsService } from '@/domains/v1/administrative/products/products.service';
import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { PersonsService } from '../../identity/persons/persons.service';
import { TransactionsRepository } from './transactions.repository';
import { ITransactionsCreateDto } from './dto/body/model.dto';
import { ITransactionGetAllDto } from './dto/get/model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly transactionsTypesService: TransactionsTypesService,
    private readonly authConfigsService: AuthConfigsService,
    private readonly productsService: ProductsService,
    private readonly personsService: PersonsService,
  ) {}

  async findAll(query: IOffsetPagination, productId: string) {
    try {
      const { tenant } = this.authConfigsService.getUser();
      const pagination = await this.transactionsRepository.findAll(query, tenant, productId);
      const items = await Promise.all(
        pagination.items.map(async (transaction) => {
          const responsible = await this.personsService.findById(transaction.responsible.id);
          return ITransactionGetAllDto.toITransactionGetDataDto({ ...transaction, responsible });
        }),
      );
      return { ...pagination, items };
    } catch (error) {
      throw error;
    }
  }

  async create(transaction: ITransactionsCreateDto) {
    try {
      const { tenant, info } = this.authConfigsService.getUser();
      const product = await this.productsService.findById(transaction.productId);
      const transactionType = await this.transactionsTypesService.findById(transaction.typeId);
      const productToUpdate = this.transactionsRepository.prepareProductToTrasaction(
        product,
        transaction,
        transactionType,
      );
      return await this.transactionsRepository.create(transaction, tenant, info, productToUpdate);
    } catch (error) {
      throw error;
    }
  }
}
