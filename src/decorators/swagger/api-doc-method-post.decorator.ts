import { IForbiddenRequestResponse } from '@/models/exceptions/forbidden-request-response/model';
import { IBadRequestResponse } from '@/models/exceptions/bad-request-response/model';
import { IApiDocMethodConfigs } from '@/models/exceptions/swagger-response/model';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';

export function ApiDocMethodPost(configs: IApiDocMethodConfigs) {
  const decorators = [
    ApiCreatedResponse({
      type: configs.responseModel,
    }),
    ApiBadRequestResponse({
      type: IBadRequestResponse,
    }),
    ApiOperation({ summary: configs.description }),
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
