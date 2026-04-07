import { PageHeader } from "../../../../../components/content/PageHeader/PageHeader";
import { ContentForm } from "../ContentForm/ContentForm";
import styles from "./NewContentContainer.module.css";

export function NewContentContainer() {
  return (
    <main className={styles.page}>
      <PageHeader title="コンテンツ新規作成" />

      <ContentForm
        defaultValue={{
          slug: "new-content",
          title: "",
          body: "",
          contentType: "work",
          status: "draft"
        }}
        description="CMS から新しいコンテンツを作成するためのフォームです。"
        endpoint="/contents"
        method="POST"
        showStatus={false}
        submitLabel="作成する"
      />
    </main>
  );
}
