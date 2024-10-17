import { TransactionsTypesModule } from '../transactions-types/transactions-types.module';
import { ProductsModule } from '@/domains/v1/administrative/products/products.module';
import { PersonsModule } from '../../identity/persons/persons.module';
import { TransactionsRepository } from './transactions.repository';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ProductsModule, TransactionsTypesModule, PersonsModule],
  providers: [TransactionsService, TransactionsRepository],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
