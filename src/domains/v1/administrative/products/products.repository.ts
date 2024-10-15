import { IOffsetPagination, IOffsetPaginationResponse } from '@/models/pagination/offset-pagination/model';
import { PrismaService } from '@/configs/database/prisma.service';
import { IProductsCreateDto } from './dto/body/model.dto';
import { IProductsGetAllDto } from './dto/get/model';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findBy(where: Prisma.ProductsWhereInput): Promise<IProductsGetAllDto> {
    try {
      const response = await this.prisma.products.findFirstOrThrow({
        where,
        select: {
          description: true,
          costCenter: true,
          unitPrice: true,
          quantity: true,
          name: true,
          farm: true,
          id: true,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    pagination: IOffsetPagination,
    farmId: string,
  ): Promise<IOffsetPaginationResponse<Array<IProductsGetAllDto>>> {
    try {
      const paginateService = new IOffsetPagination(this.prisma, pagination);
      return (await paginateService.paginate('Products', {
        where: {
          farm: {
            id: farmId,
          },
        },
        select: {
          description: true,
          costCenter: true,
          unitPrice: true,
          quantity: true,
          name: true,
          farm: true,
          id: true,
        },
      })) as unknown as IOffsetPaginationResponse<Array<IProductsGetAllDto>>;
    } catch (error) {
      throw error;
    }
  }

  async create(productCreateDto: IProductsCreateDto, farmId: string) {
    try {
      return await this.prisma.products.create({
        data: {
          description: productCreateDto.description,
          unitPrice: productCreateDto.unitPrice,
          quantity: productCreateDto.quantity,
          name: productCreateDto.name,
          farm: {
            connect: {
              id: farmId,
            },
          },
          costCenter: {
            connect: {
              id: productCreateDto.costCenterId,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
