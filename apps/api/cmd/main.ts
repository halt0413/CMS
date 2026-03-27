import { loadEnvFile } from "node:process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { serve } from "@hono/node-server";
import { createPage as executeCreatePage } from "../src/services/page/createPage";
import { getPage } from "../src/services/page/getPage";
import { getPagePreview } from "../src/services/page/getPagePreview";
import { getPagePreviewById as executeGetPagePreviewById } from "../src/services/page/getPagePreviewById";
import { listPages as executeListPages } from "../src/services/page/listPages";
import { syncPageToGitHub as executeSyncPageToGitHub } from "../src/services/page/syncPageToGitHub";
import { createApp } from "../src/handlers/http/createApp";
import { InMemoryPageRepository } from "../src/repositories/InMemoryPageRepository";
import { OctokitGitHubIssueGateway } from "../src/repositories/OctokitGitHubIssueGateway";

const rootEnvPath = resolve(dirname(fileURLToPath(import.meta.url)), "../../../.env");
loadEnvFile(rootEnvPath);

const config = {
  adminApiToken: process.env.ADMIN_API_TOKEN ?? "dev-admin-token",
  github: {
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    token: process.env.GITHUB_TOKEN
  }
};

const pageRepository = new InMemoryPageRepository();
const gitHubIssueGateway = new OctokitGitHubIssueGateway(config.github);

const app = createApp({
  adminApiToken: config.adminApiToken,
  listPages: () => executeListPages(pageRepository),
  getPage: (id) => getPage(pageRepository, id),
  createPage: (input) =>
    executeCreatePage(input, {
      pageRepository,
      createId: () => crypto.randomUUID(),
      getNow: () => new Date().toISOString()
    }),
  getPagePreviewById: (id) => executeGetPagePreviewById(pageRepository, id),
  getPagePreviewBySlug: (slug) => getPagePreview(pageRepository, slug),
  syncPageToGitHub: (id) =>
    executeSyncPageToGitHub(id, {
      pageRepository,
      gitHubIssueGateway
    })
});

const port = Number(process.env.PORT ?? 8787);

serve({
  fetch: app.fetch,
  port
});

console.log(`API is running on http://localhost:${port}`);
