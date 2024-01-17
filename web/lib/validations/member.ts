import * as z from "zod";

export const memberSchema = z.object({
  names: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10),
});
