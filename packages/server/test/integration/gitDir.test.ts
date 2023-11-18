import request from "supertest";
import { app } from "../../app/app.js";
import { join, parse } from "path";
import { z } from "zod";

describe("Validation for gitDir route", () => {
  describe("POST gitDir", () => {
    test("It should error for bad request", () => {
      return request(app)
        .post("/v1/gitdir")
        .send({
          non: "standard",
        })
        .set("Accept", "application/json")
        .expect(400);
    });

    test("It returns the uuid session", async () => {
      return request(app)
        .post("/v1/gitdir")
        .send({ gitDir: "file://file/path" })
        .expect(200)
        .then((res) => {
          const session = res.body.session;
          const { success } = z.string().uuid().safeParse(session);
          expect(success).toBe(true);
        });
    });
  });

  describe("GET gitDir", () => {
    test("It finds top gir dir of CWD", async () => {
      const gitDir = parse(join(__dirname, "../../../../"));
      return request(app)
        .get("/v1/gitdir")
        .expect(200)
        .then((res) => {
          const resDir = parse(res.body.gitDir);
          expect(resDir.dir).toMatch(gitDir.dir);
        });
    });
  });
});
