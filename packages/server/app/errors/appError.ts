import { CustomError } from "./customError.js";

export class AppError extends CustomError {
  errorCode = 400;
  errorType = "APP_ERROR";
  stack = undefined;

  constructor(message: string, private property?: string) {
    super(message);

    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this);
  }

  serializeErrorExternal() {
    return {
      errorType: this.errorType,
      message: this.message,
      property: this.property,
    };
  }

  serializeErrorInternal() {
    return {
      errorType: this.errorType,
      message: this.message,
      property: this.property,
      stack: this.stack,
    };
  }
}
