import type { CmsPageInput, PublicContent } from "@repo/types";
import { toPublicContent } from "@repo/utils";
import { cmsPageSchema } from "./schema";

export function toPageContent(input: CmsPageInput): PublicContent {
  return toPublicContent(cmsPageSchema.parse(input));
}
