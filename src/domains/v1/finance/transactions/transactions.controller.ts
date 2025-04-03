import { ApiDocMethodPaginated } from '@/decorators/swagger/api-doc-method-paginated.decorator';
import { ApiDocMethodPost } from '@/decorators/swagger/api-doc-method-post.decorator';
import { Controller, UseGuards, Query, Body, Post, Get } from '@nestjs/common';
import { AuthenticationGuard } from '@/guards/auth/authentication.guard';
import { AuthorizationGuard } from '@/guards/auth/authorization.guard';
import { roles } from '@/configs/mapping-roles/index.roles';
import { Roles } from '@/decorators/roles/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

import { ITransactionsFindAllDTO } from './dto/param/model.dto';
import { ITransactionsCreateDTO } from './dto/body/model.dto';
import { TransactionsService } from './transactions.service';
import { ITransactionDataDTO } from './dto/get/model';

@ApiTags('Transactions')
@Controller('v1/transactions')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @Roles(roles.finance.transactions.create.name)
  @ApiDocMethodPost({
    description: roles.finance.transactions.create.description,
    responseModel: ITransactionDataDTO,
  })
  async create(@Body() transactionsCreateDTO: ITransactionsCreateDTO) {
    return await this.transactionsService.create(transactionsCreateDTO);
  }

  @Get()
  @Roles(roles.finance.transactions['findall-by-product'].name)
  @ApiDocMethodPaginated({
    description: roles.finance.transactions['findall-by-product'].description,
    responseModel: ITransactionDataDTO,
  })
  async findById(@Query() query: ITransactionsFindAllDTO) {
    return await this.transactionsService.findAll(query);
  }
}
