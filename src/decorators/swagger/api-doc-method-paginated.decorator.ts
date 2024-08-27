import { IForbiddenRequestResponse } from '@/models/exceptions/forbidden-request-response/model';
import { IBadRequestResponse } from '@/models/exceptions/bad-request-response/model';
import { IApiDocMethodConfigs } from '@/models/exceptions/swagger-response/model';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiExtraModels,
  ApiBearerAuth,
  ApiOkResponse,
  getSchemaPath,
  ApiOperation,
} from '@nestjs/swagger';

export function ApiDocMethodPaginated<DataDto extends Type<unknown>>(configs: IApiDocMethodConfigs<DataDto>) {
  const decorators = [
    ApiOperation({ summary: configs.description }),
    ApiBadRequestResponse({
      type: IBadRequestResponse,
    }),
    ApiExtraModels(IOffsetPagination, configs.responseModel),
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(configs.responseModel) },
              },
              total: {
                type: 'number',
              },
            },
          },
        ],
      },
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
