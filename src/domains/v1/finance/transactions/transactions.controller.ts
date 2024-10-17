import { ApiDocMethodPaginated } from '@/decorators/swagger/api-doc-method-paginated.decorator';
import { ApiDocMethodPost } from '@/decorators/swagger/api-doc-method-post.decorator';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { AuthenticationGuard } from '@/guards/auth/authentication.guard';
import { AuthorizationGuard } from '@/guards/auth/authorization.guard';
import { ITransactionsFindByIdDto } from './dto/param/model.dto';
import { ITransactionsCreateDto } from './dto/body/model.dto';
import { TransactionsService } from './transactions.service';
import { roles } from '@/configs/mapping-roles/index.roles';
import { Roles } from '@/decorators/roles/roles.decorator';
import { ITransactionGetDataDto } from './dto/get/model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('v1/transactions')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('/product/:id')
  @Roles(roles.finance.transactions['findall-by-product'].name)
  @ApiDocMethodPaginated({
    description: roles.finance.transactions['findall-by-product'].description,
    responseModel: ITransactionGetDataDto,
  })
  async findById(@Query() pagination: IOffsetPagination, @Param() params: ITransactionsFindByIdDto) {
    return await this.transactionsService.findAll(pagination, params.id);
  }

  @Post()
  @Roles(
    roles.finance.transactions.create.name,
    roles.administrative.products.findbyid.name,
    roles.finance.transactionTypes.findbyid.name,
    roles.administrative.products['update-values'].name,
  )
  @ApiDocMethodPost({
    responseModel: ITransactionsCreateDto,
    description: roles.finance.transactions.create.description,
  })
  async create(@Body() costCenterCreateDto: ITransactionsCreateDto) {
    return await this.transactionsService.create(costCenterCreateDto);
  }
}
