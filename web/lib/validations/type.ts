import * as z from "zod";

export const typeSchema = z.object({
  names: z.string().min(4),
  percentage: z.number().min(1),
});
