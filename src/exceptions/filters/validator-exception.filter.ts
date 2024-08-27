import { ExceptionFilter, ArgumentsHost, HttpStatus, Catch, Logger } from '@nestjs/common';
import { CustomValidatorException } from '../custom-validator.exception';
import { Response } from 'express';

@Catch(CustomValidatorException)
export class ValidatorExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidatorExceptionFilter.name);

  catch(exception: CustomValidatorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { method, url } = request;
    this.logger.error({
      validatorCode: HttpStatus.BAD_REQUEST,
      messageException: exception.message,
      messageClient: exception.message,
      method,
      url,
      stack: JSON.stringify(exception.errors),
    });
    response.status(HttpStatus.BAD_REQUEST).json({
      errors: exception.errors,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
