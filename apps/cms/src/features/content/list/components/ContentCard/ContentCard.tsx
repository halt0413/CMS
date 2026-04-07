import { formatDate } from "@repo/utils";
import Link from "next/link";
import { ContentStatus } from "../../../../../components/content/ContentStatus/ContentStatus";
import type { MockContentItem } from "../../../../../mocks/content/mockContents";
import styles from "./ContentCard.module.css";

type ContentCardProps = {
  content: MockContentItem;
};

export function ContentCard({ content }: ContentCardProps) {
  return (
    <article className={styles.contentCard}>
      <div className={styles.contentMain}>
        <div className={styles.cardMeta}>
          <ContentStatus status={content.status} />
          <span className={styles.metaDivider}>/</span>
          <span className={styles.typeText}>{content.contentType}</span>
        </div>

        <div className={styles.contentHeading}>
          <Link className={styles.contentTitle} href={`/contents/${content.id}`}>
            {content.title}
          </Link>
          <code className={styles.contentSlug}>{content.slug}</code>
        </div>
      </div>

      <div className={styles.contentAside}>
        <time className={styles.contentDate}>{formatDate(content.updatedAt)}</time>
        <div className={styles.actionsGroup}>
          <Link className={styles.inlineLink} href={`/contents/${content.id}`}>
            詳細
          </Link>
          <Link className={styles.inlineLink} href={`/contents/${content.id}/edit`}>
            編集
          </Link>
        </div>
      </div>
    </article>
  );
}
