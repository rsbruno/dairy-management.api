export const roles = {
  identity: {
    persons: {
      findall: {
        name: 'IDT-PERSON-FIND_ALL',
        description: 'Lista todas as pessoas',
      },
      findbyid: {
        name: 'IDT-PERSON-FIND_BY_ID',
        description: 'Busca uma pessoa pelo id',
      },
      create: {
        name: 'IDT-PERSON-CREATE',
        description: 'Adiciona uma pessoa',
      },
    },
  },
  administrative: {
    farms: {
      findall: {
        name: 'ADM-FARMS-FIND_ALL',
        description: 'Lista todas as fazendas',
      },
      findbyid: {
        name: 'ADM-FARMS-FIND_BY_ID',
        description: 'Busca uma fazenda pelo id',
      },
    },
    products: {
      findall: {
        name: 'ADM-PRODUCTS-FIND_ALL',
        description: 'Lista todos os produtos',
      },
      findbyid: {
        name: 'ADM-PRODUCTS-FIND_BY_ID',
        description: 'Busca um produto pelo id',
      },
      create: {
        name: 'ADM-PRODUCTS-CREATE',
        description: 'Adiciona um produto',
      },
    },
  },
  finance: {
    costcenter: {
      findall: {
        name: 'ADM-COST_CENTER-FIND_ALL',
        description: 'Lista todos os centros de custo',
      },
      findbyid: {
        name: 'ADM-COST_CENTER-FIND_BY_ID',
        description: 'Busca um centro pelo id',
      },
      create: {
        name: 'ADM-COST_CENTER-CREATE',
        description: 'Adiciona um centro de custo',
      },
    },
  },
};
