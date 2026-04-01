import type { CmsPage, CmsPagePatch } from "@repo/types";
import { normalizeSlug } from "@repo/utils";

type UpdatePageParams = {
  now: string;
};

export function updatePage(
  page: CmsPage,
  patch: CmsPagePatch,
  { now }: UpdatePageParams
): CmsPage {
  const nextStatus = patch.status ?? page.status;

  if (nextStatus === "published") {
    const publishedAt = page.status === "published" ? page.publishedAt : now;

    return {
      id: page.id,
      slug: patch.slug ? normalizeSlug(patch.slug) : page.slug,
      title: patch.title ? patch.title.trim() : page.title,
      body: patch.body ? patch.body.trim() : page.body,
      status: "published",
      createdAt: page.createdAt,
      updatedAt: now,
      publishedAt
    };
  }

  return {
    id: page.id,
    slug: patch.slug ? normalizeSlug(patch.slug) : page.slug,
    title: patch.title ? patch.title.trim() : page.title,
    body: patch.body ? patch.body.trim() : page.body,
    status: "draft",
    createdAt: page.createdAt,
    updatedAt: now
  };
}
