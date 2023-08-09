import Joi from "joi";

import { Request, Response, NextFunction } from "express";
import { validateGetRequest } from "./validateRequest.js";

export function getStatusSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Joi.object({
    gitDirURI: Joi.string().uri({ scheme: "file" }),
  });

  validateGetRequest(req, next, schema);
}
