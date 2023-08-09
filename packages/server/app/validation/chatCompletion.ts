import Joi from "joi";

import { Request, Response, NextFunction } from "express";
import { validateRequest } from "./validateRequest.js";

export function postChateCompletionSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Joi.object({
    openai_api_key: Joi.string().required(),
    meter_id: Joi.string().required(),
    // Openapi Required
    model: Joi.string()
      .valid(
        "gpt-4",
        "gpt-4-0314",
        "gpt-4-32k",
        "gpt-4-32k-0314",
        "gpt-3.5-turbo",
        "gpt-3.5-turbo-0301"
      )
      .required(),
    messages: Joi.array()
      .items(
        Joi.object({
          role: Joi.string().valid("system", "user", "assistant").required(),
          content: Joi.string().required(),
          name: Joi.string(),
        }).required()
      )
      .required(),
    temperature: Joi.number().min(0).max(2),
    top_p: Joi.number().min(0).max(1),
    n: Joi.number().integer().min(1),
    stop: Joi.alternatives().try(Joi.string().max(4), Joi.array().max(4)),
    max_tokens: Joi.number().integer().min(1),
    presence_penalty: Joi.number().min(-2).max(2),
    frequency_penalty: Joi.number().min(-2).max(2),
    logit_bias: Joi.object(),
    user: Joi.string(),
  });

  validateRequest(req, next, schema);
}
