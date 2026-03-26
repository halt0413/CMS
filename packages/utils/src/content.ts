import type { CmsPageInput, PublicContent } from "@repo/types";
import { normalizeSlug } from "./slug";

export function toPublicContent(input: CmsPageInput): PublicContent {
  return {
    slug: normalizeSlug(input.slug),
    title: input.title.trim(),
    body: input.body.trim()
  };
}
