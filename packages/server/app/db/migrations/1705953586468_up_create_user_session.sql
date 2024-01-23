-- GOT CODE FORM https://github.com/voxpelli/node-connect-pg-simple/blob/main/table.sql
-- It is what express-session need from postgres


-- changed table name in PG Session setup
CREATE TABLE "user_session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "user_session" ADD CONSTRAINT "user_session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_user_session_expire" ON "user_session" ("expire");
