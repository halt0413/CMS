import type { PageRepository } from "../../repositories/PageRepository";
import { NotFoundError } from "../errors/AppError";
import type { PagePreview } from "../../models/PagePreview";

export function getPagePreviewById(
  pageRepository: PageRepository,
  id: string
): PagePreview {
  const page = pageRepository.findById(id);

  if (!page) {
    throw new NotFoundError("Page not found");
  }

  return page;
}
