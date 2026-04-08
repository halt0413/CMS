import type { ReactNode } from "react";
import { ProtectedLayout } from "../../components/layouts/ProtectedLayout/ProtectedLayout";

type ContentsLayoutProps = {
  children: ReactNode;
};

export default function ContentsLayout({ children }: ContentsLayoutProps) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
