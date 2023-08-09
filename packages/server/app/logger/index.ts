import { productionLogger } from "./production.js";
import { devLogger } from "./development.js";

let logger = null;

const loggers = {
  production: productionLogger,
  development: devLogger,
};

logger = loggers[process.env.NODE_ENV];

export { logger };
