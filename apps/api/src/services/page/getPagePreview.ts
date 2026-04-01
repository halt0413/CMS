import type { CmsPage } from "@repo/types";
import { NotFoundError } from "../../lib/errors/AppError";
import type { PageRepository } from "../ports";

export type PagePreview = CmsPage;

export function getPagePreview(
  pageRepository: PageRepository,
  slug: string
): PagePreview {
  const page = pageRepository.findBySlug(slug);

  if (!page) {
    throw new NotFoundError("Page not found");
  }

  return page;
}
