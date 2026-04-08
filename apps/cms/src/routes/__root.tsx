import { Outlet } from "@tanstack/react-router";
import { ProtectedLayout } from "../components/layouts/ProtectedLayout/ProtectedLayout";

export function RootRouteView() {
  return (
    <ProtectedLayout>
      <Outlet />
    </ProtectedLayout>
  );
}
