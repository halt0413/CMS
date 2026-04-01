import type { CmsPage, CmsPageId } from "@repo/types";

export interface PageRepository {
  delete(id: CmsPageId): void;
  findById(id: CmsPageId): CmsPage | undefined;
  findBySlug(slug: string): CmsPage | undefined;
  list(): CmsPage[];
  save(page: CmsPage): CmsPage;
}
