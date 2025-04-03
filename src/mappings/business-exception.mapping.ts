import { HttpStatus } from '@nestjs/common';

export const businessException = {
  'F-TRS-100': {
    message: 'em movimentações de saída a quantidade não pode ser menor que o valor disponível em estoque',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  'F-TRS-101': {
    message: 'em movimentações de entrada o valor unitário deve ser definido',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  'F-TRS-102': {
    message: 'o tipo de transação não existe',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  ATN100: { message: 'usuário sem acesso ao cliente!', statusCode: HttpStatus.FORBIDDEN },
};
