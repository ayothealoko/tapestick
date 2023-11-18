import { z } from "zod";
import { isFile, properURI } from "./helper.js";

export const postStageSchema = z.object({
  session: z.string().uuid(),
  files: z.string().refine(isFile).transform(properURI).array(),
});
