import type { CmsIssueInput, CmsPage } from "@repo/types";
import { cmsPageSchema } from "./schema";

export function toPageContent(input: CmsIssueInput): CmsPage {
  return cmsPageSchema.parse(input);
}
