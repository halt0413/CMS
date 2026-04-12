import type { CmsPage } from "@repo/types";
import { NotFoundError } from "../../lib/errors/AppError";
import type { PageRepository } from "../ports";

export type PagePreview = CmsPage;

export async function getPagePreview(
  pageRepository: PageRepository,
  slug: string
): Promise<PagePreview> {
  const page = await pageRepository.findBySlug(slug);

  if (!page) {
    throw new NotFoundError("Page not found");
  }

  return page;
}
