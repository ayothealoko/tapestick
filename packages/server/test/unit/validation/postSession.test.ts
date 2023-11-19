import { postSessionSchema } from "../../../app/validation/session.js";

describe("Validation for PostGitDir", () => {
  test("Fails if no git dir", () => {
    const testObj = { notGitDir: "not it" };
    expect(() => postSessionSchema.parse(testObj)).toThrow();
  });

  test("Fails if GitDir is not a File URI", () => {
    const testObj = { gitDir: "notfile:not/proper/URI" };
    expect(() => postSessionSchema.parse(testObj)).toThrow();
  });

  test("Parses to Standard File URI", () => {
    const testObj = { gitDir: "file:Valid/but/not/Standard/URI" };
    const parsedObj = postSessionSchema.parse(testObj);
    expect(parsedObj.gitDir).toBe("file:///Valid/but/not/Standard/URI");
  });
});
