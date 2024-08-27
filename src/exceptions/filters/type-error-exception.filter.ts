import { ExceptionFilter, ArgumentsHost, HttpStatus, Catch, Logger } from '@nestjs/common';
import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { Response } from 'express';

@Catch(TypeError)
export class TypeErrorExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(TypeErrorExceptionFilter.name);
  catch(exception: TypeError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { method, url } = request;
    this.logger.error({
      typeErrorName: exception.name,
      messageException: exception.message,
      messageClient: commonExceptions.http.typeError,
      method,
      url,
      stack: exception.stack,
    });
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errors: [{ message: commonExceptions.http.typeError }],
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
