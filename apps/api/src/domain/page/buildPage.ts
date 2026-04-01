import type { CmsPage, CmsPageInput } from "@repo/types";
import { normalizeSlug } from "@repo/utils";

type BuildPageParams = {
  id: string;
  now: string;
};

export function buildPage(input: CmsPageInput, { id, now }: BuildPageParams): CmsPage {
  const base = {
    id,
    slug: normalizeSlug(input.slug),
    title: input.title.trim(),
    body: input.body.trim(),
    createdAt: now,
    updatedAt: now
  };

  if (input.status === "published") {
    return {
      ...base,
      status: "published",
      publishedAt: now
    };
  }

  return {
    ...base,
    status: "draft"
  };
}
