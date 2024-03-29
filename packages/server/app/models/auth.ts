import {
  IGetUserAndHashlinkFromUserSignupEmailConfirmIdParams,
  IInsertUserAuthParams,
  IInsertUserSignupEmailConfirmParams,
  getUserAndHashlinkFromUserSignupEmailConfirmId,
  insertUserAuth,
  insertUserSignupEmailConfirm,
} from "./queries/auth.queries.js";
import { getClient } from "./dbClient/db.js";

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

export async function setUserSignupEmailConfirm({
  user_auth_id,
}: IInsertUserSignupEmailConfirmParams): Promise<string> {
  const userId = await getClient((client) => {
    return insertUserSignupEmailConfirm.run({ user_auth_id }, client);
  });
  return userId[0].user_signup_email_confirm_id;
}

export interface GetEmailConfirmDataByUserSignupEmailConfirmIdReturn {
  user_first_name: string;
  user_last_name: string;
  hash_link: string;
  email: string;
}

export async function getEmailConfirmDataByUserSignupEmailConfirmId({
  user_signup_email_confirm_id,
}: IGetUserAndHashlinkFromUserSignupEmailConfirmIdParams): Promise<GetEmailConfirmDataByUserSignupEmailConfirmIdReturn> {
  const userId = await getClient((client) => {
    return getUserAndHashlinkFromUserSignupEmailConfirmId.run(
      { user_signup_email_confirm_id },
      client
    );
  });
  let final: GetEmailConfirmDataByUserSignupEmailConfirmIdReturn = userId[0];

  return final;
}
