import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { createSessionService } from "../service/session.js";
import { PostSession } from "shared-code";
import { AppError } from "../errors/appError.js";
import { errorIfUndefined } from "../errors/helpers.js";
import { postSessionSchema } from "../validation/session.js";
import { ValidationError } from "../errors/validationError.js";
import { CustomError } from "../errors/customError.js";

export const postSessionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let body: z.infer<typeof postSessionSchema>;
  try {
    try {
      body = await postSessionSchema.parseAsync(req.body);
    } catch {
      throw new ValidationError("Request not valid");
    }

    const gitDir = new URL(body.gitDir);
    const sessionId = await createSessionService(gitDir);

    // type narrowing
    errorIfUndefined(new AppError("Could not create session"), sessionId);
    const final: PostSession = {
      session: sessionId,
    };

    res.status(200);
    res.json(final);
  } catch (err) {
    if (err instanceof CustomError) {
      next(err);
    } else {
      next(new AppError("Could not Stage files"));
    }
  }
};
