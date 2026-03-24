import { Hono } from "hono";
import type { PreviewResponse } from "@repo/types";

const preview = new Hono();

preview.get("/:slug", (c) => {
  const slug = c.req.param("slug");
  const response: PreviewResponse = { slug, status: "preview" };

  return c.json(response);
});

export { preview };
