import type { CmsPage, CmsPageId } from "@repo/types";
import { NotFoundError } from "../../lib/errors/AppError";
import type { PageRepository } from "../ports";

export async function getPage(
  pageRepository: PageRepository,
  id: CmsPageId
): Promise<CmsPage> {
  const page = await pageRepository.findById(id);

  if (!page) {
    throw new NotFoundError("Page not found");
  }

  return page;
}
