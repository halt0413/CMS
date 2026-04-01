import { NotFoundError } from "../../lib/errors/AppError";
import type { PageRepository } from "../ports";
import type { PagePreview } from "./getPagePreview";

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
