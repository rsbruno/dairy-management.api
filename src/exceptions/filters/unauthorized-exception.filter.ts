import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { Response } from 'express';
import {
  UnauthorizedException,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Catch,
  Logger,
} from '@nestjs/common';
@Catch(UnauthorizedException)
export class AuthenticationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AuthenticationExceptionFilter.name);

  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { method, url } = request;
    this.logger.error({
      messageException: exception.message,
      messageClient: commonExceptions.http.unauthorized,
      method,
      url,
      stack: exception.stack,
    });
    response.status(HttpStatus.UNAUTHORIZED).json({
      errors: [{ message: commonExceptions.http.unauthorized }],
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
}
