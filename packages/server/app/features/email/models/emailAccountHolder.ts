import { AppError } from "@/errors/appError.js";
import { getClient } from "@/models/dbClient/db.js";
import {
  IGetEmailOwnerByIdResult,
  getEmailOwnerById,
  getEmailOwnerSubAccountById,
  getEmailOwnerSubPersonById,
  insertEmailOwner,
} from "@/models/queries/email.queries.js";

export interface GetOwnerbyOwnerIdParams {
  ownerId: string;
}

export interface GetOwnerbyOwnerIdReturn {
  is_person: boolean;
  email_owner_id: string;
  sub_owner_id: string;
}

export async function getOwnerByOwnerId({
  ownerId,
}: GetOwnerbyOwnerIdParams): Promise<GetOwnerbyOwnerIdReturn> {
  const emailOwnerArr = await getClient((client) => {
    return getEmailOwnerById.run({ email_owner_id: ownerId }, client);
  });
  if (emailOwnerArr.length === 1) {
    const emailOwner = emailOwnerArr[0];
    if (emailOwner.is_person) {
      const personSubArr = await getClient((client) => {
        return getEmailOwnerSubPersonById.run(
          {
            email_owner_id: emailOwner.email_owner_id,
          },
          client
        );
      });

      if (personSubArr.length == 1) {
        const personSub = personSubArr[0];
        return {
          is_person: true,
          email_owner_id: personSub.email_owner_id,
          sub_owner_id: personSub.user_auth_id,
        };
      } else {
        throw new AppError("Could not find owner");
      }
    } else {
      const accountSubArr = await getClient((client) => {
        return getEmailOwnerSubAccountById.run(
          {
            email_owner_id: emailOwner.email_owner_id,
          },
          client
        );
      });

      if (accountSubArr.length == 1) {
        const accountSub = accountSubArr[0];
        return {
          is_person: false,
          email_owner_id: accountSub.email_owner_id,
          sub_owner_id: accountSub.account_id,
        };
      } else {
        throw new AppError("Could not find owner");
      }
    }
  } else {
    throw new AppError("Could not find owner");
  }
}

export interface SetEmailOwnerParams {
  isPerson: boolean;
  ownerId: string;
}

async function setEmailOwner({ isPerson, ownerId }: SetEmailOwnerParams) {
  const emailOwnerArr = await getClient((client) => {
    return getEmailOwnerById.run({ email_owner_id: ownerId }, client);
  });
  if (emailOwnerArr.length === 0) {
    const emailOwnerIdArr = await getClient(async (client) => {
      await client.query("begin");
      const emailOwnerIdArr = insertEmailOwner.run(
        { is_person: isPerson },
        client
      );
      let emailOwnerId: IGetEmailOwnerByIdResult;
      if (emailOwnerArr.length == 1) {
        emailOwnerId = emailOwnerArr[0];
      } else {
        throw new AppError("Could not set owner");
      }
      if (isPerson) {
      }
    });
  }
}
