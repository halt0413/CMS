import { createAuthPaths } from "./paths/auth";
import { createContentsPaths } from "./paths/contents";
import { createGitHubPaths } from "./paths/github";
import { createPreviewPaths } from "./paths/preview";
import { createSystemPaths } from "./paths/system";
import { createGitHubWebhookPaths } from "./paths/webhook";
import { createSecuritySchemes, openApiSchemas } from "./schemas";

type CreateOpenApiDocumentParams = {
  includeGitHubWebhook: boolean;
  sessionCookieName: string;
};

export function createOpenApiDocument({
  includeGitHubWebhook,
  sessionCookieName
}: CreateOpenApiDocumentParams) {
  const paths: Record<string, unknown> = {
    ...createSystemPaths(),
    ...createAuthPaths(),
    ...createContentsPaths(),
    ...createPreviewPaths(),
    ...createGitHubPaths(),
    ...(includeGitHubWebhook ? createGitHubWebhookPaths() : {})
  };

  return {
    openapi: "3.0.3",
    info: {
      title: "CMS API",
      version: "0.1.0"
    },
    servers: [{ url: "/" }],
    components: {
      securitySchemes: createSecuritySchemes(sessionCookieName),
      schemas: openApiSchemas
    },
    paths
  };
}
