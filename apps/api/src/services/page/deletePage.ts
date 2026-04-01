import type { CmsPageId } from "@repo/types";
import { NotFoundError } from "../../lib/errors/AppError";
import type { PageRepository } from "../ports";

export function deletePage(
  pageRepository: PageRepository,
  id: CmsPageId
): { deleted: true; id: CmsPageId } {
  const page = pageRepository.findById(id);

  if (!page) {
    throw new NotFoundError("Page not found");
  }

  pageRepository.delete(id);

  return {
    deleted: true,
    id
  };
}
