import type { CmsPageInput } from "./cms";

export type PublicContent = Pick<CmsPageInput, "slug" | "title" | "body">;

export type PublishedContent = PublicContent & {
  status: "published";
};

export type CmsPage = CmsPageInput;
