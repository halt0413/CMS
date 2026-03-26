import type { MiddlewareHandler } from "hono";
import { UnauthorizedError } from "../services/errors/AppError";

export function createAuthMiddleware(token: string): MiddlewareHandler {
  return async (c, next) => {
    const authorization = c.req.header("authorization");

    if (authorization !== `Bearer ${token}`) {
      throw new UnauthorizedError();
    }

    await next();
  };
}
