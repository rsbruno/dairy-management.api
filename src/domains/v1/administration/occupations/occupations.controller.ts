import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { OccupationsService } from './occupations.service';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { ApiDocMethodPaginated } from '@/decorators/swagger/api-doc-method-paginated.decorator';
import { IOccupationsGetDataDto } from './dto/get/model.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from '@/guards/auth/authentication.guard';
import { ApiDocMethodGet } from '@/decorators/swagger/api-doc-method-get.decorator';
import { IOccupationsFindByIdDto } from './dto/param/model.dto';

@ApiTags('Occupations')
@Controller('v1/occupations')
@UseGuards(AuthenticationGuard)
export class OccupationsController {
  constructor(private readonly occupationsService: OccupationsService) {}

  @Get()
  @ApiDocMethodPaginated({
    description: '',
    responseModel: IOccupationsGetDataDto,
  })
  async findAll(@Query() query: IOffsetPagination) {
    return await this.occupationsService.findAll(query);
  }

  @Get(":id")
  @ApiDocMethodGet({
    description: '',
    responseModel: IOccupationsGetDataDto,
  })
  async findById(@Param() params: IOccupationsFindByIdDto) {
    return await this.occupationsService.findById(params.id);
  }
}
