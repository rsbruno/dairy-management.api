import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { IProductsGetAllDto, IProductsGetDataDto } from './dto/get/model';
import { ProductsRepository } from './products.repository';
import { IProductsCreateDto } from './dto/body/model.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly authConfigsService: AuthConfigsService,
  ) {}

  async findById(id: string): Promise<IProductsGetDataDto> {
    try {
      const { tenant } = this.authConfigsService.getUser();
      const product = await this.productsRepository.findBy({
        id,
        AND: {
          farm: {
            id: tenant.farm.id,
          },
        },
      });
      return IProductsGetAllDto.toIProductsGetDataDto(product);
    } catch (error) {
      throw error;
    }
  }

  async findAll(pagination: IOffsetPagination) {
    try {
      const { tenant } = this.authConfigsService.getUser();
      const products = await this.productsRepository.findAll(pagination, tenant.farm.id);
      const items = products.items.map((product) => IProductsGetAllDto.toIProductsGetDataDto(product));
      return { ...products, items };
    } catch (error) {
      throw error;
    }
  }

  async create(productsCreateDto: IProductsCreateDto) {
    try {
      const { tenant } = this.authConfigsService.getUser();
      return await this.productsRepository.create(productsCreateDto, tenant.farm.id);
    } catch (error) {
      throw error;
    }
  }
}
