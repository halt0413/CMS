import { Hono } from "hono";
import type { PagePreview } from "../../../models/PagePreview";
import { toCmsPreviewResponse } from "../presenters/pagePresenter";

type PreviewRouterDependencies = {
  getPreviewBySlug: (slug: string) => PagePreview;
};

export function createPreviewRouter({ getPreviewBySlug }: PreviewRouterDependencies) {
  const router = new Hono();

  router.get("/:slug", (c) =>
    c.json(toCmsPreviewResponse(getPreviewBySlug(c.req.param("slug"))))
  );

  return router;
}
