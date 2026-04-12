import type { CmsPage, CmsPageId } from "@repo/types";
import { normalizeSlug } from "@repo/utils";
import type { D1Database } from "../db/d1";
import type { PageRepository } from "../../services/ports";

type PageRow = {
  body: string;
  content_type: string;
  created_at: string;
  id: string;
  published_at: string | null;
  slug: string;
  status: "draft" | "published";
  title: string;
  updated_at: string;
};

const DEFAULT_CONTENT_TYPE = "content";

export class D1PageRepository implements PageRepository {
  constructor(private readonly database: D1Database) {}

  async delete(id: CmsPageId): Promise<void> {
    await this.database.prepare("delete from pages where id = ?").bind(id).run();
  }

  async findById(id: CmsPageId): Promise<CmsPage | undefined> {
    const row = await this.database
      .prepare(
        `
          select id, slug, title, body, status, published_at, created_at, updated_at, content_type
          from pages
          where id = ?
        `
      )
      .bind(id)
      .first<PageRow>();

    return row ? this.toPage(row) : undefined;
  }

  async findBySlug(slug: string): Promise<CmsPage | undefined> {
    const normalizedSlug = normalizeSlug(slug);
    const row = await this.database
      .prepare(
        `
          select id, slug, title, body, status, published_at, created_at, updated_at, content_type
          from pages
          where slug = ?
        `
      )
      .bind(normalizedSlug)
      .first<PageRow>();

    return row ? this.toPage(row) : undefined;
  }

  async list(): Promise<CmsPage[]> {
    const result = await this.database.prepare(
      `
        select id, slug, title, body, status, published_at, created_at, updated_at, content_type
        from pages
        order by updated_at desc
      `
    ).all<PageRow>();

    return (result.results ?? []).map((row) => this.toPage(row));
  }

  async save(page: CmsPage): Promise<CmsPage> {
    await this.database
      .prepare(
        `
          insert into pages (
            id,
            slug,
            title,
            body,
            content_type,
            status,
            published_at,
            created_at,
            updated_at
          ) values (?, ?, ?, ?, ?, ?, ?, ?, ?)
          on conflict(id) do update set
            slug = excluded.slug,
            title = excluded.title,
            body = excluded.body,
            content_type = excluded.content_type,
            status = excluded.status,
            published_at = excluded.published_at,
            created_at = excluded.created_at,
            updated_at = excluded.updated_at
        `
      )
      .bind(
        page.id,
        page.slug,
        page.title,
        page.body,
        DEFAULT_CONTENT_TYPE,
        page.status,
        page.status === "published" ? page.publishedAt : null,
        page.createdAt,
        page.updatedAt
      )
      .run();

    return page;
  }

  private toPage(row: PageRow): CmsPage {
    if (row.status === "published" && row.published_at) {
      return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        body: row.body,
        status: "published",
        publishedAt: row.published_at,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      };
    }

    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      body: row.body,
      status: "draft",
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}
