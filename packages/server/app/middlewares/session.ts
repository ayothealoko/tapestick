import session from "express-session";
import { AppError } from "@/errors/appError.js";
import connectPGSimple from "connect-pg-simple";
import { pool } from "@/models/dbClient/db.js";

declare module "express-session" {
  interface SessionData {
    user_id: string;
    account_id: string;
  }
}

export function sessionSetup(app: any) {
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
}
