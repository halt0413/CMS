import type { CmsPage, CmsPageId, CmsPagePatch } from "@repo/types";
import { updatePage as applyPagePatch } from "../../domain/page/updatePage";
import { NotFoundError } from "../../lib/errors/AppError";
import type { PageRepository } from "../ports";

type UpdatePageDependencies = {
  getNow: () => string;
  pageRepository: PageRepository;
};

export async function updatePage(
  id: CmsPageId,
  patch: CmsPagePatch,
  { getNow, pageRepository }: UpdatePageDependencies
): Promise<CmsPage> {
  const current = await pageRepository.findById(id);

  if (!current) {
    throw new NotFoundError("Page not found");
  }

  const updated = applyPagePatch(current, patch, {
    now: getNow()
  });

  return pageRepository.save(updated);
}
