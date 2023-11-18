import { z } from "zod";

export const getStatusSchema = z.object({
  session: z.string().uuid(),
});
