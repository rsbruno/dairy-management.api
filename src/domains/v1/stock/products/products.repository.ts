import { IOffsetPaginationResponse, IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { PrismaService } from '@/configs/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { IProductsCreateDTO } from './dto/body/model.dto';
import { IProductsSelectDTO } from './dto/get/model';

@Injectable()
export class ProductsRepository {
  private selectQueryProducts = { measurementUnit: true, description: true, name: true, id: true };

  constructor(
    private readonly prisma: PrismaService,
    private readonly authConfigsService: AuthConfigsService,
  ) {}

  async create(productsCreateDTO: IProductsCreateDTO): Promise<IProductsSelectDTO> {
    try {
      const { farm } = this.authConfigsService.getUser();
      return (await this.prisma.products.create({
        data: {
          measurementUnit: {
            connect: { id: productsCreateDTO.measurementUnitId },
          },
          farm: {
            connect: { id: farm.id },
          },
          description: productsCreateDTO.description,
          name: productsCreateDTO.name,
        },
        select: this.selectQueryProducts,
      })) as unknown as IProductsSelectDTO;
    } catch (error) {
      throw error;
    }
  }

  async findAll(pagination: IOffsetPagination): Promise<IOffsetPaginationResponse<Array<IProductsSelectDTO>>> {
    try {
      const { farm } = this.authConfigsService.getUser();
      const paginateService = new IOffsetPagination<IProductsSelectDTO>(this.prisma, pagination);
      return await paginateService.paginate('Products', {
        where: { farm: { id: farm.id } },
        select: this.selectQueryProducts,
      });
    } catch (error) {
      throw error;
    }
  }

  async findBy(where: Prisma.ProductsWhereInput): Promise<IProductsSelectDTO> {
    try {
      const { farm } = this.authConfigsService.getUser();
      return (await this.prisma.products.findFirstOrThrow({
        where: {
          farm: { id: farm.id },
          AND: where,
        },
        select: this.selectQueryProducts,
      })) as unknown as IProductsSelectDTO;
    } catch (error) {
      throw error;
    }
  }
}
