import { productionLogger } from "./production.js";
import { devLogger } from "./development.js";
import type { Logger } from "winston";

type EnvState = "production" | "development";

const loggers: Record<EnvState, () => Logger> = {
  production: productionLogger,
  development: devLogger,
};

const logger: Logger =
  loggers[
    process.env.NODE_ENV === "production" ? "production" : "development"
  ]();

export { logger };
