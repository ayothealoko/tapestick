import {
  IGetUserAndHashlinkFromUserSignupEmailConfirmIdParams,
  getUserAndHashlinkFromUserSignupEmailConfirmId,
} from "../queries/auth.queries.js";
import { getClient } from "../dbClient/db.js";

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
