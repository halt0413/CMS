import type { PageRepository } from "../../repositories/PageRepository";
import { NotFoundError } from "../errors/AppError";
import type { PagePreview } from "../../models/PagePreview";

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
