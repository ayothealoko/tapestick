import { prisma } from "./index.js";

export async function getAiModelById(aiModelId: string) {
  return await prisma.aiModel.findUnique({
    where: {
      aiModelId,
    },
  });
}

export async function getAiModelByName(modelName: string) {
  return await prisma.aiModel.findUnique({
    where: {
      modelName,
    },
  });
}
