import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../errors/appError.js";
import { postSignupSchema } from "../validation/signup.js";
import { ValidationError } from "../errors/validationError.js";
import { CustomError } from "../errors/customError.js";
import { createUserAuthService } from "../service/auth/createUser.js";

export const postSignupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let body: z.infer<typeof postSignupSchema>;
  try {
    try {
      body = await postSignupSchema.parseAsync(req.body);
    } catch {
      throw new ValidationError("Request not valid");
    }

    await createUserAuthService({
      user_first_name: body.firstName,
      user_last_name: body.lastName,
      email: body.email,
      password: body.password,
    });

    res.status(200).end();
  } catch (err) {
    if (err instanceof CustomError) {
      if (err.message === "email already used") {
        res.status(409).json({
          type: "error",
          message: err.message,
        });
      } else {
        next(err);
      }
    } else {
      next(new AppError("Could not Signup"));
    }
  }
};

function hashLinkURL(hashLink: string) {
  return `/validate-email?link=${hashLink}`;
}
