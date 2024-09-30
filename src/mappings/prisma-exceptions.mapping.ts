import { commonExceptions } from './common-exceptions.mapping';

export const prismaExceptions = {
  code: {
    P1001: 'houveram problemas ao acessar os dados solicitados!',
    P2025: 'os recursos solicitados não foram encontrados, ou não puderam ser associados!',
    P2014: 'os dados inserido já podem ter sido cadastrados ou violam regras de relacionamento!',
    P2032: 'não foi possível buscar os dados, solicite suporte!',
    P2002: 'os dados inserido já podem ter sido cadastrados!',
    P2018: 'os registros conectados necessários não foram encontrados!',
    default: 'erro desconhecido ao solicitar os dados!',
    'No Tenants found': commonExceptions.code[401],
  },
};
