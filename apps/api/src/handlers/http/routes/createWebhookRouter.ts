import type { WebhookResponse } from "@repo/types";
import { Hono } from "hono";

export function createWebhookRouter() {
  const router = new Hono();

  router.post("/", async (c) => {
    const payload = await c.req.json<unknown>();
    const response: WebhookResponse = {
      received: true,
      payload
    };

    return c.json(response);
  });

  return router;
}
