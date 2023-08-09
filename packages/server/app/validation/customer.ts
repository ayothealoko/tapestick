import Joi from "joi";

import { Request, Response, NextFunction } from "express";
import { validateRequest } from "./validateRequest.js";

export function createCustomerSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  validateRequest(req, next, schema);
}
