import { resolveAuthRedirectUrl } from "../../domain/auth/resolveAuthRedirectUrl";
import type { GitHubOAuthGateway, OAuthStateRepository } from "../ports";

type StartGitHubLoginDependencies = {
  cmsUrl: string;
  createId: () => string;
  getNow: () => string;
  gitHubOAuthGateway: GitHubOAuthGateway;
  oAuthStateRepository: OAuthStateRepository;
};

type StartGitHubLoginResult = {
  authorizationUrl: string;
};

export function startGitHubLogin(
  redirectTo: string | undefined,
  {
    cmsUrl,
    createId,
    getNow,
    gitHubOAuthGateway,
    oAuthStateRepository
  }: StartGitHubLoginDependencies
): StartGitHubLoginResult {
  const state = createId();
  const redirectUrl = resolveAuthRedirectUrl(cmsUrl, redirectTo);

  oAuthStateRepository.create({
    id: state,
    redirectUrl,
    createdAt: getNow()
  });

  return {
    authorizationUrl: gitHubOAuthGateway.createAuthorizationUrl({ state })
  };
}
