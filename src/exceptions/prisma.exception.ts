import { HttpException, HttpStatus } from '@nestjs/common';

export class PrismaException extends HttpException {
  constructor(error: any) {
    super(error, HttpStatus.BAD_REQUEST);
  }
}
