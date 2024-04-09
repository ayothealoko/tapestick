import express, { Express } from "express";
import * as dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import { jsonParser, urlencodedParser } from "./middlewares/bodyparser.js";
import { mainRouter } from "./router/index.js";
import { sessionSetup } from "./middlewares/session.js";

dotenv.config();
const app: Express = express();

let corsOptions: CorsOptions;

if (process.env.NODE_ENV !== "production") {
  corsOptions = {
    optionsSuccessStatus: 200,
    credentials: true,
    origin: true,
  };
} else {
  corsOptions = {
    // TODO CHANGE
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  };
}

app.use(cors(corsOptions));
app.use(urlencodedParser);
app.use(jsonParser);

sessionSetup(app);
app.use("/", mainRouter);

export { app };
