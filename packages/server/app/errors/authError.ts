import { CustomError } from "./customError.js";

export class AuthError extends CustomError {
  errorCode = 401;
  errorType = "AUTHORIZATION_ERROR";

  constructor(message: string, private property?: string) {
    super(message);

    Object.setPrototypeOf(this, AuthError.prototype);
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
