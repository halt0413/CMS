import { getMockContentById } from "../const/mockContents";
import { ContentForm } from "./ContentForm";
import styles from "./ContentPage.module.css";
import { PageHeader } from "./PageHeader";

type EditContentPageProps = {
  id: string;
};

export function EditContentPage({ id }: EditContentPageProps) {
  const content = getMockContentById(id);

  return (
    <main className={styles.page}>
      <PageHeader
        subtitle={content ? `ID: ${content.id}` : "対象コンテンツが見つかりません。"}
        title="コンテンツ編集"
      />

      {content ? (
        <>
          <ContentForm
            defaultValue={{
              slug: content.slug,
              title: content.title,
              body: content.body,
              contentType: content.contentType,
              status: content.status
            }}
            description="既存コンテンツを更新するための編集フォームです。"
            endpoint={`/contents/${content.id}`}
            method="PATCH"
            showDelete
            showStatus={false}
            submitLabel="更新する"
          />
        </>
      ) : (
        <section className={styles.detailCard}>
          <p className={styles.body}>
            モックデータ上に該当 ID がないため、編集画面を描画できません。
          </p>
        </section>
      )}
    </main>
  );
}
