import Joi from "joi";
import { Request, NextFunction } from "express";
import { ValidationError } from "../errors/validationError.js";
import { logAndThrow } from "../errors/logAndTrow.js";

export function validateRequest(
  req: Request,
  next: NextFunction,
  schema: Joi.Schema
) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    logAndThrow(new ValidationError("Invalid Input"));
  } else {
    req.body = value;
    next();
  }
}

export function validateGetRequest(
  req: Request,
  next: NextFunction,
  schema: Joi.Schema
) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.query, options);
  if (error) {
    logAndThrow(new ValidationError("Invalid Input"));
  } else {
    req.body = value;
    next();
  }
}
