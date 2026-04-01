import { Hono } from "hono";
import type { createWebhookController } from "../../controllers/webhook/createWebhookController";

type WebhookRouterDependencies = ReturnType<typeof createWebhookController>;

export function createWebhookRouter(controller: WebhookRouterDependencies) {
  const router = new Hono();

  router.post("/", controller.receive);

  return router;
}
