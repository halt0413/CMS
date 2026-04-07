import { formatDate } from "@repo/utils";
import Link from "next/link";
import { PageHeader } from "../../../../../components/content/PageHeader/PageHeader";
import { mockContents } from "../../../../../mocks/content/mockContents";
import styles from "./ContentsContainer.module.css";

export function ContentsContainer() {
  const contentTypes = Array.from(
    new Set(mockContents.map((content) => content.contentType))
  );

  return (
    <main className={styles.page}>
      <PageHeader
        actions={
          <Link className={styles.primaryButton} href="/contents/new">
            新規作成
          </Link>
        }
        actionsClassName={styles.toolbar}
        title="コンテンツ一覧"
      />

      <section className={`${styles.panel} ${styles.listPanel}`}>
        <div className={styles.collectionHeader}>
          <div className={styles.collectionIntro}>
            <h3 className={styles.collectionName}>portfolio</h3>
          </div>
        </div>

        <div className={styles.typeFilterRow}>
          <button className={`${styles.typeFilter} ${styles.typeFilterActive}`} type="button">
            すべて
          </button>
          {contentTypes.map((contentType) => (
            <button className={styles.typeFilter} key={contentType} type="button">
              {contentType}
            </button>
          ))}
        </div>

        <div className={styles.contentList}>
          {mockContents.map((content) => (
            <article className={styles.contentCard} key={content.id}>
              <div className={styles.contentMain}>
                <div className={styles.cardMeta}>
                  <span className={styles.status}>
                    <span className={styles.statusDot} />
                    {content.status === "draft" ? "draft" : "published"}
                  </span>
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
          ))}
        </div>
      </section>
    </main>
  );
}
