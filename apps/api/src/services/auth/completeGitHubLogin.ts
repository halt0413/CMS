import { BadRequestError, UnauthorizedError } from "../../lib/errors/AppError";
import { isOAuthStateExpired } from "../../domain/auth/isOAuthStateExpired";
import type {
  GitHubOAuthGateway,
  OAuthStateRepository,
  SessionRepository
} from "../ports";

export type CompleteGitHubLoginResult = {
  redirectUrl: string;
  sessionId: string;
  user: Awaited<ReturnType<GitHubOAuthGateway["getUser"]>>;
};

type CompleteGitHubLoginDependencies = {
  createId: () => string;
  getNow: () => string;
  gitHubOAuthGateway: GitHubOAuthGateway;
  oAuthStateRepository: OAuthStateRepository;
  oAuthStateTtlSeconds: number;
  sessionRepository: SessionRepository;
};

export async function completeGitHubLogin(
  input: {
    code?: string;
    state?: string;
  },
  {
    createId,
    getNow,
    gitHubOAuthGateway,
    oAuthStateRepository,
    oAuthStateTtlSeconds,
    sessionRepository
  }: CompleteGitHubLoginDependencies
): Promise<CompleteGitHubLoginResult> {
  if (!input.code || !input.state) {
    throw new BadRequestError("GitHub callback requires code and state");
  }

  const authState = oAuthStateRepository.consume(input.state);

  if (!authState) {
    throw new UnauthorizedError("Invalid OAuth state");
  }

  const now = getNow();

  if (isOAuthStateExpired(authState.createdAt, now, oAuthStateTtlSeconds)) {
    throw new UnauthorizedError("Expired OAuth state");
  }

  const accessToken = await gitHubOAuthGateway.exchangeCodeForAccessToken(
    input.code
  );
  const user = await gitHubOAuthGateway.getUser(accessToken);
  const sessionId = createId();

  sessionRepository.create({
    id: sessionId,
    user,
    createdAt: now
  });

  return {
    redirectUrl: authState.redirectUrl,
    sessionId,
    user
  };
}
