import { Hono } from "hono";
import type { createAuthController } from "../../controllers/auth/createAuthController";

type AuthRouterDependencies = ReturnType<typeof createAuthController>;

export function createAuthRouter(controller: AuthRouterDependencies) {
  const router = new Hono();

  router.get("/github/login", controller.login);
  router.get("/github/callback", controller.callback);
  router.post("/logout", controller.logout);

  return router;
}
