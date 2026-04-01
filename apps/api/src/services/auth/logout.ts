import type { LogoutResponse } from "@repo/types";
import type { SessionRepository } from "../ports";

export function logout(
  sessionId: string | undefined,
  sessionRepository: SessionRepository
): LogoutResponse {
  if (sessionId) {
    sessionRepository.delete(sessionId);
  }

  return {
    loggedOut: true
  };
}
