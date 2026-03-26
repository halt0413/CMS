import type { CmsPage, CmsPageId } from "@repo/types";

export interface PageRepository {
  findById(id: CmsPageId): CmsPage | undefined;
  findBySlug(slug: string): CmsPage | undefined;
  list(): CmsPage[];
  save(page: CmsPage): CmsPage;
}
