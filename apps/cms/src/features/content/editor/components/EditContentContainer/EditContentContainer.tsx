import { getMockContentById } from "../../../../../mocks/content/mockContents";
import { ContentEditorPage } from "../ContentEditorPage/ContentEditorPage";
import { ContentForm } from "../ContentForm/ContentForm";
import styles from "./EditContentContainer.module.css";

type EditContentContainerProps = {
  id: string;
};

export function EditContentContainer({ id }: EditContentContainerProps) {
  const content = getMockContentById(id);

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
