import type { CmsPage } from "@repo/types";
import type { PageRepository } from "../../repositories/PageRepository";

export function listPages(pageRepository: PageRepository): CmsPage[] {
  return pageRepository.list();
}
