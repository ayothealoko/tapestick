import { logger } from "../logger/index.js";

export function logAndThrow(err: Error) {
  logger.error(err);
  throw err;
}
