import type { CmsPage, CmsPageId } from "@repo/types";
import { normalizeSlug } from "@repo/utils";
import { buildPage } from "../../domain/page/buildPage";
import type { PageRepository } from "../../services/ports/index";
import { seedPages } from "./seedPages";

export class InMemoryPageRepository implements PageRepository {
  private readonly pages = new Map<CmsPageId, CmsPage>();

  constructor() {
    for (const seed of seedPages) {
      const page = buildPage(seed.input, {
        id: seed.id,
        now: seed.now
      });

      this.pages.set(page.id, page);
    }
  }

  async findById(id: CmsPageId): Promise<CmsPage | undefined> {
    return this.pages.get(id);
  }

  async delete(id: CmsPageId): Promise<void> {
    this.pages.delete(id);
  }

  async findBySlug(slug: string): Promise<CmsPage | undefined> {
    const normalizedSlug = normalizeSlug(slug);

    return (await this.list()).find((page) => page.slug === normalizedSlug);
  }

  async list(): Promise<CmsPage[]> {
    return Array.from(this.pages.values()).sort((a, b) =>
      b.updatedAt.localeCompare(a.updatedAt)
    );
  }

  async save(page: CmsPage): Promise<CmsPage> {
    this.pages.set(page.id, page);
    return page;
  }
}
