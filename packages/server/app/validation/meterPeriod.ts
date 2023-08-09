import Joi from "joi";

import { Request, Response, NextFunction } from "express";
import { validateRequest } from "./validateRequest.js";

export function createMeterPeriodSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Joi.object({
    meterId: Joi.string().required(),
    periodType: Joi.string()
      .valid("DAILY", "WEEKLY", "MONTHLY", "YEARLY")
      .required(),
    startDate: Joi.date().iso().required(),
  });

  validateRequest(req, next, schema);
}
