import { getEmailConfirmDataByUserSignupEmailConfirmId } from "../models/index.js";

interface SendConfirmEmailParams {
  userSignupEmailConfirmId: string;
}

export async function sendConfirmEmail({
  userSignupEmailConfirmId,
}: SendConfirmEmailParams) {
  const emailDetails = getEmailConfirmDataByUserSignupEmailConfirmId({
    user_signup_email_confirm_id: userSignupEmailConfirmId,
  });

  // TODO SEND EMAIL
  console.log(emailDetails);
}
