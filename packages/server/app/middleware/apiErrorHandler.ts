import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/customError.js";
import { logger } from "../logger/index.js";

export function apiErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof CustomError) {
    logger.error(err.serializeError());
    res.status(err.errorCode).json(err.serializeError());
  } else {
    logger.error(err);
    res.status(500).json({
      errorType: "API_ERROR",
      message: "Incorrect use of API",
    });
  }
}
