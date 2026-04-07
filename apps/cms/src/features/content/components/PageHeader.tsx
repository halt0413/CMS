import type { ReactNode } from "react";
import styles from "./ContentPage.module.css";

type PageHeaderProps = {
  actions?: ReactNode;
  actionsClassName?: string;
  subtitle?: ReactNode;
  title: ReactNode;
};

export function PageHeader({
  actions,
  actionsClassName,
  subtitle,
  title
}: PageHeaderProps) {
  return (
    <section className={styles.pageHeader}>
      <div className={styles.titleBlock}>
        <h2 className={styles.pageTitle}>{title}</h2>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>

      {actions ? (
        <div className={actionsClassName ?? styles.headerActions}>{actions}</div>
      ) : null}
    </section>
  );
}
