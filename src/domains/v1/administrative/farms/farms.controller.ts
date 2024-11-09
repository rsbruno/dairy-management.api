import { ApiDocMethodPaginated } from '@/decorators/swagger/api-doc-method-paginated.decorator';
import { ApiDocMethodGet } from '@/decorators/swagger/api-doc-method-get.decorator';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '@/guards/auth/authentication.guard';
import { AuthorizationGuard } from '@/guards/auth/authorization.guard';
import { roles } from '@/configs/mapping-roles/index.roles';
import { Roles } from '@/decorators/roles/roles.decorator';
import { IFarmsFindByIdDto } from './dto/param/model.dto';
import { IFarmsGetDataDto } from './dto/get/model.dto';
import { FarmsService } from './farms.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('v1/farms')
@ApiTags('Farms')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Get()
  @Roles(roles.administrative.farms.findall.name)
  @ApiDocMethodPaginated({
    description: roles.administrative.farms.findall.description,
    responseModel: IFarmsGetDataDto,
  })
  async findAll(@Query() query: IOffsetPagination) {
    return this.farmsService.findAll(query);
  }

  @Get(':id')
  @Roles(roles.administrative.farms.findbyid.name)
  @ApiDocMethodGet({
    description: roles.administrative.farms.findbyid.description,
    responseModel: IFarmsGetDataDto,
  })
  findById(@Param() params: IFarmsFindByIdDto) {
    return this.farmsService.findById(params.id);
  }
}
