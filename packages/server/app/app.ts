import express, { Express } from "express";
import * as dotenv from "dotenv";
import { statusRouter, gitDirRouter, stageRouter } from "./routes/index.js";
import { apiErrorHandler } from "./middleware/apiErrorHandler.js";

dotenv.config();
export const app: Express = express();

app.use("/v1/stage", stageRouter);
app.use("/v1/status", statusRouter);
app.use("/v1/gitdir", gitDirRouter);
app.use("/v1", apiErrorHandler);
