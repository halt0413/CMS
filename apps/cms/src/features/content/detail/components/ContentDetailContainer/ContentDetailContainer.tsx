import { formatDate } from "@repo/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "../../../shared/components/PageHeader/PageHeader";
import { getMockContentById } from "../../../shared/mocks/mockContents";
import styles from "./ContentDetailContainer.module.css";

type ContentDetailContainerProps = {
  id: string;
};

export function ContentDetailContainer({ id }: ContentDetailContainerProps) {
  const content = getMockContentById(id);

  if (!content) {
    notFound();
  }

  const publishedAt =
    content.status === "published" ? formatDate(content.publishedAt) : null;

  return (
    <main className={styles.page}>
      <PageHeader
        actions={
          <Link className={styles.ghostButton} href={`/contents/${content.id}/edit`}>
            編集する
          </Link>
        }
        title={content.title}
      />

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
            <span>{formatDate(content.createdAt)}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>updatedAt</span>
            <span>{formatDate(content.updatedAt)}</span>
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
