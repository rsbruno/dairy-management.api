import { ExceptionFilter, ArgumentsHost, HttpStatus, Logger, Catch } from '@nestjs/common';
import { Response } from 'express';

import { CustomValidatorException } from '../custom-validator.exception';

@Catch(CustomValidatorException)
export class ValidatorExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidatorExceptionFilter.name);

  catch(exception: CustomValidatorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { method, url } = request;
    this.logger.error({
      stack: JSON.stringify(exception.errors),
      validatorCode: HttpStatus.BAD_REQUEST,
      messageException: exception.message,
      messageClient: exception.message,
      method,
      url,
    });
    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      errors: exception.errors,
    });
  }
}
