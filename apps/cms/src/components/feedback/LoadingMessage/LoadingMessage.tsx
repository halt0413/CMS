import styles from "./LoadingMessage.module.css";

type LoadingMessageProps = {
  children?: string;
};

export function LoadingMessage({
  children = "読み込み中..."
}: LoadingMessageProps) {
  return <p className={styles.message}>{children}</p>;
}
