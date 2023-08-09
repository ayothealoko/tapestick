import { MeterPeriod } from "@prisma/client";
import { DateTime } from "luxon";

export function periodEndDate(
  periodType: MeterPeriod["periodType"],
  periodStart: Date
) {
  const periodObj: Record<MeterPeriod["periodType"], object> = {
    DAILY: { days: 1 },
    WEEKLY: { weeks: 1 },
    MONTHLY: { months: 1 },
    YEARLY: { years: 1 },
  };

  const period = periodObj[periodType];

  const endDate = DateTime.fromISO(periodStart.toISOString());
  endDate.plus(period);
  const periodEnd = new Date(endDate.toISO());
  return periodEnd;
}
