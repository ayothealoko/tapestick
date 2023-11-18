import { postStageSchema } from "../../../app/validation/stage.js";

describe("Validation for postStageSchema", () => {
  describe("property session", () => {
    test("Fails if not valid UUID", () => {
      const testObj = { session: "notaUUID" };
      const parseOnlySession = postStageSchema.pick({ session: true });
      const parsingFunc = () => parseOnlySession.parse(testObj);

      expect(parsingFunc).toThrow();
    });

    test("Session UUID is valid", () => {
      const testObj = { session: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d" };
      const parseOnlySession = postStageSchema.pick({ session: true });
      const { success } = parseOnlySession.safeParse(testObj);

      expect(success).toBe(true);
    });
  });

  describe("Property files", () => {
    test("Fails if not array", () => {
      const testObj = { files: "notAnARR" };
      const parseOnlyFiles = postStageSchema.pick({ files: true });
      const parsingFunc = () => parseOnlyFiles.parse(testObj);

      expect(parsingFunc).toThrow();
    });
  });
  test("Fails if elements not  files", () => {
    const testObj = { files: ["not a file", "http://close/but/no/banana"] };
    const parseOnlyFiles = postStageSchema.pick({ files: true });
    const parsingFunc = () => parseOnlyFiles.parse(testObj);

    expect(parsingFunc).toThrow();
  });

  test("Pass if elements are  files", () => {
    const testObj = {
      files: ["File:///standar/file", "File:valid/not/standard"],
    };
    const parseOnlyFiles = postStageSchema.pick({ files: true });
    const parsingObj = parseOnlyFiles.parse(testObj);

    expect(parsingObj).toEqual({
      files: ["file:///standar/file", "file:///valid/not/standard"],
    });
  });
});
