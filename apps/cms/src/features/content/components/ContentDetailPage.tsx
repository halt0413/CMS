import Link from "next/link";
import { type MockContentItem } from "../const/mockContents";
import styles from "./ContentPage.module.css";

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(value));
}

type ContentDetailPageProps = {
  content: MockContentItem;
};

export function ContentDetailPage({ content }: ContentDetailPageProps) {
  const publishedAt =
    content.status === "published" ? formatDateTime(content.publishedAt) : null;

  return (
    <main className={styles.page}>
      <section className={styles.pageHeader}>
        <div className={styles.titleBlock}>
          <h2 className={styles.pageTitle}>{content.title}</h2>
        </div>

        <div className={styles.headerActions}>
          <Link className={styles.ghostButton} href={`/contents/${content.id}/edit`}>
            編集する
          </Link>
        </div>
      </section>

      <section className={styles.detailGrid}>
        <article className={styles.detailCard}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>ID</span>
            <code>{content.id}</code>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>slug</span>
            <code>{content.slug}</code>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>種別</span>
            <span className={styles.typeBadge}>{content.contentType}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>status</span>
            <span className={styles.status}>
              <span className={styles.statusDot} />
              {content.status}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>createdAt</span>
            <span>{formatDateTime(content.createdAt)}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>updatedAt</span>
            <span>{formatDateTime(content.updatedAt)}</span>
          </div>
          {publishedAt ? (
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>publishedAt</span>
              <span>{publishedAt}</span>
            </div>
          ) : null}
        </article>

        <article className={styles.detailCard}>
          <p className={styles.eyebrow}>本文</p>
          <h3 className={styles.sectionTitle}>content.body</h3>
          <p className={styles.longText}>
            {content.body || "本文はまだ入力されていません。"}
          </p>
        </article>
      </section>
    </main>
  );
}
