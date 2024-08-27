export const system = {
  admin: {
    acquisition: {
      clients: {
        manage: {
          name: 'manage-clients',
          description: 'Permite adicionar novos clientes no sistema',
        },
      },
    },
  },
  common: {
    acquisition: {
      clients: {
        findall: {
          name: 'ACQ-CLIENTS-FIND_ALL',
          description: 'Adiciona um novo cliente',
        },
        create: {
          name: 'ACQ-CLIENTS-CREATE',
          description: 'Adiciona um novo cliente',
        },
      },
      clinics: {
        findall: {
          name: 'ACQ-CLINICS-FIND_ALL',
          description: 'Lista todas as clínicas criadas',
        },
        findbyid: {
          name: 'ACQ-CLINICS-FIND_BY_ID',
          description: 'Busca uma clínica pelo id',
        },
        create: {
          name: 'ACQ-CLINICS-CREATE',
          description: 'Adiciona uma nova clínica',
        },
        update: {
          name: 'ACQ-CLINICS-UPDATE',
          description: 'Atualiza as inforações de uma clínica',
        },
        delete: {
          name: 'ACQ-CLINICS-DELETE',
          description: 'Remove uma clínica',
        },
      },
    },
    administrative: {
      roles: {
        findall: {
          name: 'ADM-ROLES-FIND_ALL',
          description: 'Lista todas as roles criadas',
        },
        findbyname: {
          name: 'ADM-ROLES-FIND_BY_NAME',
          description: 'Busca um role pelo nome',
        },
        findbyid: {
          name: 'ADM-ROLES-FIND_BY_ID',
          description: 'Busca um role pelo id',
        },
        create: {
          name: 'ADM-ROLES-CREATE',
          description: 'Adiciona uma nova role',
        },
        update: {
          name: 'ADM-ROLES-UPDATE',
          description: 'Atualiza as informações de uma role',
        },
        delete: {
          name: 'ADM-ROLES-DELETE',
          description: 'Remove uma role',
        },
      },
      groups: {
        findallgroups: {
          name: 'ADM-GROUPS-FIND_ALL',
          description: 'Lista todos os grupos criados',
        },
        findbyid: {
          name: 'ADM-GROUPS-FIND_BY_ID',
          description: 'Busca um grupo pelo id',
        },
        findallsubgroups: {
          name: 'ADM-GROUPS-FIND_ALL_SUB',
          description: 'Lista todos os subgrupos criados',
        },
        getroles: {
          name: 'ADM-GROUPS-GET_ROLES',
          description: 'Lista todas as roles de um grupo',
        },
        creategroup: {
          name: 'ADM-GROUPS-CREATE_GROUP',
          description: 'Adiciona o super grupo inicial no sistema',
        },
        createsubgroup: {
          name: 'ADM-GROUPS-CREATE_SUB_GROUP',
          description: 'Adiciona um novo subgrupo',
        },
        assignroles: {
          name: 'ADM-GROUPS-ASSIGN_ROLE',
          description: 'Adiciona roles á um grupo',
        },
        unassignroles: {
          name: 'ADM-GROUPS-UNASSIGN_ROLE',
          description: 'Remove roles de um grupo',
        },
      },
      users: {
        findall: {
          name: 'ADM-GROUPS-FIND_ALL',
          description: 'Lista todos os usuários',
        },
        findbyid: {
          name: 'ADM-GROUPS-FIND_BY_ID',
          description: 'Busca um usuário pelo id',
        },
        findgroups: {
          name: 'ADM-GROUPS-FIND_GROUPS',
          description: 'Lista todos os grupos associados ao usuário',
        },
        findroles: {
          name: 'ADM-GROUPS-FIND_ROLES',
          description: 'Lista todos as roles associadas ao usuário',
        },
        create: {
          name: 'ADM-GROUPS-CREATE',
          description: 'Adiciona um novo usuário',
        },
        update: {
          name: 'ADM-GROUPS-UPDATE',
          description: 'Atualiza as informações de um usuário',
        },
        disable: {
          name: 'ADM-GROUPS-DISABLE',
          description: 'Bloqueia/Libera o acesso de um usuário',
        },
        assignrole: {
          name: 'ADM-GROUPS-ASSIGN_ROLE',
          description: 'Associa novos grupos ao usuário',
        },
        unassignrole: {
          name: 'ADM-GROUPS-UNASSIGN_ROLE',
          description: 'Remove grupos do usuário',
        },
      },
      tenants: {
        findall: {
          name: 'ADM-TENANTS-FIND_ALL',
          description: 'Lista todos os tenants criados',
        },
        findbyid: {
          name: 'ADM-TENANTS-FIND_BY_ID',
          description: 'Busca um tenant pelo id',
        },
        create: {
          name: 'ADM-TENANTS-CREATE',
          description: 'Adiciona um novo tenant',
        },
        delete: {
          name: 'ADM-TENANTS-DELETE',
          description: 'Remove um tenant',
        },
      },
    },
  },
};
