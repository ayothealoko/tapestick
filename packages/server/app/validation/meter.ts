import Joi from "joi";

import { Request, Response, NextFunction } from "express";
import { validateRequest } from "./validateRequest.js";

export function createMeterSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    softQuota: Joi.number().integer().required(),
    hardQuota: Joi.number().integer().required(),
    recurring: Joi.boolean().required(),
  });

  validateRequest(req, next, schema);
}
