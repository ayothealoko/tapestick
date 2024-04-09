import { IInsertAccountParams } from "@/models/queries/account.queries.js";
import { setAccount } from "../models/setAccount.js";
import { isPGTypeError } from "@/models/helper.js";
import { AppError } from "@/errors/appError.js";

export async function createAccountService({
  account_name,
}: IInsertAccountParams["account"]): Promise<string> {
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
