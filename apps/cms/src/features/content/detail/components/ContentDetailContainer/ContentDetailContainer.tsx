import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "../../../../../components/content/PageHeader/PageHeader";
import { getMockContentById } from "../../../../../mocks/content/mockContents";
import { ContentMetaCard } from "../ContentMetaCard/ContentMetaCard";
import styles from "./ContentDetailContainer.module.css";

type ContentDetailContainerProps = {
  id: string;
};

export function ContentDetailContainer({ id }: ContentDetailContainerProps) {
  const content = getMockContentById(id);

  if (!content) {
    notFound();
  }

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
        <ContentMetaCard content={content} />

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
