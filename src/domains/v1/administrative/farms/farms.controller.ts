import { ApiDocMethodPaginated } from '@/decorators/swagger/api-doc-method-paginated.decorator';
import { ApiDocMethodGet } from '@/decorators/swagger/api-doc-method-get.decorator';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { Controller, UseGuards, Param, Query, Get } from '@nestjs/common';
import { AuthenticationGuard } from '@/guards/auth/authentication.guard';
import { AuthorizationGuard } from '@/guards/auth/authorization.guard';
import { roles } from '@/configs/mapping-roles/index.roles';
import { Roles } from '@/decorators/roles/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

import { IFarmsFindByIdDTO } from './dto/param/model.dto';
import { IFarmsDataDTO } from './dto/get/model.dto';
import { FarmsService } from './farms.service';

@Controller('v1/farms')
@ApiTags('Farms')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Get()
  @Roles(roles.administrative.farms.findall.name)
  @ApiDocMethodPaginated({
    description: roles.administrative.farms.findall.description,
    responseModel: IFarmsDataDTO,
  })
  async findAll(@Query() query: IOffsetPagination) {
    return this.farmsService.findAll(query);
  }

  @Get(':id')
  @Roles(roles.administrative.farms.findbyid.name)
  @ApiDocMethodGet({
    description: roles.administrative.farms.findbyid.description,
    responseModel: IFarmsDataDTO,
  })
  async findById(@Param() params: IFarmsFindByIdDTO) {
    return this.farmsService.findById(params.id);
  }
}
