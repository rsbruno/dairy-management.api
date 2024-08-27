import { ExceptionFilter, ArgumentsHost, HttpStatus, Logger, Catch } from '@nestjs/common';
import { keycloakExceptions } from '@/mappings/keycloak-exceptions.mapping';
import { AxiosError } from 'axios';
import { Response } from 'express';

@Catch(AxiosError)
export class AxiosErrorExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AxiosErrorExceptionFilter.name);

  catch(exception: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { method, url } = request;
    const error = exception?.response?.data['error'] ?? exception.message;
    const messageClient = keycloakExceptions[error] ?? keycloakExceptions.default;
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    switch (exception?.response?.status) {
      case HttpStatus.NOT_FOUND:
        statusCode = HttpStatus.BAD_REQUEST;
        break;
      case undefined:
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      default:
        statusCode = exception?.response?.status;
        break;
    }
    this.logger.error({
      messageException: exception.message,
      messageClient,
      method,
      url,
      targetUrl: exception.request.path,
      stack: exception.stack,
    });
    response.status(statusCode).json({
      errors: [{ message: messageClient }],
      statusCode,
    });
  }
}
