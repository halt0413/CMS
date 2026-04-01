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

  findById(id: CmsPageId): CmsPage | undefined {
    return this.pages.get(id);
  }

  delete(id: CmsPageId): void {
    this.pages.delete(id);
  }

  findBySlug(slug: string): CmsPage | undefined {
    const normalizedSlug = normalizeSlug(slug);

    return this.list().find((page) => page.slug === normalizedSlug);
  }

  list(): CmsPage[] {
    return Array.from(this.pages.values()).sort((a, b) =>
      b.updatedAt.localeCompare(a.updatedAt)
    );
  }

  save(page: CmsPage): CmsPage {
    this.pages.set(page.id, page);
    return page;
  }
}
