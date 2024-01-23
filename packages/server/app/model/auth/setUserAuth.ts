import {
  IInsertUserAuthParams,
  insertUserAuth,
} from "../queries/auth.queries.js";
import { getClient } from "../dbClient/db.js";

export async function setUserAuth({
  user,
}: IInsertUserAuthParams): Promise<string> {
  try {
    const userId = await getClient((client) => {
      return insertUserAuth.run({ user }, client);
    });
    return userId[0].user_auth_id;
  } catch (e) {
    // TODO
    throw e;
  }
}
