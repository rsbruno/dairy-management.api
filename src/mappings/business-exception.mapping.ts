import { HttpStatus } from '@nestjs/common';

export const businessException = {
  ATN100: { message: 'usuário sem acesso ao cliente!', statusCode: HttpStatus.FORBIDDEN },
};
