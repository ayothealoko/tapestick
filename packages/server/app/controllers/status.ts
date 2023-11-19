import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { getGitDirBySessionService } from "../service/gitDir.js";
import { getStatusService } from "../service/status.js";
import { Status } from "shared-code";
import { getStatusSchema } from "../validation/status.js";
import { ValidationError } from "../errors/validationError.js";
import { AuthError } from "../errors/authError.js";

export const getStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let body: z.infer<typeof getStatusSchema>;
  try {
    body = await getStatusSchema.parseAsync(req.query);

    const gitDir = await getGitDirBySessionService(body.session);

    if (gitDir === undefined) {
      throw new AuthError("Session Invalid");
    }
    const status: Status = await getStatusService(gitDir);

    res.status(200);
    res.json(status);
  } catch (err) {
    next(new ValidationError("Request not valid"));
  }
};
