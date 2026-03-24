import type { CmsPage, CmsPageInput } from "@repo/types";
import { cmsPageSchema } from "./schema";

export function toPageContent(input: CmsPageInput): CmsPage {
  return cmsPageSchema.parse(input);
}
