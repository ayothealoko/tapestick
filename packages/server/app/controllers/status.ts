import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { getStatusService } from "../service/status.js";
import { Status } from "shared-code";
import { getStatusSchema } from "../validation/status.js";
import { ValidationError } from "../errors/validationError.js";
import { SESSION } from "../model/session.js";
import { AuthError } from "../errors/authError.js";

export const getStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let body: z.infer<typeof getStatusSchema>;
  try {
    body = await getStatusSchema.parseAsync(req.query);

    let fileURI = SESSION.getGidDir(body.session);
    if (fileURI === undefined) {
      throw new AuthError("Session Invalid");
    }
    const status: Status = await getStatusService(fileURI);

    res.status(200);
    res.json(status);
  } catch (err) {
    next(new ValidationError("Request not valid"));
  }
};
