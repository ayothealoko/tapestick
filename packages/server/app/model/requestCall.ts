import { prisma } from "./index.js";

export async function createRequestCallModel(
  meterCuid: string,
  promptTokenCount: number,
  responseTokenCount: number,
  aiModelId: string
) {
  return await prisma.requestCall.create({
    data: {
      meter: {
        connect: { meterCuid },
      },
      aiModel: {
        connect: { aiModelId },
      },
      promptTokenCount,
      responseTokenCount,
    },
  });
}

export async function getSumForRequestCallModelByMeterId(
  meterId: string,
  startDate: Date,
  endDate: Date
) {
  return await prisma.requestCall.groupBy({
    by: ["aiModelId"],
    where: {
      meterId,
      dateCreated: {
        lte: startDate,
        gte: endDate,
      },
    },
    _sum: {
      promptTokenCount: true,
      responseTokenCount: true,
    },
  });
}
