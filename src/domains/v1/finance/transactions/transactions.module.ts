import { TransactionsTypesModule } from '@/domains/v1/parameters/transactions-types/transactions-types.module';
import { PersonsModule } from '@/domains/v1/identity/persons/persons.module';
import { Module } from '@nestjs/common';

import { ProductsModule } from '../../stock/products/products.module';
import { TransactionsRepository } from './transactions.repository';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [ProductsModule, TransactionsTypesModule, PersonsModule],
  providers: [TransactionsService, TransactionsRepository],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
