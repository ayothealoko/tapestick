var path = require("path");

require("dotenv").config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV || "local"}`),
});

console.log(`.env.${process.env.NODE_ENV || "local"}`);

var configuration = {
  migrationsDir: path.resolve(__dirname, "migrations"), // This is the directory that should contain your SQL migrations.
  host: process.env.DB_HOST, // Database host
  port: process.env.DB_PORT, // Database port
  db: process.env.DB_NAME, // Database name
  user: process.env.DB_USER, // Database username
  password: process.env.DB_PASSWORD, // Database password
  adapter: "pg", // Database adapter: pg, mysql
};

require("sql-migrations").run(configuration);
