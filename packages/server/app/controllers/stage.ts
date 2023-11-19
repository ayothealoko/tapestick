import { z } from "zod";
import { postStageService } from "../service/stage.js";
import { getGitDirBySessionService } from "../service/gitDir.js";
import { AppError } from "../errors/appError.js";
import { errorIfUndefined } from "../errors/helpers.js";
import { postStageSchema } from "../validation/stage.js";
import { ValidationError } from "../errors/validationError.js";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/customError.js";

export const postStageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let body: z.infer<typeof postStageSchema>;
  try {
    try {
      body = await postStageSchema.parseAsync(req.body);
    } catch {
      throw new ValidationError("Request not valid");
    }
    const gitDir = await getGitDirBySessionService(body.session);

    errorIfUndefined(new AppError("Session not registered"), gitDir);

    let fileArr: URL[] = body.files.map((x: string) => new URL(x));
    await postStageService(gitDir, fileArr);

    res.sendStatus(200);
  } catch (err) {
    if (err instanceof CustomError) {
      next(err);
    } else {
      next(new AppError("Could not Stage files"));
    }
  }
};
