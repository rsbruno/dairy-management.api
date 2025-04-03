import { Module } from '@nestjs/common';

import { TransactionsTypesRepository } from './transactions-types.repository';
import { TransactionsTypesController } from './transactions-types.controller';
import { TransactionsTypesService } from './transactions-types.service';

@Module({
  providers: [TransactionsTypesService, TransactionsTypesRepository],
  exports: [TransactionsTypesService, TransactionsTypesRepository],
  controllers: [TransactionsTypesController],
})
export class TransactionsTypesModule {}
