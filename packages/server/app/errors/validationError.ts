import { CustomError } from "./customError.js";

export class ValidationError extends CustomError {
  errorCode = 400;
  errorType = "VALIDATION_ERROR";
  stack = undefined;

  constructor(message: string, private property?: string) {
    super(message);

    Object.setPrototypeOf(this, ValidationError.prototype);

    Error.captureStackTrace(this);
  }

  serializeErrorInternal() {
    return {
      errorType: this.errorType,
      message: this.message,
      property: this.property,
      stack: this.stack,
    };
  }

  serializeErrorExternal() {
    return {
      errorType: this.errorType,
      message: this.message,
      property: this.property,
    };
  }
}
