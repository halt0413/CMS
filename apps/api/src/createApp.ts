import { Hono } from "hono";
import { cors } from "hono/cors";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { createAuthController } from "./controllers/auth/createAuthController";
import { createContentsController } from "./controllers/content/createContentsController";
import { createGitHubController } from "./controllers/github/createGitHubController";
import { createPreviewController } from "./controllers/page/createPreviewController";
import { createSystemController } from "./controllers/system/createSystemController";
import type { CreateAppDependencies } from "./app/types";
import { createWebhookController } from "./controllers/webhook/createWebhookController";
import { AppError } from "./lib/errors/AppError";
import { createAuthMiddleware } from "./middleware/auth";
import { createAuthRouter } from "./routes/auth/createAuthRouter";
import { createContentsRouter } from "./routes/content/createContentsRouter";
import { createGitHubRouter } from "./routes/internal/github/createGitHubRouter";
import { createPreviewRouter } from "./routes/page/createPreviewRouter";
import { createSystemRouter } from "./routes/system/createSystemRouter";
import { createWebhookRouter } from "./routes/webhook/createWebhookRouter";
import { createOpenApiDocument } from "./docs/openapi";
import { renderSwaggerUiHtml } from "./docs/swaggerUi";

export function createApp({
  adminApiToken,
  addIssueLabels,
  completeGitHubLogin,
  cookieSecure,
  createContent,
  createIssue,
  deleteContent,
  getContent,
  getContentPreviewById,
  getCurrentUser,
  getIssue,
  getPagePreviewBySlug,
  githubWebhookSecret,
  listContents,
  listIssues,
  logout,
  sessionCookieName,
  sessionRepository,
  startGitHubLogin,
  updateContent,
  updateIssue,
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
  const contentsController = createContentsController({
    createContent,
    deleteContent,
    getContent,
    getContentPreviewById,
    listContents,
    updateContent
  });
  const gitHubController = createGitHubController({
    addIssueLabels,
    createIssue,
    getIssue,
    listIssues,
    updateIssue
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
  app.get("/openapi.json", (c) =>
    c.json(
      createOpenApiDocument({
        includeGitHubWebhook: Boolean(githubWebhookSecret),
        sessionCookieName
      })
    )
  );
  app.get("/docs", (c) => c.html(renderSwaggerUiHtml("/openapi.json")));
  app.route("/auth", createAuthRouter(authController));

  // previewと内部GitHub操作は管理トークンまたはログインセッションを要求する
  app.use("/preview/*", auth);
  app.use("/internal/github", auth);
  app.use("/internal/github/*", auth);

  app.route(
    "/contents",
    createContentsRouter({
      auth,
      controller: contentsController
    })
  );
  app.route("/internal/github", createGitHubRouter(gitHubController));
  app.route("/preview", createPreviewRouter(previewController));

  if (githubWebhookSecret) {
    // secret未設定の環境ではwebhook endpoint自体を公開しない
    app.route(
      "/webhooks/github",
      createWebhookRouter(
        createWebhookController({
          secret: githubWebhookSecret
        })
      )
    );
  }

  return app;
}
