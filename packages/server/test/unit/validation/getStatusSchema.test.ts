import { getStatusSchema } from "../../../app/validation/status.js";

describe("Validation for getStatsSchema", () => {
  describe("property session", () => {
    test("Fails if not valid UUID", () => {
      const testObj = { session: "notaUUID" };
      const parseOnlySession = getStatusSchema.pick({ session: true });
      const parsingFunc = () => parseOnlySession.parse(testObj);

      expect(parsingFunc).toThrow();
    });

    test("Session UUID is valid", () => {
      const testObj = { session: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d" };
      const parseOnlySession = getStatusSchema.pick({ session: true });
      const { success } = parseOnlySession.safeParse(testObj);

      expect(success).toBe(true);
    });
  });
});
