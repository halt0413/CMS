import type { SessionRepository } from "../services/ports";
import type { AuthControllerHandlers } from "../controllers/auth/types";
import type { ContentsControllerHandlers } from "../controllers/content/types";
import type { GitHubControllerHandlers } from "../controllers/github/types";
import type { PreviewControllerHandlers } from "../controllers/page/types";
import type { MeControllerHandler } from "../controllers/system/types";

export type AppHttpConfig = {
  adminApiToken: string;
  cookieSecure: boolean;
  githubWebhookSecret?: string;
  sessionCookieName: string;
  webOrigin: string;
};

export type AppHttpInfrastructure = {
  sessionRepository: SessionRepository;
};

export type CreateAppDependencies = AppHttpConfig &
  AuthControllerHandlers &
  ContentsControllerHandlers &
  GitHubControllerHandlers &
  PreviewControllerHandlers &
  MeControllerHandler &
  AppHttpInfrastructure;
