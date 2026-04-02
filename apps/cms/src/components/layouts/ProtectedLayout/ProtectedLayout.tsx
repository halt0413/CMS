import type { ReactNode } from "react";
import { Header } from "../Header/Header";

type ProtectedLayoutProps = {
  children: ReactNode;
};

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="shell">
      <Header />
      {children}
    </div>
  );
}
