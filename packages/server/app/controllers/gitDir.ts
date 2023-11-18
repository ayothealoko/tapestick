import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import {
  createGitDirSessionService,
  getGitDirService,
} from "../service/gitDir.js";
import { GetGitDir, PostGirDir } from "shared-code";
import { fileURLToPath } from "url";
import { AppError } from "../errors/appError.js";
import { errorIfUndefined } from "../errors/helpers.js";
import { postGitDirSchema } from "../validation/gitDir.js";
import { ValidationError } from "../errors/validationError.js";
import { CustomError } from "../errors/customError.js";

export const getGitDirController = async (_req: Request, res: Response) => {
  const gitDir = await getGitDirService();
  const final: GetGitDir = {
    gitDir: fileURLToPath(gitDir),
  };
  res.status(200);
  res.json(final);
};

export const postGitDirController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let body: z.infer<typeof postGitDirSchema>;
  try {
    try {
      body = await postGitDirSchema.parseAsync(req.body);
    } catch {
      throw new ValidationError("Request not valid");
    }

    const gitDir = new URL(body.gitDir);
    const sessionId = await createGitDirSessionService(gitDir);

    // type narrowing
    errorIfUndefined(new AppError("Could not create session"), sessionId);
    const final: PostGirDir = {
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
