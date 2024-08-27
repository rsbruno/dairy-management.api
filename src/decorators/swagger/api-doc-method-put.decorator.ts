import { IForbiddenRequestResponse } from '@/models/exceptions/forbidden-request-response/model';
import { IBadRequestResponse } from '@/models/exceptions/bad-request-response/model';
import { IApiDocMethodConfigs } from '@/models/exceptions/swagger-response/model';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiForbiddenResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function ApiDocMethodPut(configs: IApiDocMethodConfigs) {
  const decorators = [
    ApiBadRequestResponse({
      type: IBadRequestResponse,
    }),
    ApiOperation({ summary: configs.description}),
  ];
  if (configs.responseModel) {
    decorators.push(ApiOkResponse({ type: configs.responseModel }));
  } else {
    decorators.push(ApiNoContentResponse());
  }
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
