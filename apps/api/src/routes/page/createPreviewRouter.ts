import { Hono } from "hono";
import type { createPreviewController } from "../../controllers/page/createPreviewController";

type PreviewRouterDependencies = ReturnType<typeof createPreviewController>;

export function createPreviewRouter(controller: PreviewRouterDependencies) {
  const router = new Hono();

  router.get("/:slug", controller.get);

  return router;
}
