import express, { Express } from "express";
import session from "express-session";
import passport from "passport";
import localStrategy from "passport-local";
import * as dotenv from "dotenv";
import { loginRouter, signupRouter } from "./routes/index.js";
import { apiErrorHandler } from "./middleware/apiErrorHandler.js";
import cors from "cors";
import { AppError } from "./errors/appError.js";
import connectPGSimple from "connect-pg-simple";
import { pool } from "./model/dbClient/db.js";
import { verifyLocal } from "./middleware/authToken.js";
import { IGetUserByEmailResult } from "./model/queries/auth.queries.js";
import { getUserByIdService } from "./service/auth/getUser.js";

dotenv.config();
export const app: Express = express();

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

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
passport.use(new LocalStrategy(verifyLocal));

declare global {
  namespace Express {
    interface User extends IGetUserByEmailResult {}
  }
}

passport.serializeUser(function (user, done) {
  done(null, user.user_auth_id);
});

passport.deserializeUser(async function (id: string, done) {
  try {
    const user = await getUserByIdService({ user_auth_id: id });
    done(null, user[0]);
  } catch (err) {
    done(err);
  }
});

app.use("/api/v1/login", loginRouter);
app.use("/api/v1/signup", signupRouter);
app.use("/api", apiErrorHandler);
