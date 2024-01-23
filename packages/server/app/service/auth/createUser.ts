import bcrypt from "bcrypt";
import { AppError } from "../../errors/appError.js";
import { IInsertUserAuthParams } from "../../model/queries/auth.queries.js";
import { isPGTypeError } from "../../model/helper.js";
import {
  setUserAuth,
  setUserSignupEmailConfirm,
} from "../../model/auth/index.js";

export async function createUserAuthService({
  user_first_name,
  user_last_name,
  email,
  password,
}: Omit<IInsertUserAuthParams["user"], "is_active" | "password_hash"> & {
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
        is_active: false,
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
