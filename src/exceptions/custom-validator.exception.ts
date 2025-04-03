import { ValidationError } from 'class-validator';

export class CustomValidatorException extends ValidationError {
  errors: any;
  message: 'error field forms';
  constructor(error: any) {
    super();
    this.errors = error;
  }
}
