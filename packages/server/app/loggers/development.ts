import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf } = format;

export const devLogger = () => {
  const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  });

  return createLogger({
    level: "debug",
    // format: winston.format.simple(),
    format: combine(format.colorize(), timestamp(), myFormat),

    //defaultMeta: { service: 'user-service' },
    transports: [new transports.Console()],
  });
};
