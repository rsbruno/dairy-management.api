import { ArgumentMetadata, PipeTransform, Injectable } from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { CustomValidatorException } from '../custom-validator.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value;
    const object = plainToInstance(metatype, value);
    const errors = await validate(object, { whitelist: true });
    if (errors.length > 0) throw new CustomValidatorException(this.mountObjectErrors(errors));
    return object;
  }

  private mountObjectErrors(errors: ValidationError[]) {
    const collectErrors = (errors: ValidationError[], parentPath: string = ''): any[] => {
      return errors.reduce((acc, error) => {
        const path = parentPath ? `${parentPath}.${error.property}` : error.property;
        if (error.constraints)
          acc.push(
            ...Object.values(error.constraints).map(message => ({
              message,
              path,
            })),
          );
        if (error.children && error.children.length > 0) acc.push(...collectErrors(error.children, path));
        return acc;
      }, []);
    };

    return collectErrors(errors);
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
