import { ExceptionFilter, ArgumentsHost, HttpStatus, Logger, Catch } from '@nestjs/common';
import { businessException } from '@/mappings/business-exception.mapping';
import { Response } from 'express';

import { CustomBusinessException } from '../custom-business.exception';

@Catch(CustomBusinessException)
export class CustomBusinessExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(CustomBusinessExceptionFilter.name);

  catch(exception: CustomBusinessException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { method, url } = request;
    const { statusCode, message } = businessException[exception.code];
    this.logger.error({
      messageException: message,
      messageClient: message,
      method,
      url,
    });
    response.status(statusCode ?? HttpStatus.BAD_REQUEST).json({
      statusCode: statusCode ?? HttpStatus.BAD_REQUEST,
      errors: [{ message }],
    });
  }
}
