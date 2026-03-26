import { Hono } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { AppError } from "../../services/errors/AppError";
import { createAuthMiddleware } from "../../middleware/auth";
import { createPagesRouter } from "./routes/createPagesRouter";
import { createPreviewRouter } from "./routes/createPreviewRouter";
import { createWebhookRouter } from "./routes/createWebhookRouter";

type CreateAppDependencies = {
  adminApiToken: string;
  createPage: Parameters<typeof createPagesRouter>[0]["createPage"];
  getPage: Parameters<typeof createPagesRouter>[0]["getPage"];
  getPagePreviewById: Parameters<typeof createPagesRouter>[0]["getPreview"];
  getPagePreviewBySlug: Parameters<typeof createPreviewRouter>[0]["getPreviewBySlug"];
  listPages: Parameters<typeof createPagesRouter>[0]["listPages"];
  syncPageToGitHub: Parameters<typeof createPagesRouter>[0]["syncPageToGitHub"];
};

export function createApp({
  adminApiToken,
  createPage,
  getPage,
  getPagePreviewById,
  getPagePreviewBySlug,
  listPages,
  syncPageToGitHub
}: CreateAppDependencies) {
  const app = new Hono();
  const auth = createAuthMiddleware(adminApiToken);

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

  app.get("/", (c) =>
    c.json({
      name: "cms-api",
      status: "ok"
    })
  );

  app.use("/pages", auth);
  app.use("/pages/*", auth);
  app.use("/preview/*", auth);

  app.route(
    "/pages",
    createPagesRouter({
      createPage,
      getPage,
      getPreview: getPagePreviewById,
      listPages,
      syncPageToGitHub
    })
  );
  app.route(
    "/preview",
    createPreviewRouter({
      getPreviewBySlug: getPagePreviewBySlug
    })
  );
  app.route("/webhook", createWebhookRouter());

  return app;
}
