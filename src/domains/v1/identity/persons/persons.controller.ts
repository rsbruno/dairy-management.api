import { ApiDocMethodPaginated } from '@/decorators/swagger/api-doc-method-paginated.decorator';
import { ApiDocMethodPost } from '@/decorators/swagger/api-doc-method-post.decorator';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiDocMethodGet } from '@/decorators/swagger/api-doc-method-get.decorator';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { AuthenticationGuard } from '@/guards/auth/authentication.guard';
import { AuthorizationGuard } from '@/guards/auth/authorization.guard';
import { roles } from '@/configs/mapping-roles/index.roles';
import { IPersonsFindByIdDto } from './dto/param/model.dto';
import { Roles } from '@/decorators/roles/roles.decorator';
import { IPersonsCreateDto } from './dto/body/model.dto';
import { IPersonsGetDataDto } from './dto/get/model.dto';
import { PersonsService } from './persons.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Persons')
@Controller('v1/persons')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Get()
  @Roles(roles.identity.persons.findall.name)
  @ApiDocMethodPaginated({
    description: roles.identity.persons.findall.description,
    responseModel: IPersonsGetDataDto,
  })
  async findAll(@Query() query: IOffsetPagination) {
    return this.personsService.findAll(query);
  }

  @Get(':id')
  @Roles(roles.identity.persons.findbyid.name)
  @ApiDocMethodGet({
    description: roles.identity.persons.findbyid.description,
    responseModel: IPersonsGetDataDto,
  })
  async findById(@Param() params: IPersonsFindByIdDto) {
    return this.personsService.findById(params.id);
  }

  @Post()
  @Roles(roles.identity.persons.create.name)
  @ApiDocMethodPost({
    description: roles.identity.persons.create.description,
    responseModel: IPersonsCreateDto,
  })
  async create(@Body() createPersonDto: IPersonsCreateDto) {
    return this.personsService.create(createPersonDto);
  }
}
