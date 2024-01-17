import * as z from "zod";

export const familySchema = z.object({
  names: z.string().min(3),
});
