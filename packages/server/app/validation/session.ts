import { z } from "zod";
import { isFile, properURI } from "./helper.js";

export const postSessionSchema = z.object({
  gitDir: z.string().refine(isFile).transform(properURI),
});
