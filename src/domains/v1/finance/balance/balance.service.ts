import { TransactionTypesEnum } from '@/enums/transactions-types.enum';
import { Injectable } from '@nestjs/common';
import { groupBy } from '@/utils/group-by';

import { ICostCenterBalanceByCostCenterId, IBalanceDataByTypeDTO } from './dto/params/model.dto';
import { ITransactionSelectDTO } from '../transactions/dto/get/model';
import { BalanceRepository } from './balance.repository';
import { IBalanceDataDTO } from './dto/get/model.dto';

@Injectable()
export class BalanceService {
  constructor(private readonly balanceRepository: BalanceRepository) {}

  async costCenterBalance(query: ICostCenterBalanceByCostCenterId) {
    const costCenters = await this.balanceRepository.getAllNestedCostCenterIds(query.costCenterId);
    const transactionsSelect = await this.balanceRepository.costCenterBalance(costCenters, query);
    return this.mountResponseBalance(transactionsSelect);
  }

  async grossExpense(query: IBalanceDataByTypeDTO) {
    const transactionsSelect = await this.balanceRepository.transactionsByType({
      code: [TransactionTypesEnum.EXPENSE],
      ...query,
    });
    return this.mountResponseBalance(transactionsSelect);
  }

  async grossIncome(query: IBalanceDataByTypeDTO) {
    const transactionsSelect = await this.balanceRepository.transactionsByType({
      code: [TransactionTypesEnum.INCOME],
      ...query,
    });
    return this.mountResponseBalance(transactionsSelect);
  }

  private mountBalanceNumbers(transactions: ITransactionSelectDTO[]) {
    return transactions.reduce(
      (acc, { costCenter, unitPrice, quantity }) => ({
        totalQuantity: acc.totalQuantity + quantity,
        total: acc.total + quantity * unitPrice,
        costCenter,
      }),
      {
        totalQuantity: 0,
        costCenter: null,
        total: 0,
      },
    );
  }

  private mountResponseBalance(transactionsSelect: Array<ITransactionSelectDTO>) {
    const groupedTransactions = groupBy(transactionsSelect, transaction => transaction.costCenterId);
    const transactions = Array.from(groupedTransactions.values()).map(transactions =>
      this.mountBalanceNumbers(transactions),
    );
    return IBalanceDataDTO.transform(transactions);
  }
}
