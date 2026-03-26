import type { CmsPage, CmsPageId } from "@repo/types";
import type { PageRepository } from "../../repositories/PageRepository";
import { NotFoundError } from "../errors/AppError";

export function getPage(pageRepository: PageRepository, id: CmsPageId): CmsPage {
  const page = pageRepository.findById(id);

  if (!page) {
    throw new NotFoundError("Page not found");
  }

  return page;
}
