import { ApiDocMethodPaginated } from '@/decorators/swagger/api-doc-method-paginated.decorator';
import { Controller, UseGuards, Param, Query, Body, Post, Get } from '@nestjs/common';
import { ApiDocMethodPost } from '@/decorators/swagger/api-doc-method-post.decorator';
import { ApiDocMethodGet } from '@/decorators/swagger/api-doc-method-get.decorator';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { AuthenticationGuard } from '@/guards/auth/authentication.guard';
import { AuthorizationGuard } from '@/guards/auth/authorization.guard';
import { roles } from '@/configs/mapping-roles/index.roles';
import { Roles } from '@/decorators/roles/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

import { IProductsFindByIdDTO } from './dto/param/model.dto';
import { IProductsCreateDTO } from './dto/body/model.dto';
import { ProductsService } from './products.service';
import { IProductsDataDTO } from './dto/get/model';

@ApiTags('Products')
@Controller('v1/products')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(roles.stocks.products.create.name)
  @ApiDocMethodPost({
    description: roles.stocks.products.create.description,
    responseModel: IProductsDataDTO,
  })
  async create(@Body() productsCreateDTO: IProductsCreateDTO) {
    return await this.productsService.create(productsCreateDTO);
  }

  @Get()
  @Roles(roles.stocks.products.findall.name)
  @ApiDocMethodPaginated({
    description: roles.stocks.products.findall.description,
    responseModel: IProductsDataDTO,
  })
  async findAll(@Query() query: IOffsetPagination) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @Roles(roles.stocks.products.findbyid.name)
  @ApiDocMethodGet({
    description: roles.stocks.products.findbyid.description,
    responseModel: IProductsDataDTO,
  })
  async findById(@Param() params: IProductsFindByIdDTO) {
    return await this.productsService.findById(params.id);
  }
}
