import { cmsPageSchema } from "@repo/content";
import type { CmsPage, CmsPageInput } from "@repo/types";
import { Hono } from "hono";
import type { PagePreview } from "../../../models/PagePreview";
import type { SyncPageToGitHubResult } from "../../../models/SyncPageToGitHubResult";
import {
  toCmsPageCreateResponse,
  toCmsPageItemResponse,
  toCmsPageListResponse,
  toCmsPreviewResponse,
  toGitHubSyncResponse
} from "../presenters/pagePresenter";

type PagesRouterDependencies = {
  createPage: (payload: CmsPageInput) => CmsPage;
  getPage: (id: string) => CmsPage;
  getPreview: (id: string) => PagePreview;
  listPages: () => CmsPage[];
  syncPageToGitHub: (id: string) => Promise<SyncPageToGitHubResult>;
};

export function createPagesRouter({
  createPage,
  getPage,
  getPreview,
  listPages,
  syncPageToGitHub
}: PagesRouterDependencies) {
  const router = new Hono();

  router.get("/", (c) => {
    const items = listPages();
    return c.json(toCmsPageListResponse(items));
  });

  router.get("/:id", (c) => {
    const page = getPage(c.req.param("id"));
    return c.json(toCmsPageItemResponse(page));
  });

  router.post("/", async (c) => {
    const payload = await c.req.json<unknown>();
    const created = createPage(cmsPageSchema.parse(payload));

    return c.json(toCmsPageCreateResponse(created), 201);
  });

  router.get("/:id/preview", (c) =>
    c.json(toCmsPreviewResponse(getPreview(c.req.param("id"))))
  );

  router.post("/:id/sync/github", async (c) => {
    const response = await syncPageToGitHub(c.req.param("id"));
    return c.json(toGitHubSyncResponse(response), 201);
  });

  return router;
}
