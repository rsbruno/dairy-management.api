import { HttpStatus } from '@nestjs/common';

export const commonExceptions = {
  validator: {
    isNotEmpty: 'o campo é obrigatório!',
    isEmail: 'este email não é válido!',
    isNumber: 'o campo deve ser um número!',
    isString: 'o campo deve ser uma string!',
    isArray: {
      min: {
        one: 'necessário no mínimo 1 entidade associada!',
      },
    },
  },
  param: {
    isNotEmpty: 'o parâmetro é obrigatório!',
    isNotCNPJ: 'o CPNJ fornecido não é válido!',
    isNumber: 'o parâmetro deve ser um número!',
    isString: 'o parâmetro deve ser uma string!',
    isMinValue: {
      '1': 'o valor mínimo é 1!',
    },
  },
  http: {
    unauthorized: 'usuário não autenticado!',
    forbidden: 'usuário sem as permissões!',
    internal_server_error: 'erro desconhecido nos dados obtidos!',
    typeError: 'ocorreu um erro de execução!',
  },
  code: {
    [HttpStatus.UNAUTHORIZED]: 'usuário não autenticado!',
    [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: 'o payload fornecido não é do tipo esperado!',
  },
};
