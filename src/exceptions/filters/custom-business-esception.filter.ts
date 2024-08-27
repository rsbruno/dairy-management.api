import { ExceptionFilter, ArgumentsHost, HttpStatus, Logger, Catch } from '@nestjs/common';
import { businessException } from '@/mappings/business-exception.mapping';
import { CustomBusinessException } from '../custom-business.exception';
import { Response } from 'express';

@Catch(CustomBusinessException)
export class CustomBusinessExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(CustomBusinessExceptionFilter.name);

  catch(exception: CustomBusinessException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { method, url } = request;
    const message = businessException[exception.code];
    this.logger.error({
      messageException: message,
      messageClient: message,
      method,
      url,
    });
    response.status(HttpStatus.BAD_REQUEST).json({
      errors: [{ message }],
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
