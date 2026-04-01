import { Hono } from "hono";
import { cors } from "hono/cors";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { createAuthController } from "./controllers/auth/createAuthController";
import { createPagesController } from "./controllers/page/createPagesController";
import { createPreviewController } from "./controllers/page/createPreviewController";
import { createSystemController } from "./controllers/system/createSystemController";
import type { CreateAppDependencies } from "./app/types";
import { createWebhookController } from "./controllers/webhook/createWebhookController";
import { AppError } from "./lib/errors/AppError";
import { createAuthMiddleware } from "./middleware/auth";
import { createAuthRouter } from "./routes/auth/createAuthRouter";
import { createPagesRouter } from "./routes/page/createPagesRouter";
import { createPreviewRouter } from "./routes/page/createPreviewRouter";
import { createSystemRouter } from "./routes/system/createSystemRouter";
import { createWebhookRouter } from "./routes/webhook/createWebhookRouter";

export function createApp({
  adminApiToken,
  completeGitHubLogin,
  cookieSecure,
  createPage,
  getCurrentUser,
  getPage,
  getPagePreviewById,
  getPagePreviewBySlug,
  githubWebhookSecret,
  listPages,
  logout,
  sessionCookieName,
  sessionRepository,
  startGitHubLogin,
  syncPageToGitHub,
  webOrigin
}: CreateAppDependencies) {
  const app = new Hono();
  const auth = createAuthMiddleware({
    adminApiToken,
    sessionCookieName,
    sessionRepository
  });
  const authController = createAuthController({
    completeGitHubLogin,
    cookieSecure,
    logout,
    sessionCookieName,
    startGitHubLogin
  });
  const pagesController = createPagesController({
    createPage,
    getPage,
    getPagePreviewById,
    listPages,
    syncPageToGitHub
  });
  const previewController = createPreviewController({
    getPagePreviewBySlug
  });
  const systemController = createSystemController({
    getCurrentUser,
    sessionCookieName
  });

  app.use(
    "*",
    cors({
      origin: webOrigin,
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["GET", "POST", "OPTIONS"],
      credentials: true
    })
  );

  app.onError((error, c) => {
    if (error instanceof AppError) {
      return c.json(
        { error: error.message },
        error.statusCode as ContentfulStatusCode
      );
    }

    console.error(error);
    return c.json({ error: "Internal Server Error" }, 500);
  });

  app.route(
    "/",
    createSystemRouter({
      controller: systemController
    })
  );
  app.route("/auth", createAuthRouter(authController));

  // 編集系とpreviewは管理トークンまたはログインセッションを要求する
  app.use("/pages", auth);
  app.use("/pages/*", auth);
  app.use("/preview/*", auth);

  app.route("/pages", createPagesRouter(pagesController));
  app.route("/preview", createPreviewRouter(previewController));

  if (githubWebhookSecret) {
    // secret未設定の環境ではwebhook endpoint自体を公開しない
    app.route(
      "/webhook",
      createWebhookRouter(
        createWebhookController({
          secret: githubWebhookSecret
        })
      )
    );
  }

  return app;
}
