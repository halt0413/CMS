import { getMockContentById } from "../const/mockContents";
import { ContentForm } from "./ContentForm";
import styles from "./ContentPage.module.css";

type EditContentPageProps = {
  id: string;
};

export function EditContentPage({ id }: EditContentPageProps) {
  const content = getMockContentById(id);

  return (
    <main className={styles.page}>
      <section className={styles.pageHeader}>
        <div className={styles.titleBlock}>
          <h2 className={styles.pageTitle}>コンテンツ編集</h2>
          <p className={styles.subtitle}>
            {content ? `ID: ${content.id}` : "対象コンテンツが見つかりません。"}
          </p>
        </div>
      </section>

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
