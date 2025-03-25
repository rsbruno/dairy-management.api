import { ApiDocMethodPaginated } from '@/decorators/swagger/api-doc-method-paginated.decorator';
import { ApiDocMethodGet } from '@/decorators/swagger/api-doc-method-get.decorator';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '@/guards/auth/authentication.guard';
import { AuthorizationGuard } from '@/guards/auth/authorization.guard';
import { MeasurementUnitsService } from './measurement-units.service';
import { IMeasurementUnitsFindByIdDto } from './dto/param/model.dto';
import { IMeasurementUnitsResponseDto } from './dto/get/model';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@/decorators/roles/roles.decorator';
import { roles } from '@/configs/mapping-roles/index.roles';

@Controller('v1/measurement-units')
@ApiTags('MeasurementUnits')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class MeasurementUnitsController {
  constructor(private readonly measurementUnitsService: MeasurementUnitsService) {}

  @Get()
  @Roles(roles.parameters.measurementUnits.findall.name)
  @ApiDocMethodPaginated({
    description: roles.parameters.measurementUnits.findall.description,
    responseModel: IMeasurementUnitsResponseDto,
  })
  async findAll(@Query() query: IOffsetPagination) {
    return this.measurementUnitsService.findAll(query);
  }

  @Get(':id')
  @Roles(roles.parameters.measurementUnits.findbyid.name)
  @ApiDocMethodGet({
    description: roles.parameters.measurementUnits.findbyid.description,
    responseModel: IMeasurementUnitsResponseDto,
  })
  async findById(@Param() params: IMeasurementUnitsFindByIdDto) {
    return await this.measurementUnitsService.findById(params.id);
  }
}
