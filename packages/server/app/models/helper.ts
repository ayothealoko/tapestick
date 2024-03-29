export interface PGTypedError {
  constraint: string;
}

export function isPGTypeError(obj: unknown): obj is PGTypedError {
  return typeof obj === "object" && obj !== null && "constraint" in obj;
}
