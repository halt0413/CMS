import { Hono } from "hono";
import type { createPagesController } from "../../controllers/page/createPagesController";

type PagesRouterDependencies = ReturnType<typeof createPagesController>;

export function createPagesRouter(controller: PagesRouterDependencies) {
  const router = new Hono();

  router.get("/", controller.list);
  router.get("/:id", controller.get);
  router.post("/", controller.create);
  router.get("/:id/preview", controller.preview);
  router.post("/:id/sync/github", controller.syncGitHub);

  return router;
}
