export const roles = {
  parameters: {
    costCenter: {
      findall: {
        description: 'Lista todos os centros de custo',
        name: 'PRM-COST_CENTER-FIND_ALL',
      },
      findbyid: {
        description: 'Busca um centro pelo id',
        name: 'PRM-COST_CENTER-FIND_BY_ID',
      },
      create: {
        description: 'Adiciona um centro de custo',
        name: 'PRM-COST_CENTER-CREATE',
      },
    },
    measurementUnits: {
      findbyid: {
        description: 'Busca uma unidade de medida pelo id',
        name: 'PRM-MEASUREMENT_UNITS-FIND_BY_ID',
      },
      findall: {
        description: 'Lista todas as unidades de medida',
        name: 'PRM-MEASUREMENT_UNITS-FIND_ALL',
      },
    },
    transactionTypes: {
      findbyid: {
        description: 'Busca um tipo de transação pelo id',
        name: 'PRM-TRANSACTION_TYPES-FIND_BY_ID',
      },
      findall: {
        description: 'Lista todos os tipos de transações',
        name: 'PRM-TRANSACTION_TYPES-FIND_ALL',
      },
    },
  },
  finance: {
    balance: {
      costCenter: {
        description: 'Lista o balanço de gastos por centro de custos da fazenda',
        name: 'FNC-BALANCE-COST_CENTER',
      },
      grossIncome: {
        description: 'Lista o balanço de receitas da fazenda',
        name: 'FNC-BALANCE-GROSS_INCOME',
      },
      grossExpense: {
        description: 'Lista o balanço de gastos da fazenda',
        name: 'FNC-BALANCE-GROSS_EXPENSE',
      },
    },
    transactions: {
      findAll: {
        description: 'Lista todas as transações',
        name: 'FNC-TRANSACTION-FIND_ALL',
      },
      create: {
        description: 'Adiciona uma transação',
        name: 'FNC-TRANSACTION-CREATE',
      },
    },
  },
  stocks: {
    products: {
      findbyid: {
        description: 'Busca um produto pelo id',
        name: 'STK-PRODUCTS-FIND_BY_ID',
      },
      findall: {
        description: 'Lista todos os produtos',
        name: 'STK-PRODUCTS-FIND_ALL',
      },
      create: {
        description: 'Adiciona um produto',
        name: 'STK-PRODUCTS-CREATE',
      },
    },
  },
  identity: {
    persons: {
      findbyid: {
        description: 'Busca uma pessoa pelo id',
        name: 'IDT-PERSON-FIND_BY_ID',
      },
      findall: {
        description: 'Lista todas as pessoas',
        name: 'IDT-PERSON-FIND_ALL',
      },
      create: {
        description: 'Adiciona uma pessoa',
        name: 'IDT-PERSON-CREATE',
      },
    },
  },
  administrative: {
    farms: {
      findbyid: {
        description: 'Busca uma fazenda pelo id',
        name: 'ADM-FARMS-FIND_BY_ID',
      },
      findall: {
        description: 'Lista todas as fazendas',
        name: 'ADM-FARMS-FIND_ALL',
      },
    },
  },
};
