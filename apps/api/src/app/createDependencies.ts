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
import { createIssue } from "../services/github/createIssue";
import { getIssue } from "../services/github/getIssue";
import { listIssues } from "../services/github/listIssues";
import { updateIssue } from "../services/github/updateIssue";
import { updateIssueLabels } from "../services/github/updateIssueLabels";
import { createPage } from "../services/page/createPage";
import { deletePage } from "../services/page/deletePage";
import { getPage } from "../services/page/getPage";
import { getPagePreview } from "../services/page/getPagePreview";
import { getPagePreviewById } from "../services/page/getPagePreviewById";
import { listPages } from "../services/page/listPages";
import { updatePage } from "../services/page/updatePage";

type RuntimeDependencies = {
  createId: () => string;
  getNow: () => string;
};

export function createApiDependencies(
  env: ApiEnv,
  { createId, getNow }: RuntimeDependencies
): CreateAppDependencies {
  // Infrastructureの実装をここで束ねて、HTTP層へはusecaseだけを渡す
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
    createContent: (input) =>
      createPage(input, {
        pageRepository,
        createId,
        getNow
      }),
    createIssue: (input) => createIssue(gitHubIssueGateway, input),
    deleteContent: (id: string) => deletePage(pageRepository, id),
    getCurrentUser: (sessionId: string | undefined) =>
      getCurrentUser(sessionId, sessionRepository),
    getContent: (id: string) => getPage(pageRepository, id),
    getContentPreviewById: (id: string) => getPagePreviewById(pageRepository, id),
    getIssue: (issueNumber: number) => getIssue(gitHubIssueGateway, issueNumber),
    getPagePreviewBySlug: (slug: string) => getPagePreview(pageRepository, slug),
    githubWebhookSecret: env.githubWebhookSecret,
    listContents: () => listPages(pageRepository),
    listIssues: () => listIssues(gitHubIssueGateway),
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
    addIssueLabels: (issueNumber, labels) =>
      updateIssueLabels(gitHubIssueGateway, issueNumber, labels),
    updateContent: (id, input) =>
      updatePage(id, input, {
        getNow,
        pageRepository
      }),
    updateIssue: (issueNumber, input) =>
      updateIssue(gitHubIssueGateway, issueNumber, input),
    webOrigin: new URL(env.cmsUrl).origin
  };
}

export function createApiApp(env: ApiEnv, runtime: RuntimeDependencies) {
  return createApp(createApiDependencies(env, runtime));
}
