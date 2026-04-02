import type { ReactNode } from "react";
import { ProtectedLayout } from "../../components/layouts/ProtectedLayout/ProtectedLayout";

type ProtectedAppLayoutProps = {
  children: ReactNode;
};

export default function ProtectedAppLayout({
  children
}: ProtectedAppLayoutProps) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
