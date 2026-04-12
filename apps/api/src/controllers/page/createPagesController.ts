import { cmsPageSchema, toPageContent } from "@repo/content";
import type {
  CmsPageCreateResponse,
  CmsPageItemResponse,
  CmsPageListResponse,
  CmsPreviewResponse,
  GitHubSyncResponse
} from "@repo/types";
import type { Context } from "hono";
import { BadRequestError } from "../../lib/errors/AppError";
import type { PagesControllerHandlers } from "./types";

export function createPagesController({
  createPage,
  getPage,
  getPagePreviewById,
  listPages,
  syncPageToGitHub
}: PagesControllerHandlers) {
  return {
    async list(c: Context) {
      const items = await listPages();
      const response: CmsPageListResponse = {
        items,
        total: items.length
      };

      return c.json(response);
    },
    async get(c: Context) {
      const page = await getPage(requireRouteParam(c, "id"));
      const response: CmsPageItemResponse = {
        item: page
      };

      return c.json(response);
    },
    async create(c: Context) {
      const payload = await c.req.json();
      const created = await createPage(cmsPageSchema.parse(payload));
      const response: CmsPageCreateResponse = {
        created
      };

      return c.json(response, 201);
    },
    async preview(c: Context) {
      const page = await getPagePreviewById(requireRouteParam(c, "id"));
      const response: CmsPreviewResponse = {
        slug: page.slug,
        status: "preview",
        content: toPageContent(page)
      };

      return c.json(response);
    },
    async syncGitHub(c: Context) {
      const result = await syncPageToGitHub(requireRouteParam(c, "id"));
      const response: GitHubSyncResponse = {
        synced: {
          pageId: result.pageId,
          issue: result.issue
        }
      };

      return c.json(response, 201);
    }
  };
}

function requireRouteParam(c: Context, name: string): string {
  const value = c.req.param(name);

  if (!value) {
    throw new BadRequestError(`${name} is required`);
  }

  return value;
}
