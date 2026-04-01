import type { AuthSession, SessionRepository } from "../../services/ports/index";

export class InMemorySessionRepository implements SessionRepository {
  private readonly sessions = new Map<string, AuthSession>();

  create(session: AuthSession): void {
    this.sessions.set(session.id, session);
  }

  get(id: string): AuthSession | null {
    const session = this.sessions.get(id);

    if (!session) {
      return null;
    }

    return session;
  }

  delete(id: string): void {
    this.sessions.delete(id);
  }
}
