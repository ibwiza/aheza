import * as z from "zod";

export const familyPatchSchema = z.object({
  names: z.string().min(3).max(128),
});
