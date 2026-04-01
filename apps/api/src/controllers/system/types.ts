import type { AuthUser } from "@repo/types";

export type MeControllerHandler = {
  getCurrentUser: (sessionId: string | undefined) => AuthUser;
};
