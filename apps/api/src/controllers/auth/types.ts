import type { LogoutResponse } from "@repo/types";
import type { CompleteGitHubLoginResult } from "../../services/auth/completeGitHubLogin";

export type AuthControllerHandlers = {
  completeGitHubLogin: (input: {
    code?: string;
    state?: string;
  }) => Promise<CompleteGitHubLoginResult>;
  logout: (sessionId: string | undefined) => LogoutResponse;
  startGitHubLogin: (redirectTo: string | undefined) => {
    authorizationUrl: string;
  };
};
