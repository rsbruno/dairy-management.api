import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { IForbiddenRequestResponse } from '@/models/exceptions/forbidden-request-response/model';
import { IBadRequestResponse } from '@/models/exceptions/bad-request-response/model';
import { IApiDocMethodConfigs } from '@/models/exceptions/swagger-response/model';
import { applyDecorators } from '@nestjs/common';

export function ApiDocMethodGet(configs: IApiDocMethodConfigs) {
  const decorators = [
    ApiOkResponse({
      type: configs.responseModel,
      isArray: configs.isArray,
    }),
    ApiOperation({ summary: configs.description }),
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
