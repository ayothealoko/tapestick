import {
  IInsertUserSignupEmailConfirmParams,
  insertUserSignupEmailConfirm,
} from "@/models/queries/auth.queries.js";
import { getClient } from "@/models/dbClient/db.js";

export async function setUserSignupEmailConfirm({
  user_auth_id,
}: IInsertUserSignupEmailConfirmParams): Promise<string> {
  const userId = await getClient((client) => {
    return insertUserSignupEmailConfirm.run({ user_auth_id }, client);
  });
  return userId[0].user_signup_email_confirm_id;
}
