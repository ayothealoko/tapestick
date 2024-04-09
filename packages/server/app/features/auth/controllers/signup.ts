import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { AppError } from "@/errors/appError.js";
import { ValidationError } from "@/errors/validationError.js";

import { createUserAuthService } from "../services/createUser.js";
import { postSignupSchema } from "../validation/signup.js";
import { CustomError } from "@/errors/customError.js";

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
      is_active: true,
      account_id: body.account_id,
    });

    res.status(200).end();
  } catch (err) {
    if (err instanceof CustomError) {
      next(err);
    } else {
      next(new AppError("Could not Signup"));
    }
  }
};
