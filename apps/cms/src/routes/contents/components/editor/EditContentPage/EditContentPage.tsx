import type { ContentItem } from "../../../api";
import { ContentEditorPage } from "../ContentEditorPage/ContentEditorPage";
import { ContentForm } from "../ContentForm/ContentForm";
import styles from "./EditContentPage.module.css";

type EditContentPageProps = {
  content: ContentItem | null;
};

export function EditContentPage({ content }: EditContentPageProps) {
  return (
    <ContentEditorPage
      subtitle={content ? `ID: ${content.id}` : "対象コンテンツが見つかりません。"}
      title="コンテンツ編集"
    >
      {content ? (
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
      ) : (
        <section className={styles.detailCard}>
          <p className={styles.body}>
            モックデータ上に該当 ID がないため、編集画面を描画できません。
          </p>
        </section>
      )}
    </ContentEditorPage>
  );
}
