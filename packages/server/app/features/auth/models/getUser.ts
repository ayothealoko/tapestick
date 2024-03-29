import {
  IGetUserByEmailParams,
  IGetUserByIdParams,
  getUserByEmail,
  getUserById,
} from "@/models/queries/auth.queries.js";
import { getClient } from "@/models/dbClient/db.js";

export async function getUserByEmailModel(
  user_email_obj: IGetUserByEmailParams
) {
  const user = await getClient((client) => {
    return getUserByEmail.run(user_email_obj, client);
  });
  return user;
}

export async function getUserByIdModel(user_id_obj: IGetUserByIdParams) {
  const user = await getClient((client) => {
    return getUserById.run(user_id_obj, client);
  });
  return user;
}
