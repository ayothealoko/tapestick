import express, { Express } from "express";
import * as dotenv from "dotenv";
import { statusRouter } from "./routes/index.js";
import { apiErrorHandler } from "./middleware/apiErrorHandler.js";

dotenv.config();
const app: Express = express();

app.use("/v1/status", statusRouter);
app.use("/v1", apiErrorHandler);

const server = app.listen(8000, function () {
  const address = server.address();

  console.log("App listening at %s", address);
});
