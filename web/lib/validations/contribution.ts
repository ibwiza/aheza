import * as z from "zod";

export const contributionSchema = z.object({
  amount: z.number().min(3),
  year: z.number().min(4),
  month: z.number().min(1),
});
