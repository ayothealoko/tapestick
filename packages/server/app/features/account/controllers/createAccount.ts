import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { postCreateAccountSchema } from "../validation/createAccount.js";
import { ValidationError } from "@/errors/validationError.js";
import { AppError } from "@/errors/appError.js";
import { createAccountService } from "../services/createAccount.js";

export const postCreateAccountController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let body: z.infer<typeof postCreateAccountSchema>;
  try {
    try {
      body = await postCreateAccountSchema.parseAsync(req.body);
    } catch {
      throw new ValidationError("Request not valid");
    }

    const accountId = await createAccountService({
      account_name: body.account_name,
    });

    res.json({
      account_id: accountId,
    });
  } catch (err) {
    next(new AppError("Could not create Account"));
  }
};
