import { ApiDocMethodPaginated } from '@/decorators/swagger/api-doc-method-paginated.decorator';
import { Controller, UseGuards, Param, Query, Body, Post, Get } from '@nestjs/common';
import { ApiDocMethodPost } from '@/decorators/swagger/api-doc-method-post.decorator';
import { ApiDocMethodGet } from '@/decorators/swagger/api-doc-method-get.decorator';
import { AuthenticationGuard } from '@/guards/auth/authentication.guard';
import { AuthorizationGuard } from '@/guards/auth/authorization.guard';
import { roles } from '@/configs/mapping-roles/index.roles';
import { Roles } from '@/decorators/roles/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

import { ICostCenterFindByIdDTO, ICostCenterFindAll } from './dto/param/model.dto';
import { ICostCenterCreateDTO } from './dto/body/model.dto';
import { CostCenterService } from './cost-center.service';
import { ICostCenterDataDTO } from './dto/get/model';

@ApiTags('CostCenter')
@Controller('v1/cost-center')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class CostCenterController {
  constructor(private readonly costCenterService: CostCenterService) {}

  @Post()
  @Roles(roles.parameters.costCenter.create.name)
  @ApiDocMethodPost({
    description: roles.parameters.costCenter.create.description,
    responseModel: ICostCenterDataDTO,
  })
  async create(@Body() costCenterCreateDto: ICostCenterCreateDTO) {
    return await this.costCenterService.create(costCenterCreateDto);
  }

  @Get()
  @Roles(roles.parameters.costCenter.findall.name)
  @ApiDocMethodPaginated({
    description: roles.parameters.costCenter.findall.description,
    responseModel: ICostCenterDataDTO,
  })
  async findAll(@Query() query: ICostCenterFindAll) {
    return this.costCenterService.findAll(query);
  }

  @Get(':id')
  @Roles(roles.parameters.costCenter.findbyid.name)
  @ApiDocMethodGet({
    description: roles.parameters.costCenter.findbyid.description,
    responseModel: ICostCenterDataDTO,
  })
  async findById(@Param() params: ICostCenterFindByIdDTO) {
    return await this.costCenterService.findById(params.id);
  }
}
