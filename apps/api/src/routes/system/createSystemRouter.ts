import { Hono } from "hono";
import type { createSystemController } from "../../controllers/system/createSystemController";

type SystemRouterDependencies = {
  controller: ReturnType<typeof createSystemController>;
};

export function createSystemRouter({ controller }: SystemRouterDependencies) {
  const router = new Hono();

  router.get("/", controller.health);
  router.get("/me", controller.me);

  return router;
}
