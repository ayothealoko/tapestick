import express, { Express } from "express";
import * as dotenv from "dotenv";
import {
  statusRouter,
  gitDirRouter,
  stageRouter,
  sessionRouter,
} from "./routes/index.js";
import { apiErrorHandler } from "./middleware/apiErrorHandler.js";
import cors from "cors";

dotenv.config();
export const app: Express = express();

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

app.use("/v1/stage", stageRouter);
app.use("/v1/status", statusRouter);
app.use("/v1/gitdir", gitDirRouter);
app.use("/v1/session", sessionRouter);
app.use("/v1", apiErrorHandler);
