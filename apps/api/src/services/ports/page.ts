import type { CmsPage, CmsPageId } from "@repo/types";

export interface PageRepository {
  delete(id: CmsPageId): Promise<void>;
  findById(id: CmsPageId): Promise<CmsPage | undefined>;
  findBySlug(slug: string): Promise<CmsPage | undefined>;
  list(): Promise<CmsPage[]>;
  save(page: CmsPage): Promise<CmsPage>;
}
