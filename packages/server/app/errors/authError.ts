import { CustomError } from "./customError.js";

export class AuthError extends CustomError {
  errorCode = 401;
  errorType = "AUTHORIZATION_ERROR";
  stack = undefined;

  constructor(message: string, private property?: string) {
    super(message);

    Object.setPrototypeOf(this, AuthError.prototype);
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
