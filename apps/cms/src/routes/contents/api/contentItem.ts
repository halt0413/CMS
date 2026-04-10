import type { CmsPage } from "@repo/types";

export type ContentItem = CmsPage & {
  contentType: string;
};

export function toContentItem(page: CmsPage): ContentItem {
  return {
    ...page,
    contentType: "content"
  };
}
