import type { AuthUser } from "@repo/types";
import { UnauthorizedError } from "../../lib/errors/AppError";
import type { SessionRepository } from "../ports";

export function getCurrentUser(
  sessionId: string | undefined,
  sessionRepository: SessionRepository
): AuthUser {
  if (!sessionId) {
    throw new UnauthorizedError();
  }

  const session = sessionRepository.get(sessionId);

  if (!session) {
    throw new UnauthorizedError();
  }

  return session.user;
}
