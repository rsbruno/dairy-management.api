import { HttpStatus } from '@nestjs/common';

export const commonExceptions = {
  validator: {
    isArray: {
      min: {
        one: 'necessário no mínimo 1 entidade associada!',
      },
    },
    isString: 'o campo deve ser uma string!',
    isNumber: 'o campo deve ser um número!',
    isNotEmpty: 'o campo é obrigatório!',
    isEmail: 'este email não é válido!',
  },
  param: {
    isMinValue: {
      '1': 'o valor mínimo é 1!',
    },
    isString: 'o parâmetro deve ser uma string!',
    isNotCNPJ: 'o CPNJ fornecido não é válido!',
    isNumber: 'o parâmetro deve ser um número!',
    isNotEmpty: 'o parâmetro é obrigatório!',
  },
  http: {
    internal_server_error: 'erro desconhecido nos dados obtidos!',
    typeError: 'ocorreu um erro de execução!',
    unauthorized: 'usuário não autenticado!',
    forbidden: 'usuário sem as permissões!',
  },
  code: {
    [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: 'o payload fornecido não é do tipo esperado!',
    [HttpStatus.UNAUTHORIZED]: 'usuário não autenticado!',
  },
};
