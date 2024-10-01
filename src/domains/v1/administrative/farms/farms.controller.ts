import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { IFarmsCreateDto } from './dto/body/model.dto';
import { ApiDocMethodPost } from '@/decorators/swagger/api-doc-method-post.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ApiDocMethodPaginated } from '@/decorators/swagger/api-doc-method-paginated.decorator';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { ITenantsCreateDto } from '../tenants/dto/body/model.dto';
import { IFarmsGetDataDto } from './dto/get/model.dto';
import { ApiDocMethodGet } from '@/decorators/swagger/api-doc-method-get.decorator';
import { IFarmsFindByIdDto } from './dto/param/model.dto';

@Controller('farms')
@ApiTags('Farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  /* @Get()
  @ApiDocMethodPaginated({
    description: 'Lista todas as fazendas do usuário logado.',
    responseModel: IFarmsGetDataDto,
  })
  async findAll(@Query() query: IOffsetPagination) {
    return this.farmsService.findAll(query);
  }

  @Get(':id')
  @ApiDocMethodGet({
    description: 'Lista todas as fazendas do usuário logado.',
    responseModel: IFarmsGetDataDto,
  })
  findById(@Param() params: IFarmsFindByIdDto) {
    return this.farmsService.findById(params.id);
  } */

  @Post()
  @ApiDocMethodPost({
    description: 'Adiciona uma nova fazenda no sistema.',
    responseModel: IFarmsCreateDto,
    isPublic: true,
  })
  create(@Body() createFarmDto: IFarmsCreateDto) {
    return 'this.farmsService.create(createFarmDto)';
  }
}
