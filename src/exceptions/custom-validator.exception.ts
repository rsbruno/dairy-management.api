import { ValidationError } from 'class-validator';

export class CustomValidatorException extends ValidationError {
  message: 'error field forms';
  errors: any;
  constructor(error: any) {
    super();
    this.errors = error;
  }
}
