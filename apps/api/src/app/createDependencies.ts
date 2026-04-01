import { createApp } from "../createApp";
import type { ApiEnv } from "../config/env";
import type { CreateAppDependencies } from "./types";
import { InMemoryOAuthStateRepository } from "../infrastructure/auth/InMemoryOAuthStateRepository";
import { InMemorySessionRepository } from "../infrastructure/auth/InMemorySessionRepository";
import { GitHubOAuthApi } from "../infrastructure/github/GitHubOAuthApi";
import { OctokitGitHubIssueGateway } from "../infrastructure/github/OctokitGitHubIssueGateway";
import { InMemoryPageRepository } from "../infrastructure/page/InMemoryPageRepository";
import { completeGitHubLogin } from "../services/auth/completeGitHubLogin";
import { getCurrentUser } from "../services/auth/getCurrentUser";
import { logout } from "../services/auth/logout";
import { startGitHubLogin } from "../services/auth/startGitHubLogin";
import { createPage } from "../services/page/createPage";
import { getPage } from "../services/page/getPage";
import { getPagePreview } from "../services/page/getPagePreview";
import { getPagePreviewById } from "../services/page/getPagePreviewById";
import { listPages } from "../services/page/listPages";
import { syncPageToGitHub } from "../services/page/syncPageToGitHub";

type RuntimeDependencies = {
  createId: () => string;
  getNow: () => string;
};

export function createApiDependencies(
  env: ApiEnv,
  { createId, getNow }: RuntimeDependencies
): CreateAppDependencies {
  const pageRepository = new InMemoryPageRepository();
  const sessionRepository = new InMemorySessionRepository();
  const oAuthStateRepository = new InMemoryOAuthStateRepository();
  const gitHubIssueGateway = new OctokitGitHubIssueGateway(env.github);
  const gitHubOAuthGateway = new GitHubOAuthApi(env.githubOAuth);

  return {
    adminApiToken: env.adminApiToken,
    completeGitHubLogin: (input: { code?: string; state?: string }) =>
      completeGitHubLogin(input, {
        createId,
        getNow,
        gitHubOAuthGateway,
        oAuthStateRepository,
        oAuthStateTtlSeconds: env.githubOAuth.stateTtlSeconds,
        sessionRepository
      }),
    cookieSecure: env.session.cookieSecure,
    createPage: (input) =>
      createPage(input, {
        pageRepository,
        createId,
        getNow
      }),
    getCurrentUser: (sessionId: string | undefined) =>
      getCurrentUser(sessionId, sessionRepository),
    getPage: (id: string) => getPage(pageRepository, id),
    getPagePreviewById: (id: string) => getPagePreviewById(pageRepository, id),
    getPagePreviewBySlug: (slug: string) => getPagePreview(pageRepository, slug),
    githubWebhookSecret: env.githubWebhookSecret,
    listPages: () => listPages(pageRepository),
    logout: (sessionId: string | undefined) => logout(sessionId, sessionRepository),
    sessionCookieName: env.session.cookieName,
    sessionRepository,
    startGitHubLogin: (redirectTo: string | undefined) =>
      startGitHubLogin(redirectTo, {
        cmsUrl: env.cmsUrl,
        createId,
        getNow,
        gitHubOAuthGateway,
        oAuthStateRepository
      }),
    syncPageToGitHub: (id: string) =>
      syncPageToGitHub(id, {
        pageRepository,
        gitHubIssueGateway
      }),
    webOrigin: new URL(env.cmsUrl).origin
  };
}

export function createApiApp(env: ApiEnv, runtime: RuntimeDependencies) {
  return createApp(createApiDependencies(env, runtime));
}
