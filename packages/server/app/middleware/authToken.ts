import { Request, Response, NextFunction } from "express";
import { authTokenService } from "../service/authToken.js";
import { AuthError } from "../errors/authError.js";

export async function authToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiAuth = req.headers.authorization;
  const apiKey = apiAuth.split(" ");
  let isValidAuth = false;
  if ((apiKey.length === 2, apiKey[0] === "Bearer")) {
    isValidAuth = await authTokenService(apiKey[1]);
  }

  if (isValidAuth) {
    next();
  } else {
    next(new AuthError("Invalid credentials"));
  }
}
