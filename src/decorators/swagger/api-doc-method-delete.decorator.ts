import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiForbiddenResponse,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { IForbiddenRequestResponse } from '@/models/exceptions/forbidden-request-response/model';
import { IBadRequestResponse } from '@/models/exceptions/bad-request-response/model';
import { IApiDocMethodConfigs } from '@/models/exceptions/swagger-response/model';
import { applyDecorators } from '@nestjs/common';

export function ApiDocMethodDelete(configs: IApiDocMethodConfigs) {
  const decorators = [
    ApiOperation({ summary: configs.description }),
    ApiNoContentResponse({ description: 'Quando não houverem problemas retorna 204' }),
    ApiBadRequestResponse({
      type: IBadRequestResponse,
    }),
  ];
  if (!configs.isPublic) {
    decorators.push(
      ApiBearerAuth('JWT'),
      ApiForbiddenResponse({
        type: IForbiddenRequestResponse,
      }),
    );
  }
  return applyDecorators(...decorators);
}
