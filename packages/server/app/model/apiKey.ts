import { ApiKey } from "@prisma/client";
import { prisma } from "./index.js";

export async function getApiKeyModel(apiKey: string): Promise<ApiKey> {
  return await prisma.apiKey.findUnique({
    where: {
      apiKeyCuid: apiKey,
    },
  });
}
