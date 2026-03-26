import type { CmsPage, CmsPageId, CmsPageInput } from "@repo/types";
import { normalizeSlug } from "@repo/utils";
import { buildPage } from "../models/buildPage";
import type { PageRepository } from "./PageRepository";

const seedPages: Array<{ id: string; input: CmsPageInput; now: string }> = [
  {
    id: "seed-welcome",
    input: {
      slug: "welcome",
      title: "Welcome",
      body: "Initial CMS page",
      status: "published"
    },
    now: "2026-03-26T00:00:00.000Z"
  },
  {
    id: "seed-roadmap",
    input: {
      slug: "roadmap",
      title: "Roadmap",
      body: "Draft page for upcoming updates",
      status: "draft"
    },
    now: "2026-03-26T00:00:00.000Z"
  }
];

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
