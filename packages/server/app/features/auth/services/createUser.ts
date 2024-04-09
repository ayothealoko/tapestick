import bcrypt from "bcrypt";

import { AppError } from "@/errors/appError.js";
import { IInsertUserAuthParams } from "@/models/queries/auth.queries.js";
import { isPGTypeError } from "@/models/helper.js";

import { setUserAuth, setUserSignupEmailConfirm } from "../models/index.js";

export async function createUserAuthService({
  user_first_name,
  user_last_name,
  email,
  password,
  is_active,
  account_id,
}: Omit<IInsertUserAuthParams["user"], "password_hash"> & {
  password: string;
}): Promise<string[]> {
  let password_hash = await bcrypt.hash(password, 10);

  try {
    const userId = await setUserAuth({
      user: {
        user_first_name,
        user_last_name,
        email,
        password_hash,
        account_id,
        is_active,
      },
    });

    const userSignupEmailConfirm = await setUserSignupEmailConfirm({
      user_auth_id: userId,
    });

    return [userId, userSignupEmailConfirm];
  } catch (err) {
    if (isPGTypeError(err) && err.constraint === "user_auth_email_key") {
      throw new AppError("email already used");
    }
    throw err;
  }
}
