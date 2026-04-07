import Link from "next/link";
import { PageHeader } from "../../../../../components/content/PageHeader/PageHeader";
import { mockContents } from "../../../../../mocks/content/mockContents";
import { ContentCard } from "../ContentCard/ContentCard";
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
            <ContentCard content={content} key={content.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
