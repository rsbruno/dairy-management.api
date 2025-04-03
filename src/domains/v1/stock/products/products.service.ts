import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { Injectable } from '@nestjs/common';

import { ProductsRepository } from './products.repository';
import { IProductsCreateDTO } from './dto/body/model.dto';
import { IProductsDataDTO } from './dto/get/model';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(productsCreateDTO: IProductsCreateDTO): Promise<IProductsDataDTO> {
    try {
      const product = await this.productsRepository.create(productsCreateDTO);
      return IProductsDataDTO.transform(product);
    } catch (error) {
      throw error;
    }
  }

  async findAll(pagination: IOffsetPagination) {
    try {
      const products = await this.productsRepository.findAll(pagination);
      return {
        ...products,
        items: products.items.map(transaction => IProductsDataDTO.transform(transaction)),
      };
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<IProductsDataDTO> {
    try {
      const product = await this.productsRepository.findBy({ id });
      return IProductsDataDTO.transform(product);
    } catch (error) {
      throw error;
    }
  }
}
