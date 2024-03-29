import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf, json } = format;

export const productionLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(timestamp(), json()),

    defaultMeta: { service: "user-service" },
    transports: [
      new transports.Console({ level: "error" }),
      new transports.File({
        filename: "combined.log",
        level: "info",
      }),
    ],
  });
};
