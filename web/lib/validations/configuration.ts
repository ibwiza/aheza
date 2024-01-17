import * as z from "zod";

export const configurationPatchSchema = z.object({
  type: z.string().min(3).max(128),

  // TODO: Type this properly from editorjs block types?
  percentage: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number()
  ),
});
