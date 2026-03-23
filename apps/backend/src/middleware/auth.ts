import type { MiddlewareHandler } from "hono";

export const auth: MiddlewareHandler = async (c, next) => {
  const token = process.env.ADMIN_API_TOKEN;

  if (!token) {
    return c.json({ error: "ADMIN_API_TOKEN is not set" }, 500);
  }

  const authorization = c.req.header("authorization");
  if (authorization !== `Bearer ${token}`) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  await next();
};
