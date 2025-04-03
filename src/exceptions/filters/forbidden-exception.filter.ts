import { ForbiddenException, ExceptionFilter, ArgumentsHost, HttpStatus, Logger, Catch } from '@nestjs/common';
import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { Response } from 'express';

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
      messageClient: commonExceptions.http.forbidden,
      messageException: exception.message,
      stack: exception.stack,
      method,
      url,
    });
    response.status(HttpStatus.FORBIDDEN).json({
      errors: [{ message: commonExceptions.http.forbidden, roles }],
      statusCode: HttpStatus.FORBIDDEN,
    });
  }
}
