export abstract class CustomError extends Error {
  abstract errorCode: number;
  abstract errorType: string;
  abstract stack?: string;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrorExternal(): {
    errorType: string;
    message: string;
    property?: string;
  };

  abstract serializeErrorInternal(): {
    errorType: string;
    message: string;
    stack: Error["stack"];
    property?: string;
  };
}
