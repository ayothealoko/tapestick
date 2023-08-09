import { CustomError } from "./customError.js";

export class ValidationError extends CustomError {
  errorCode = 400;
  errorType = "VALIDATION_ERROR";

  constructor(message: string, private property?: string) {
    super(message);

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeError() {
    return [
      {
        errorType: this.errorType,
        message: this.message,
        property: this.property,
      },
    ];
  }
}
