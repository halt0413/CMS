import { Hono } from "hono";
import type { MiddlewareHandler } from "hono";
import type { createContentsController } from "../../controllers/content/createContentsController";

type ContentsRouterDependencies = {
  auth: MiddlewareHandler;
  controller: ReturnType<typeof createContentsController>;
};

export function createContentsRouter({
  auth,
  controller
}: ContentsRouterDependencies) {
  const router = new Hono();

  router.get("/", controller.list);
  router.get("/:id", controller.get);
  router.get("/:id/preview", auth, controller.preview);
  router.post("/", auth, controller.create);
  router.patch("/:id", auth, controller.update);
  router.delete("/:id", auth, controller.remove);

  return router;
}
