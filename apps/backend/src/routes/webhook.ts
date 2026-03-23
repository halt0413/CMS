import { Hono } from "hono";

const webhook = new Hono();

webhook.post("/", async (c) => {
  const payload = await c.req.json<unknown>();
  return c.json({ received: true, payload });
});

export { webhook };
