import Joi from "joi";

import { Request, Response, NextFunction } from "express";
import { validateRequest } from "./validateRequest.js";

export function createUserSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });

  validateRequest(req, next, schema);
}
