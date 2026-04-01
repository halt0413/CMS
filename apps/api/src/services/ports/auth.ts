import type { AuthUser } from "@repo/types";

export type GitHubOAuthAuthorizeInput = {
  state: string;
};

export interface GitHubOAuthGateway {
  createAuthorizationUrl(input: GitHubOAuthAuthorizeInput): string;
  exchangeCodeForAccessToken(code: string): Promise<string>;
  getUser(accessToken: string): Promise<AuthUser>;
}

export type OAuthState = {
  id: string;
  redirectUrl: string;
  createdAt: string;
};

export interface OAuthStateRepository {
  create(state: OAuthState): void;
  consume(id: string): OAuthState | null;
}

export type AuthSession = {
  id: string;
  user: AuthUser;
  createdAt: string;
};

export interface SessionRepository {
  create(session: AuthSession): void;
  get(id: string): AuthSession | null;
  delete(id: string): void;
}
