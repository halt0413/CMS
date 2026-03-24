import { z } from "zod";
import type { CmsPageInput } from "@repo/types";

export const cmsPageSchema: z.ZodType<CmsPageInput> = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
  status: z.enum(["draft", "published"])
});

export type CmsPageSchema = z.infer<typeof cmsPageSchema>;
