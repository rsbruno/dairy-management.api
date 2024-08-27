import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { Response } from 'express';
import {
  ForbiddenException,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Logger,
  Catch,
} from '@nestjs/common';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ForbiddenExceptionFilter.name);

  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { method, url } = request;
    const { roles } = exception.getResponse() as any;
    this.logger.error({
      messageException: exception.message,
      messageClient: commonExceptions.http.forbidden,
      method,
      url,
      stack: exception.stack,
    });
    response.status(HttpStatus.FORBIDDEN).json({
      errors: [{ roles, message: commonExceptions.http.forbidden }],
      statusCode: HttpStatus.FORBIDDEN,
    });
  }
}
