import { UnauthorizedException, ExceptionFilter, ArgumentsHost, HttpStatus, Logger, Catch } from '@nestjs/common';
import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { Response } from 'express';
@Catch(UnauthorizedException)
export class AuthenticationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AuthenticationExceptionFilter.name);

  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { method, url } = request;
    this.logger.error({
      messageClient: commonExceptions.http.unauthorized,
      messageException: exception.message,
      stack: exception.stack,
      method,
      url,
    });
    response.status(HttpStatus.UNAUTHORIZED).json({
      errors: [{ message: commonExceptions.http.unauthorized }],
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
}
