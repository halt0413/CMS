import type { ReactNode } from "react";
import { Header } from "../Header/Header";
import styles from "./ProtectedLayout.module.css";

type ProtectedLayoutProps = {
  children: ReactNode;
};

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Header />
      </aside>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
