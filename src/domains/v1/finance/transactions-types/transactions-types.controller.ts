import { ApiDocMethodPaginated } from '@/decorators/swagger/api-doc-method-paginated.decorator';
import { ApiDocMethodGet } from '@/decorators/swagger/api-doc-method-get.decorator';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '@/guards/auth/authentication.guard';
import { TransactionsTypesService } from './transactions-types.service';
import { AuthorizationGuard } from '@/guards/auth/authorization.guard';
import { ITransactionsTypesFindByIdDto } from './dto/param/model.dto';
import { ITransactionsTypesGetDataDto } from './dto/get/model';
import { roles } from '@/configs/mapping-roles/index.roles';
import { Roles } from '@/decorators/roles/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TransactionsTypes')
@Controller('v1/transactions-types')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class TransactionsTypesController {
  constructor(private readonly transactionsTypesService: TransactionsTypesService) {}

  @Get()
  @Roles(roles.finance.transactionTypes.findall.name)
  @ApiDocMethodPaginated({
    description: roles.finance.transactionTypes.findall.description,
    responseModel: ITransactionsTypesGetDataDto,
  })
  async findAll(@Query() query: IOffsetPagination) {
    return await this.transactionsTypesService.findAll(query);
  }

  @Get(':id')
  @Roles(roles.finance.transactionTypes.findbyid.name)
  @ApiDocMethodGet({
    description: roles.finance.transactionTypes.findbyid.description,
    responseModel: ITransactionsTypesGetDataDto,
  })
  async findById(@Param() params: ITransactionsTypesFindByIdDto) {
    return await this.transactionsTypesService.findById(params.id);
  }
}
