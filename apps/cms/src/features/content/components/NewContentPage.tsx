import { ContentForm } from "./ContentForm";
import { PageHeader } from "./PageHeader";
import styles from "./ContentPage.module.css";

export function NewContentPage() {
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
