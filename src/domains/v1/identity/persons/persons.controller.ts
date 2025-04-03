import { ApiDocMethodPaginated } from '@/decorators/swagger/api-doc-method-paginated.decorator';
import { ApiDocMethodGet } from '@/decorators/swagger/api-doc-method-get.decorator';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { Controller, UseGuards, Param, Query, Get } from '@nestjs/common';
import { AuthenticationGuard } from '@/guards/auth/authentication.guard';
import { AuthorizationGuard } from '@/guards/auth/authorization.guard';
import { roles } from '@/configs/mapping-roles/index.roles';
import { Roles } from '@/decorators/roles/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

import { IPersonsFindByIdDTO } from './dto/param/model.dto';
import { IPersonsDataDTO } from './dto/get/model.dto';
import { PersonsService } from './persons.service';

@ApiTags('Persons')
@Controller('v1/persons')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Get()
  @Roles(roles.identity.persons.findall.name)
  @ApiDocMethodPaginated({
    description: roles.identity.persons.findall.description,
    responseModel: IPersonsDataDTO,
  })
  async findAll(@Query() query: IOffsetPagination) {
    return this.personsService.findAll(query);
  }

  @Get(':id')
  @Roles(roles.identity.persons.findbyid.name)
  @ApiDocMethodGet({
    description: roles.identity.persons.findbyid.description,
    responseModel: IPersonsDataDTO,
  })
  async findById(@Param() params: IPersonsFindByIdDTO) {
    return this.personsService.findById(params.id);
  }
}
