import "./env.js";

import { logger } from "@/loggers/log.js";

import { app } from "./app.js";

const server = app.listen(8000, function () {
  let address = server.address();
  if (address !== null && typeof address !== "string") {
    address = `port ${address.port}`;
  }

  logger.log({
    level: "info",
    message: `App listening at ${address}`,
  });
});
