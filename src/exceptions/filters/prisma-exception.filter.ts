import { ExceptionFilter, ArgumentsHost, HttpStatus, Catch, Logger } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prismaExceptions } from '@/mappings/prisma-exceptions.mapping';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientKnownRequestExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaClientKnownRequestExceptionFilter.name);

  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { method, url } = request;
    const message = prismaExceptions.code[exception.code] ?? prismaExceptions.code.default;
    this.logger.error({
      prismaCode: exception.code,
      messageException: exception.message,
      messageClient: message,
      method,
      url,
      stack: exception.stack,
    });
    response.status(exception.code ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR).json({
      errors: [{ message }],
      statusCode: exception.code ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
