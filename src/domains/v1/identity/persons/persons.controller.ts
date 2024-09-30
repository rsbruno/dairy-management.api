import { ApiDocMethodPaginated } from '@/decorators/swagger/api-doc-method-paginated.decorator';
import { ApiDocMethodPost } from '@/decorators/swagger/api-doc-method-post.decorator';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiDocMethodGet } from '@/decorators/swagger/api-doc-method-get.decorator';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { AuthenticationGuard } from '@/guards/auth/authentication.guard';
import { IPersonsFindByIdDto } from './dto/param/model.dto';
import { IPersonsCreateDto } from './dto/body/model.dto';
import { IPersonsGetDataDto } from './dto/get/model.dto';
import { PersonsService } from './persons.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Persons')
@Controller('v1/persons')
@UseGuards(AuthenticationGuard)
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Get()
  @ApiDocMethodPaginated({
    description: 'Lista todos as pessoas cadastradas em uma fazenda',
    responseModel: IPersonsGetDataDto,
  })
  async findAll(@Query() query: IOffsetPagination) {
    return this.personsService.findAll(query);
  }

  @Get(':id')
  @ApiDocMethodGet({
    description: 'Busca uma pessoa pelo id',
    responseModel: IPersonsGetDataDto,
  })
  async findById(@Param() params: IPersonsFindByIdDto) {
    return this.personsService.findById(params.id);
  }

  @Post()
  @ApiDocMethodPost({
    description: 'Adiciona uma nova pessoa no sistema',
    responseModel: IPersonsCreateDto,
  })
  async create(@Body() createPersonDto: IPersonsCreateDto) {
    return this.personsService.create(createPersonDto);
  }
}
