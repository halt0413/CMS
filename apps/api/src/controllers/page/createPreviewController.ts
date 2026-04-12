import { toPageContent } from "@repo/content";
import type { CmsPreviewResponse } from "@repo/types";
import type { Context } from "hono";
import { BadRequestError } from "../../lib/errors/AppError";
import type { PreviewControllerHandlers } from "./types";

export function createPreviewController({
  getPagePreviewBySlug
}: PreviewControllerHandlers) {
  return {
    async get(c: Context) {
      const slug = c.req.param("slug");

      if (!slug) {
        throw new BadRequestError("slug is required");
      }

      const page = await getPagePreviewBySlug(slug);
      const response: CmsPreviewResponse = {
        slug: page.slug,
        status: "preview",
        content: toPageContent(page)
      };

      return c.json(response);
    }
  };
}
