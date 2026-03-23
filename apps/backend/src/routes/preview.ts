import { Hono } from "hono";

const preview = new Hono();

preview.get("/:slug", (c) => {
  const slug = c.req.param("slug");
  return c.json({ slug, status: "preview" });
});

export { preview };
