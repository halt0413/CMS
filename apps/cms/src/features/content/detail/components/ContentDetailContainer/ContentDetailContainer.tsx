import Link from "next/link";
import { PageHeader } from "../../../../../components/content/PageHeader/PageHeader";
import { requireMockContent } from "../../../../../mocks/content/mockContents";
import { ContentBodyCard } from "../ContentBodyCard/ContentBodyCard";
import { ContentMetaCard } from "../ContentMetaCard/ContentMetaCard";
import styles from "./ContentDetailContainer.module.css";

type ContentDetailContainerProps = {
  id: string;
};

export function ContentDetailContainer({ id }: ContentDetailContainerProps) {
  const content = requireMockContent(id);

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
        <ContentBodyCard content={content} />
      </section>
    </main>
  );
}
