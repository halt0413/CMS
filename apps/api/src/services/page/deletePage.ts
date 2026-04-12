import type { CmsPageId } from "@repo/types";
import { NotFoundError } from "../../lib/errors/AppError";
import type { PageRepository } from "../ports";

export async function deletePage(
  pageRepository: PageRepository,
  id: CmsPageId
): Promise<{ deleted: true; id: CmsPageId }> {
  const page = await pageRepository.findById(id);

  if (!page) {
    throw new NotFoundError("Page not found");
  }

  await pageRepository.delete(id);

  return {
    deleted: true,
    id
  };
}
