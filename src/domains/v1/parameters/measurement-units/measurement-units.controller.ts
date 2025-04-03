import { ApiDocMethodPaginated } from '@/decorators/swagger/api-doc-method-paginated.decorator';
import { ApiDocMethodGet } from '@/decorators/swagger/api-doc-method-get.decorator';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { Controller, UseGuards, Param, Query, Get } from '@nestjs/common';
import { AuthenticationGuard } from '@/guards/auth/authentication.guard';
import { AuthorizationGuard } from '@/guards/auth/authorization.guard';
import { roles } from '@/configs/mapping-roles/index.roles';
import { Roles } from '@/decorators/roles/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

import { MeasurementUnitsService } from './measurement-units.service';
import { IMeasurementUnitsFindByIdDTO } from './dto/param/model.dto';
import { IMeasurementUnitsDataDTO } from './dto/get/model';

@Controller('v1/measurement-units')
@ApiTags('MeasurementUnits')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class MeasurementUnitsController {
  constructor(private readonly measurementUnitsService: MeasurementUnitsService) {}

  @Get()
  @Roles(roles.parameters.measurementUnits.findall.name)
  @ApiDocMethodPaginated({
    description: roles.parameters.measurementUnits.findall.description,
    responseModel: IMeasurementUnitsDataDTO,
  })
  async findAll(@Query() query: IOffsetPagination) {
    return this.measurementUnitsService.findAll(query);
  }

  @Get(':id')
  @Roles(roles.parameters.measurementUnits.findbyid.name)
  @ApiDocMethodGet({
    description: roles.parameters.measurementUnits.findbyid.description,
    responseModel: IMeasurementUnitsDataDTO,
  })
  async findById(@Param() params: IMeasurementUnitsFindByIdDTO) {
    return await this.measurementUnitsService.findById(params.id);
  }
}
