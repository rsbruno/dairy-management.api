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
  },
};
