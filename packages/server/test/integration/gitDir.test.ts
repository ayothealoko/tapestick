import request from "supertest";
import { app } from "../../app/app.js";
import { join, parse } from "path";
import { z } from "zod";

describe("Validation for gitDir route", () => {
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
