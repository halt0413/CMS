import { Hono } from "hono";
import type { WebhookResponse } from "@repo/types";

const webhook = new Hono();

webhook.post("/", async (c) => {
  const payload = await c.req.json<unknown>();
  const response: WebhookResponse = { received: true, payload };

  return c.json(response);
});

export { webhook };
