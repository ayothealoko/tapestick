import express, { Express } from "express";
import session from "express-session";
import passport from "passport";
import localStrategy from "passport-local";
import * as dotenv from "dotenv";
import { isLoggedInRouter, loginRouter, signupRouter } from "@/router/index.js";
import { apiErrorHandler } from "@/middlewares/apiErrorHandler.js";
import cors, { CorsOptions } from "cors";
import { AppError } from "./errors/appError.js";
import connectPGSimple from "connect-pg-simple";
import { pool } from "@/models/dbClient/db.js";
import { verifyLocal } from "@/features/auth/middlewares/authToken.js";
import { IGetUserByEmailResult } from "@/models/queries/auth.queries.js";
import { getUserByIdService } from "@/features/auth/services/getUser.js";
import { jsonParser, urlencodedParser } from "./middlewares/bodyparser.js";

dotenv.config();
export const app: Express = express();

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

// AUTH middleware
if (process.env.SESSION_SECRET) {
  const PGSession = connectPGSimple(session);
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 7 days
      store: new PGSession({
        pool: pool,
        tableName: "user_session",
      }),
    })
  );
} else {
  throw new AppError("No session secret set");
}
// end

app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = localStrategy.Strategy;
passport.use(new LocalStrategy({ usernameField: "email" }, verifyLocal));

declare global {
  namespace Express {
    interface User extends IGetUserByEmailResult {}
  }
}

passport.serializeUser(function (user, done) {
  console.log("kelog");
  done(null, user.user_auth_id);
});

passport.deserializeUser(async function (id: string, done) {
  console.log("kelog");
  try {
    const user = await getUserByIdService({ user_auth_id: id });
    done(null, user[0]);
  } catch (err) {
    done(err);
  }
});

app.use("/api/v1/login", loginRouter);
app.use("/api/v1/login/is-logged-in", isLoggedInRouter);
app.use("/api/v1/signup", signupRouter);
app.use("/api", apiErrorHandler);
