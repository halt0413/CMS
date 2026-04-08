import type { CmsPageInput } from "@repo/types";
import { type ContentType } from "../../../../../mocks/content/mockContents";
import { ContentFormSidebar } from "../ContentFormSidebar/ContentFormSidebar";
import styles from "./ContentForm.module.css";

type ContentFormValue = CmsPageInput & {
  contentType: ContentType;
};

type ContentFormProps = {
  defaultValue: ContentFormValue;
  description: string;
  endpoint: string;
  method: "POST" | "PATCH";
  showDelete?: boolean;
  showStatus?: boolean;
  submitLabel: string;
};

export function ContentForm({
  defaultValue,
  description,
  method,
  showDelete = false,
  showStatus = true,
  submitLabel
}: ContentFormProps) {
  return (
    <section className={styles.formLayout}>
      <form className={styles.formCard}>
        <div className={styles.formHeader}>
          <div>
            <h3 className={styles.sectionTitle}>コンテンツ入力</h3>
          </div>
        </div>

        <p className={styles.formDescription}>{description}</p>

        <div className={styles.fieldGrid}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>タイトル</span>
            <input defaultValue={defaultValue.title} type="text" />
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>slug</span>
            <input defaultValue={defaultValue.slug} type="text" />
          </label>
        </div>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>種別</span>
          <input defaultValue={defaultValue.contentType} type="text" />
        </label>

        {showStatus ? (
          <label className={styles.field}>
            <span className={styles.fieldLabel}>ステータス</span>
            <select defaultValue={defaultValue.status}>
              <option value="draft">draft</option>
              <option value="published">published</option>
            </select>
          </label>
        ) : null}

        <label className={styles.field}>
          <span className={styles.fieldLabel}>本文</span>
          <textarea defaultValue={defaultValue.body} rows={10} />
        </label>

        <div className={styles.formActions}>
          <div className={styles.formActionsLeft}>
            {showDelete ? (
              <button className={`${styles.secondaryButton} ${styles.deleteButton}`} type="button">
                削除
              </button>
            ) : null}
          </div>
          <div className={styles.formActionsRight}>
            <button className={styles.secondaryButton} type="button">
              下書き保存
            </button>
            <button className={styles.primaryButton} type="submit">
              {submitLabel}
            </button>
          </div>
        </div>
      </form>

      <ContentFormSidebar description={description} showStatus={showStatus} />
    </section>
  );
}
