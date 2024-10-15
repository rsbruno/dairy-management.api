import { ApiDocMethodPaginated } from '@/decorators/swagger/api-doc-method-paginated.decorator';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiDocMethodPost } from '@/decorators/swagger/api-doc-method-post.decorator';
import { ApiDocMethodGet } from '@/decorators/swagger/api-doc-method-get.decorator';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { AuthenticationGuard } from '@/guards/auth/authentication.guard';
import { AuthorizationGuard } from '@/guards/auth/authorization.guard';
import { IProductsFindByIdDto } from './dto/param/model.dto';
import { roles } from '@/configs/mapping-roles/index.roles';
import { Roles } from '@/decorators/roles/roles.decorator';
import { IProductsCreateDto } from './dto/body/model.dto';
import { IProductsGetDataDto } from './dto/get/model';
import { ProductsService } from './products.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('v1/products')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class ProductsController {
  constructor(private readonly costCenterService: ProductsService) {}

  @Get()
  @Roles(roles.administrative.products.findall.name)
  @ApiDocMethodPaginated({
    description: roles.administrative.products.findall.description,
    responseModel: IProductsGetDataDto,
  })
  async findAll(@Query() query: IOffsetPagination) {
    return this.costCenterService.findAll(query);
  }

  @Get(':id')
  @Roles(roles.administrative.products.findbyid.name)
  @ApiDocMethodGet({
    description: roles.administrative.products.findbyid.description,
    responseModel: IProductsGetDataDto,
  })
  async findById(@Param() params: IProductsFindByIdDto) {
    return await this.costCenterService.findById(params.id);
  }

  @Post()
  @Roles(roles.administrative.products.create.name)
  @ApiDocMethodPost({
    responseModel: IProductsCreateDto,
    description: roles.administrative.products.create.description,
  })
  async create(@Body() costCenterCreateDto: IProductsCreateDto) {
    return await this.costCenterService.create(costCenterCreateDto);
  }
}
