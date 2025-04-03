import { PrismaClientKnownRequestExceptionFilter } from '@/exceptions/filters/prisma-exception.filter';
import { CustomBusinessExceptionFilter } from '@/exceptions/filters/custom-business-esception.filter';
import { AuthenticationExceptionFilter } from '@/exceptions/filters/unauthorized-exception.filter';
import { AxiosErrorExceptionFilter } from '@/exceptions/filters/axios-error-exception.filter';
import { TypeErrorExceptionFilter } from '@/exceptions/filters/type-error-exception.filter';
import { ValidatorExceptionFilter } from '@/exceptions/filters/validator-exception.filter';
import { ForbiddenExceptionFilter } from '@/exceptions/filters/forbidden-exception.filter';
import { ResponseExceptionFilter } from '@/exceptions/filters/response-exception.filter';
import { ValidationPipe } from '@/exceptions/pipes/validation-pipe.exception';
import { addDocWithSwagger } from '@/configs/swagger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new ResponseExceptionFilter(),
    new ValidatorExceptionFilter(),
    new AxiosErrorExceptionFilter(),
    new PrismaClientKnownRequestExceptionFilter(),
    new ForbiddenExceptionFilter(),
    new CustomBusinessExceptionFilter(),
    new TypeErrorExceptionFilter(),
    new AuthenticationExceptionFilter(),
  );
  app.enableCors({
    allowedHeaders: 'Content-Type, Authorization',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: '*',
  });
  if (String(process.env.NODE_ENV).trim() === 'dev') addDocWithSwagger(app);
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
