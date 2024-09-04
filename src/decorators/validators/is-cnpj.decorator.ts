import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { cnpj } from 'cpf-cnpj-validator';

export function IsCNPJ(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCNPJ',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, _: ValidationArguments) {
          return typeof value === 'string' && cnpj.isValid(value);
        },
        defaultMessage(_: ValidationArguments) {
          return commonExceptions.param.isNotCNPJ;
        },
      },
    });
  };
}
