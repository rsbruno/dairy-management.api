import { ApiDocMethodPaginated } from '@/decorators/swagger/api-doc-method-paginated.decorator';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiDocMethodPost } from '@/decorators/swagger/api-doc-method-post.decorator';
import { ApiDocMethodGet } from '@/decorators/swagger/api-doc-method-get.decorator';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { AuthenticationGuard } from '@/guards/auth/authentication.guard';
import { AuthorizationGuard } from '@/guards/auth/authorization.guard';
import { ICostCenterFindByIdDto } from './dto/param/model.dto';
import { roles } from '@/configs/mapping-roles/index.roles';
import { ICostCenterCreateDto } from './dto/body/model.dto';
import { Roles } from '@/decorators/roles/roles.decorator';
import { CostCenterService } from './cost-center.service';
import { ICostCenterGetDataDto } from './dto/get/model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CostCenter')
@Controller('v1/cost-center')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class CostCenterController {
  constructor(private readonly costCenterService: CostCenterService) {}

  @Get()
  @Roles(roles.finance.costcenter.findall.name)
  @ApiDocMethodPaginated({
    description: roles.finance.costcenter.findall.description,
    responseModel: ICostCenterGetDataDto,
  })
  async findAll(@Query() query: IOffsetPagination) {
    return this.costCenterService.findAll(query);
  }

  @Get(':id')
  @Roles(roles.finance.costcenter.findbyid.name)
  @ApiDocMethodGet({
    description: roles.finance.costcenter.findbyid.description,
    responseModel: ICostCenterGetDataDto,
  })
  async findById(@Param() params: ICostCenterFindByIdDto) {
    return await this.costCenterService.findById(params.id);
  }

  @Post()
  @Roles(roles.finance.costcenter.create.name)
  @ApiDocMethodPost({
    description: roles.finance.costcenter.create.description,
    responseModel: ICostCenterCreateDto,
  })
  async create(@Body() costCenterCreateDto: ICostCenterCreateDto) {
    return await this.costCenterService.create(costCenterCreateDto);
  }
}
