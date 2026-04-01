import type { CmsPage, CmsPageInput } from "@repo/types";
import { buildPage } from "../../domain/page/buildPage";
import type { PageRepository } from "../ports";

type CreatePageDependencies = {
  createId: () => string;
  getNow: () => string;
  pageRepository: PageRepository;
};

export function createPage(
  input: CmsPageInput,
  { createId, getNow, pageRepository }: CreatePageDependencies
): CmsPage {
  const page = buildPage(input, {
    id: createId(),
    now: getNow()
  });

  return pageRepository.save(page);
}
