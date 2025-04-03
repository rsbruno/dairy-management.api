import { ExceptionFilter, ArgumentsHost, HttpStatus, Logger, Catch } from '@nestjs/common';
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
      messageClient: commonExceptions.http.typeError,
      messageException: exception.message,
      typeErrorName: exception.name,
      stack: exception.stack,
      method,
      url,
    });
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errors: [{ message: commonExceptions.http.typeError }],
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
