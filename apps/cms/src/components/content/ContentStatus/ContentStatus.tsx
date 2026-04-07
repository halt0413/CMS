import type { CmsContentStatus } from "@repo/types";
import styles from "./ContentStatus.module.css";

type ContentStatusProps = {
  status: CmsContentStatus;
};

export function ContentStatus({ status }: ContentStatusProps) {
  const label = status === "draft" ? "draft" : "published";

  return (
    <span className={styles.status}>
      <span className={styles.statusDot} />
      {label}
    </span>
  );
}
