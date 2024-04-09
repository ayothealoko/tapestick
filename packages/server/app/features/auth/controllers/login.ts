import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { AppError } from "@/errors/appError.js";
import { ValidationError } from "@/errors/validationError.js";

import { postLoginSchema } from "../validation/login.js";
import { getUserByEmailService } from "../services/getUser.js";

const errorMsg = "Incorrect email or password";

export const postLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let body: z.infer<typeof postLoginSchema>;
  try {
    try {
      body = await postLoginSchema.parseAsync(req.body);
    } catch {
      throw new ValidationError(errorMsg);
    }

    const user = await getUserByEmailService({
      user_email: body.email,
    });

    const isValidPassword = await bcrypt.compare(
      body.password,
      user.password_hash
    );

    if (isValidPassword) {
      req.session.user_id = user.user_auth_id;
      req.session.account_id = user.account_id;
    }

    res.json({ is_authenticated: true });
  } catch (err) {
    next(new AppError("Could not Login"));
  }
};
