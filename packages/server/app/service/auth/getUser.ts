import { AuthError } from "../../errors/authError.js";
import {
  getUserByEmailModel,
  getUserByIdModel,
} from "../../model/auth/getUser.js";
import {
  IGetUserByEmailParams,
  IGetUserByIdParams,
} from "../../model/queries/auth.queries.js";

export async function getUserByEmailService(
  user_email_obj: IGetUserByEmailParams
) {
  try {
    const user = getUserByEmailModel(user_email_obj);
    return user;
  } catch (e) {
    throw new AuthError("Invalid request");
  }
}

export async function getUserByIdService(user_id_obj: IGetUserByIdParams) {
  try {
    const user = getUserByIdModel(user_id_obj);
    return user;
  } catch (e) {
    throw new AuthError("Invalid request");
  }
}
