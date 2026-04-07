import { ContentForm } from "./ContentForm";
import styles from "./ContentPage.module.css";

export function NewContentPage() {
  return (
    <main className={styles.page}>
      <section className={styles.pageHeader}>
        <div className={styles.titleBlock}>
          <h2 className={styles.pageTitle}>コンテンツ新規作成</h2>
        </div>
      </section>

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
