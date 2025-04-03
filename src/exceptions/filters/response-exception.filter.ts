import { ExceptionFilter, ArgumentsHost, HttpException, Catch } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ResponseExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const err = exception.getResponse() as any;
    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      errors: err.message ?? err,
    });
  }
}
