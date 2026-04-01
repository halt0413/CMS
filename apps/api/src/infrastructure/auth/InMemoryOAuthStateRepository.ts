import type { OAuthState, OAuthStateRepository } from "../../services/ports/index";

export class InMemoryOAuthStateRepository implements OAuthStateRepository {
  private readonly states = new Map<string, OAuthState>();

  create(state: OAuthState): void {
    this.states.set(state.id, state);
  }

  consume(id: string): OAuthState | null {
    const state = this.states.get(id);

    if (!state) {
      return null;
    }

    this.states.delete(id);
    return state;
  }
}
