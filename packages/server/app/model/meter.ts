import { prisma } from "./index.js";

export async function createMeterModel(
  customerCuid: string,
  softQuota: number,
  hardQuota: number,
  recurring: boolean
) {
  return await prisma.meter.create({
    data: {
      customer: {
        connect: { customerCuid: customerCuid },
      },
      softQuota: softQuota,
      hardQuota: hardQuota,
      recurring: recurring,
    },
  });
}

export async function getMeterModelByCuid(meterCuid: string) {
  return await prisma.meter.findUnique({
    where: {
      meterCuid: meterCuid,
    },
  });
}
