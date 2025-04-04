import { ApiDocMethodGet } from '@/decorators/swagger/api-doc-method-get.decorator';
import { AuthenticationGuard } from '@/guards/auth/authentication.guard';
import { AuthorizationGuard } from '@/guards/auth/authorization.guard';
import { Controller, UseGuards, Query, Get } from '@nestjs/common';
import { roles } from '@/configs/mapping-roles/index.roles';
import { Roles } from '@/decorators/roles/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

import { ICostCenterBalanceByCostCenterId, IBalanceDataByTypeDTO } from './dto/params/model.dto';
import { IBalanceDataDTO } from './dto/get/model.dto';
import { BalanceService } from './balance.service';

@Controller('v1/balance')
@ApiTags('Balance')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get('cost-center')
  @Roles(roles.finance.balance.costCenter.name)
  @ApiDocMethodGet({
    description: roles.finance.balance.costCenter.description,
    responseModel: IBalanceDataDTO,
  })
  costCenterBalance(@Query() query: ICostCenterBalanceByCostCenterId) {
    return this.balanceService.costCenterBalance(query);
  }

  @Get('gross-expense')
  @Roles(roles.finance.balance.grossExpense.name)
  @ApiDocMethodGet({
    description: roles.finance.balance.grossExpense.description,
    responseModel: IBalanceDataDTO,
  })
  grossExpense(@Query() query: IBalanceDataByTypeDTO) {
    return this.balanceService.grossExpense(query);
  }

  @Get('gross-income')
  @Roles(roles.finance.balance.grossIncome.name)
  @ApiDocMethodGet({
    description: roles.finance.balance.grossIncome.description,
    responseModel: IBalanceDataDTO,
  })
  grossIncome(@Query() query: IBalanceDataByTypeDTO) {
    return this.balanceService.grossIncome(query);
  }
}
