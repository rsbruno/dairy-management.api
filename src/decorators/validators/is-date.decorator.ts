import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { registerDecorator, ValidationOptions } from 'class-validator';
import { Transform } from 'class-transformer';

export function IsDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    Transform(({ value }) => (typeof value === 'string' ? new Date(value) : value))(object, propertyName);

    registerDecorator({
      validator: {
        validate(value: any) {
          return value instanceof Date && !isNaN(value.getTime());
        },
      },
      options: {
        message: commonExceptions.param.isDate,
        ...validationOptions,
      },
      target: object.constructor,
      name: 'isDate',
      propertyName,
    });
  };
}
