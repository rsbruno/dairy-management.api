import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { ApiTags } from '@nestjs/swagger';
import { ITenantsCreateDto } from './dto/body/model.dto';
import { ApiDocMethodPost } from '@/decorators/swagger/api-doc-method-post.decorator';
import { ApiDocMethodPaginated } from '@/decorators/swagger/api-doc-method-paginated.decorator';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { ApiDocMethodGet } from '@/decorators/swagger/api-doc-method-get.decorator';
import { ITenantsGetByIdDto } from './dto/get/model.dto';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get()
  @ApiDocMethodPaginated({
    description: '',
    responseModel: ITenantsCreateDto,
  })
  async findAll(@Query() query: IOffsetPagination) {
    return this.tenantsService.findAll(query);
  }

  @Get(':id')
  @ApiDocMethodGet({
    description: '',
    responseModel: ITenantsCreateDto,
  })
  async findById(@Param() params: ITenantsGetByIdDto) {
    return this.tenantsService.findById(params.id);
  }

  @Post()
  @ApiDocMethodPost({
    description: '',
    responseModel: ITenantsCreateDto,
  })
  create(@Body() createTenantDto: ITenantsCreateDto) {
    return this.tenantsService.create(createTenantDto);
  }
}
