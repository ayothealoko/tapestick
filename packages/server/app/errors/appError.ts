import { CustomError } from "./customError.js";

export class AppError extends CustomError {
  errorCode = 400;
  errorType = "APP_ERROR";

  constructor(message: string, private property?: string) {
    super(message);

    Object.setPrototypeOf(this, AppError.prototype);
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
