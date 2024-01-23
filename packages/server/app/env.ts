import path from "path";
import dotenv from "dotenv";
import { URL } from "url";

const __dirname = new URL(".", import.meta.url).pathname;

dotenv.config({
  path: path.join(__dirname, `../.env.${process.env.NODE_ENV || "local"}`),
});
