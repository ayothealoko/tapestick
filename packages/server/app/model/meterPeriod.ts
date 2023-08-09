import { MeterPeriod } from "@prisma/client";
import { prisma } from "./index.js";

export async function createMeterPeriodModel(
  meterCuid: string,
  startDate: Date,
  endDate: Date,
  periodType: MeterPeriod["periodType"]
) {
  return await prisma.meterPeriod.create({
    data: {
      meter: {
        connect: { meterCuid },
      },
      startDate,
      endDate,
      periodType,
    },
  });
}

export async function getRecentMeterModelPeriodByMeterId(meterId: string) {
  return await prisma.meterPeriod.findFirst({
    where: {
      meterId,
    },
    orderBy: {
      dateCreated: "desc",
    },
  });
}
