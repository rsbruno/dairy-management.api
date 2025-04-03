export const roles = {
  finance: {
    costcenter: {
      findall: {
        description: 'Lista todos os centros de custo',
        name: 'ADM-COST_CENTER-FIND_ALL',
      },
      findbyid: {
        description: 'Busca um centro pelo id',
        name: 'ADM-COST_CENTER-FIND_BY_ID',
      },
      create: {
        description: 'Adiciona um centro de custo',
        name: 'ADM-COST_CENTER-CREATE',
      },
    },
    transactionTypes: {
      findbyid: {
        description: 'Busca um tipo de transação pelo id',
        name: 'ADM-TRANSACTION_TYPES-FIND_BY_ID',
      },
      findall: {
        description: 'Lista todos os tipos de transações',
        name: 'ADM-TRANSACTION_TYPES-FIND_ALL',
      },
    },
    transactions: {
      'findall-by-product': {
        description: 'Lista todas as transações de um produto',
        name: 'ADM-TRANSACTION_PRODUCT-FIND_ALL',
      },
      create: {
        description: 'Adiciona uma transação',
        name: 'ADM-TRANSACTION-CREATE',
      },
    },
  },
  stocks: {
    products: {
      'update-values': {
        description: 'Atualiza os valores de um produto',
        name: 'STK-PRODUCTS-UPDATE_VALUES',
      },
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
  parameters: {
    measurementUnits: {
      findbyid: {
        description: 'Busca uma unidade de medida pelo id',
        name: 'ADM-MEASUREMENT_UNITS-FIND_BY_ID',
      },
      findall: {
        description: 'Lista todas as unidades de medida',
        name: 'ADM-MEASUREMENT_UNITS-FIND_ALL',
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
