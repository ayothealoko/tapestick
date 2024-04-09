import { getClient } from "@/models/dbClient/db.js";
import {
  IInsertAccountParams,
  insertAccount,
} from "@/models/queries/account.queries.js";

export async function setAccount({
  account,
}: IInsertAccountParams): Promise<string> {
  try {
    const accountId = await getClient((client) => {
      return insertAccount.run({ account }, client);
    });

    return accountId[0].account_id;
  } catch (e) {
    throw e;
  }
}
