export enum TransactionTypesEnum {
  EXPENSE = 'expense',
  INCOME = 'income',
}

export const transactionsTypesEnum = {
  income: {
    code: TransactionTypesEnum.INCOME,
    name: 'Entrada',
  },
  expense: {
    code: TransactionTypesEnum.EXPENSE,
    name: 'Saída',
  },
};
