import { IInsertAccountParams } from "@/models/queries/account.queries.js";
import { isPGTypeError } from "@/models/helper.js";
import { AppError } from "@/errors/appError.js";
import { Interface } from "readline";
import { z } from "zod";

const CreateEmailAccountServiceParams = z.object({
  name: z.string(),
  emailAddress: z.string().email(),
  accountOwner: z.string().uuid(),
  isPerson: z.boolean(),
  oauthToken: z.string(),
  refreshToken: z.string(),
});

export async function createEmailAccountService({
  name,
  emailAddress,
  accountOwner,
  isPerson,
  oauthToken,
  refreshToken,
}: z.infer<typeof CreateEmailAccountServiceParams>): Promise<string> {
  try {
    const accountId = await setAccount({ account: { account_name } });
    return accountId;
  } catch (err) {
    if (isPGTypeError(err) && err.constraint === "account_pk") {
      throw new AppError("Account already exists");
    }
    throw err;
  }
}
