import type { AuthUser } from "../domain/auth";

export type MeResponse = {
  user: AuthUser;
};

export type LogoutResponse = {
  loggedOut: true;
};
