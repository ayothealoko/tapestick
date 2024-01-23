import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import passport from "passport";
import { AppError } from "../errors/appError.js";
import { ValidationError } from "../errors/validationError.js";
import { CustomError } from "../errors/customError.js";
import { postLoginSchema } from "../validation/login.js";
import { IGetUserByIdResult } from "../model/queries/auth.queries.js";

const errorMsg = "Incorrect email or password";

export const postLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("called");
  let body: z.infer<typeof postLoginSchema>;
  try {
    try {
      body = await postLoginSchema.parseAsync(req.body);
    } catch {
      throw new ValidationError(errorMsg);
    }

    console.log("called2");
    passport.authenticate(
      "local",
      function (err: any, user: IGetUserByIdResult, _: any) {
        console.log("called3");
        if (err || !user) {
          return standardError(res);
        }
        req.login(user, function (err) {
          if (err) {
            return standardError(res);
          } else {
            return res.status(200).json({ type: "success" });
          }
        });
      }
    )(req, res, next);
  } catch (err) {
    if (err instanceof CustomError) {
      if (err.message === errorMsg) {
        res.status(409).json({
          type: "error",
          message: err.message,
        });
      } else {
        next(err);
      }
    } else {
      next(new AppError("Could not Login"));
    }
  }
};

function standardError(res: Response) {
  res.status(400).json({ type: "error", message: errorMsg });
}
