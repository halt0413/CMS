import type { SessionRepository } from "../services/ports";
import type { AuthControllerHandlers } from "../controllers/auth/types";
import type {
  PagesControllerHandlers,
  PreviewControllerHandlers
} from "../controllers/page/types";
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
  PagesControllerHandlers &
  PreviewControllerHandlers &
  MeControllerHandler &
  AppHttpInfrastructure;
