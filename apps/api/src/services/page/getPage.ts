import type { CmsPage, CmsPageId } from "@repo/types";
import { NotFoundError } from "../../lib/errors/AppError";
import type { PageRepository } from "../ports";

export function getPage(pageRepository: PageRepository, id: CmsPageId): CmsPage {
  const page = pageRepository.findById(id);

  if (!page) {
    throw new NotFoundError("Page not found");
  }

  return page;
}
