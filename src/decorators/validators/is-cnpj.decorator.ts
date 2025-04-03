import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { registerDecorator, ValidationOptions } from 'class-validator';
import { cnpj } from 'cpf-cnpj-validator';

export function IsCNPJ(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      validator: {
        validate(value: string) {
          return typeof value === 'string' && cnpj.isValid(value);
        },
        defaultMessage() {
          return commonExceptions.param.isNotCNPJ;
        },
      },
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      name: 'isCNPJ',
    });
  };
}
