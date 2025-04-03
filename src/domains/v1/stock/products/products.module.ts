import { Module } from '@nestjs/common';

import { ProductsRepository } from './products.repository';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
  imports: [],
})
export class ProductsModule {}
