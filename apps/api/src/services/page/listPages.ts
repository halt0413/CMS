import type { CmsPage } from "@repo/types";
import type { PageRepository } from "../ports";

export function listPages(pageRepository: PageRepository): CmsPage[] {
  return pageRepository.list();
}
